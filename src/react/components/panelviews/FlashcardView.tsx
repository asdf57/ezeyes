import React from "react";
import TextInputDisplayPanel from "../TextInputDisplayPanel";
import ReaderDisplayPanel from "../ReaderDisplayPanel";
import { PanelViewportContext } from "../../contexts/PanelViewportContext";
import { PanelType } from "../../contexts/PanelViewportContext";
import "../../styles/index.css";


const FlashcardView = () => {
  const { activeFlashcard } = React.useContext(PanelViewportContext);

  return (
    <div id="flashcard-container" data-testid="flashcard-container-test-id" className={activeFlashcard === PanelType.READER ? "" : "flipped"}>
      <ReaderDisplayPanel />
      <TextInputDisplayPanel />
    </div>
  );
};

export default FlashcardView;
