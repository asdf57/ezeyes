import React, { useContext, useState, useEffect } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import Word from "./Word";
import Chunk from './Chunk';

const CHUNK_SIZE = 1250;

const TextInputDisplayPanel: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const { setCurWordSequenceIndex, curWordSequenceIndex, nextWordSequenceIndex, setTextContent, textContent, wordIndices, paragraphIndices } = useContext(PanelContext);
  const [renderHtml, setRenderHtml] = useState<React.JSX.Element[]>([]);

  function updateHighlight(curWordSequenceIndex: number, nextWordSequenceIndex: number): void {
    // Remove highlighting from previously highlighted elements in a single pass
    document.querySelectorAll('.highlight').forEach(el => {
      el.classList.remove('highlight');
    });

    // Directly add highlighting to the new range of elements
    for (let i = curWordSequenceIndex; i < nextWordSequenceIndex; i++) {
      const element = document.getElementById(`word-${i}`);
      element?.classList.add('highlight');
    }
  }

  useEffect(() => {
    updateHighlight(curWordSequenceIndex, nextWordSequenceIndex);
  }, [curWordSequenceIndex, nextWordSequenceIndex]);  

  useEffect(() => {
    const chunks = [];
    const startHere = (i: number) => setCurWordSequenceIndex(i);

    for (let i = 0; i < wordIndices.length; i += CHUNK_SIZE) {
      const chunkWords = [];
      for (let j = i; j < i + CHUNK_SIZE && j < wordIndices.length; j++) {
        const wordIndex = wordIndices[j];
        const word = textContent.slice(wordIndex, wordIndices[j + 1] || textContent.length).trimEnd();
        const key = `word-${wordIndex}-${j}`;

        if (paragraphIndices.includes(wordIndex)) {
          chunkWords.push(<span key={`paragraph-${j}`}><br /><br /></span>);
        }

        chunkWords.push(<Word key={key} word={word + " "} wordIndex={wordIndex} onStartHere={() => startHere(j)} />);
      }

      chunks.push(<Chunk key={`chunk-${i}`} words={chunkWords} />);
    }

    setRenderHtml(chunks);
  }, [textContent, wordIndices, paragraphIndices, setCurWordSequenceIndex]);

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const pastedText = event.clipboardData.getData('text');
    setTextContent(pastedText);
  };

  return (
    <div id="text-input-panel" style={style} onPaste={handlePaste} tabIndex={0}>
      {renderHtml}
    </div>
  );
};

export default TextInputDisplayPanel;
