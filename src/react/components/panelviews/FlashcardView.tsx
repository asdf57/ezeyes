import React, { useState } from "react";
import TextInputDisplayPanel from "../TextInputDisplayPanel";
import ReaderDisplayPanel from "../ReaderDisplayPanel";
import "../../styles/index.css";

const FlashcardView = () => {
  const [flipped, setFlipped] = useState(false);

  const handleFlip = () => {
    setFlipped(!flipped);
  };

  return (
    <div
      id="flashcard-container"
      className={flipped ? "flipped" : ""}
      onClick={handleFlip}
    >
      <ReaderDisplayPanel />
      <TextInputDisplayPanel />
    </div>
  );
};

export default FlashcardView;
