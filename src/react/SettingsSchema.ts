export enum PanelDisplayType {
    HORIZONTAL,
    VERTICAL,
    ZOOM,
    FLASHCARD
}

export interface Keybindings {
    play: string;
    pause: string;
    nextWord: string;
    prevWord: string;
    openSettings: string;
    switchView: string;
    focus: string;
    select: string;
    importFile: string;
    prevParagraph: string;
    nextParagraph: string;
    prevSentence: string;
    nextSentence: string;
    flipFlashcard: string;
}

// Define the appearance interface
export interface Appearance {
    fontSize: string;
    theme: string;
}

// Define the panel interface
export interface Panel {
    textInputPanel: {
        appearance: Appearance;
    };
    readerPanel: {
        appearance: Appearance;
    };
}

// Define the WPM range interface
export interface WpmRange {
    min: number;
    max: number;
}

// Define the WPM settings interface
export interface WpmSettings {
    curWpm: number;
    slowWpm: WpmRange;
    fastWpm: WpmRange;
}

// Define the panels settings interface
export interface Panels {
    textInputPanel: {
        appearance: Appearance;
    };
    readerPanel: {
        appearance: Appearance;
    };
    wpm: WpmSettings;
    wordSequenceLength: number;
    displayType: PanelDisplayType;
}

// Define the settings interface
export interface Settings {
    keybindings: Keybindings;
    panels: Panels;
}

export const initialSettings: Settings = {
    keybindings: {
        play: 'space',
        pause: 'space',
        nextWord: 'right',
        prevWord: 'left',
        openSettings: 'ctrl+o',
        switchView: 'p',
        focus: 'tab',
        select: 'enter',
        importFile: 'ctrl+i',
        prevParagraph: "q",
        nextParagraph: "w",
        prevSentence: "a",
        nextSentence: "s",
        flipFlashcard: "f"
    },
    panels: {
        textInputPanel: {
            appearance: {
                fontSize: '16px',
                theme: 'light',
            }
        },
        readerPanel: {
            appearance: {
                fontSize: '64px',
                theme: 'light',
            }
        },
        wpm: {
            curWpm: 120,
            slowWpm: {
                min: 10,
                max: 100,
            },
            fastWpm: {
                min: 100,
                max: 700,
            }
        },
        wordSequenceLength: 4,
        displayType: PanelDisplayType.ZOOM,
    },
};
