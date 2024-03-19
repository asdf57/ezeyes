import React from "react";
import TextInputDisplayPanel from "../TextInputDisplayPanel";
import ReaderDisplayPanel from "../ReaderDisplayPanel";
import "../../styles/index.css";

const ZoomView = () => {
  return (
    <div id="zoom-container">
        <ReaderDisplayPanel />
        <TextInputDisplayPanel />
    </div>
  );
};

export default ZoomView;
