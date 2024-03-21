export enum PanelDisplayType {
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical",
    ZOOM = "zoom",
    FLASHCARD = "flashcard",
}

export enum WPMType {
    NORMAL = "normal",
    ASSISTED = "assisted",
}

export enum ThemeType {
    LIGHT = "light",
    DARK = "dark",
};

export enum UISize {
    MEDIUM = "medium",
    LARGE = "large",
}

export interface Keybindings {
    play: string;
    nextWord: string;
    prevWord: string;
    openSettings: string;
    switchView: string;
    importFile: string;
    prevParagraph: string;
    nextParagraph: string;
    prevSentence: string;
    nextSentence: string;
    flipFlashcard: string;
    backToTop: string;
}

export interface TextInputPanelSettings {
    fontSize: number;
}

export interface ReaderPanelSettings {
    fontSize: number;
}

// Define the panel interface
export interface Panel {
    textInputPanel: TextInputPanelSettings;
    readerPanel: ReaderPanelSettings;
}

// Define the WPM range interface
export interface WpmRange {
    min: number;
    max: number;
    current: number;
}

// Define the WPM settings interface
export interface WpmSettings {
    type: WPMType;
    assisted: WpmRange;
    normal: WpmRange;
}

export interface UI {
    size: UISize;
    defaultDisplayType: PanelDisplayType;
    theme: ThemeType;
    blur: number;
    brightness: number;
    contrast: number;
    grayscale: number;
    hueRotate: number;
    invert: number;
    opacity: number;
    saturate: number;
    sepia: number;
    overlayColor: string;
}

export interface Processing {
    wpm: WpmSettings;
    wordSequenceLength: number;
}

export interface Settings {
    processing: Processing;
    ui: UI;
    textInputPanel: TextInputPanelSettings;
    readerPanel: ReaderPanelSettings;
    keybindings: Keybindings;
}

export const initialSettings: Settings = {
    processing: {
        wpm: {
            type: WPMType.NORMAL,
            assisted: {
                min: 10,
                max: 100,
                current: 50,
            },
            normal: {
                min: 100,
                max: 700,
                current: 300,
            }
        },
        wordSequenceLength: 1,
    },
    ui: {
        size: UISize.MEDIUM,
        defaultDisplayType: PanelDisplayType.ZOOM,
        theme: ThemeType.DARK,
        blur: 0,
        brightness: 1,
        contrast: 1,
        grayscale: 0,
        hueRotate: 0,
        invert: 0,
        opacity: 1,
        saturate: 1,
        sepia: 0,
        overlayColor: '#ff00ff00',
    },
    textInputPanel: {
        fontSize: 16,
    },
    readerPanel: {
        fontSize: 36,
    },
    keybindings: {
        play: 'space',
        nextWord: 'right',
        prevWord: 'left',
        openSettings: 'ctrl+o',
        switchView: 'p',
        importFile: 'ctrl+i',
        prevParagraph: "q",
        nextParagraph: "w",
        prevSentence: "a",
        nextSentence: "s",
        flipFlashcard: "f",
        backToTop: "v",
    },
};
