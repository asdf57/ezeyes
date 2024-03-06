import { useContext } from 'react';
import { FileManagerContext } from '../contexts/FileManagerContext';
import { PanelContext } from '../contexts/PanelContext';
import * as RtfParser from 'rtf-parser';
import { read, readDocx, spawnFileDialog } from '../../electron/ipc';

export function processRTFContent(rtfContent: string): string {
    return rtfContent.replace(/(\\u-?\d+)((?:\s*\\'[0-9a-fA-F]{2})?)(\s*[\-\?])?/g, (match, unicodeControlWord, offset) => {
        if (offset > 0 && rtfContent[offset - 1] === '\\') {
            return match;
        }
        return unicodeControlWord;
    })
    .replace(/\\'[0-9a-fA-F]{2}/g, '')
    .replace(/(\s?\\u-?\d+)\s*[\-\?]/g, '$1')
    .replace(/\\u-?\d+\s*-\s+/g, '$&').trim();
}

export function trimWhitespace(str: string) {
  return str.replace(/^ +| +$/g, '');
}

export function getRtfDocument(content: string | Buffer | undefined) {
    return new Promise((resolve, reject) => {
        RtfParser.string(processRTFContent(content.toString()),  (err: any, doc: { content: any[]; }) => {
            if (err) reject(err);
            else resolve(doc);
          },
        );
    })
}

export const promptAndLoadFileHelper = async (addNew: Function, setTextContent: Function, setCurWordSequenceIndex: Function) => {
    let filePath;
    try {
        filePath = await spawnFileDialog();
    } catch (error) {
        console.error(error);
        return;
    }

    if (!filePath) {
        return;
    }

    const fileExtension = filePath.split('.').pop() || undefined;

    let content;
    switch (fileExtension.toLowerCase()) {
        case "rtf":
            content = await loadRtfFile(filePath);
            break;
        case "txt":
            break;
        case "docx":
            content = await readDocx(filePath);
            break;
        case "pdf":
            break;
        default:
            console.log("Unsupported file found!");
            break;
    }

    if (!content) {
        return;
    }

    addNew(filePath);
    setTextContent(content);
    setCurWordSequenceIndex(0);
};

const loadTxtFile = async (filePath: string): Promise<string | undefined> => {
    return await read(filePath, "utf8");
};

export const loadRtfFile = async (filePath: string): Promise<any> => {
    let content;

    try {
        content = await read(filePath, 'utf8');
        let doc: any = await getRtfDocument(content);
        let paragraphs = doc.content.map((paragraph: { content: any[]; }) => paragraph.content.flatMap((entry: { value: any; }) => entry.value));
        let text: string[] = paragraphs.reduce((acc: string[], paragraph: string[]) => {
            if (paragraph.length === 0) {
                acc.push("\n");
                } else {
                const lines = paragraph.map(elem => trimWhitespace(elem).replace('','')).join(" ");
                acc.push(lines);
            }
            return acc;
        }, []);

        return text.join('');
    } catch (error) {
        return undefined;
    }
};

const loadPdfFile = async (filePath: string) => {
    
};

const useFileManager = () => {
    const { currentFiles, setCurrentFiles } = useContext(FileManagerContext);
    const { setTextContent, setCurWordSequenceIndex, textContent } = useContext(PanelContext);

    const handleAddNew = (filePath: string) => {
        const files = [...currentFiles, filePath];
        setCurrentFiles(files);
    };

    const promptAndLoadFile = async () => {
        await promptAndLoadFileHelper(handleAddNew, setTextContent, setCurWordSequenceIndex);
    };

    return {
        promptAndLoadFile,
    }
};

export { useFileManager };
