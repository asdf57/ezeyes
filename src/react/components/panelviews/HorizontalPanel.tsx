import React, { useState, useEffect } from 'react';
import TextInputDisplayPanel from "../TextInputDisplayPanel";
import ReaderDisplayPanel from "../ReaderDisplayPanel";

const HorizontalPanel: React.FC = () => {
    const [leftWidth, setLeftWidth] = useState(50);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) {
            const newWidth = (e.clientX / window.innerWidth) * 100;
            setLeftWidth(newWidth);
        }
    };

    const handleMouseDown = () => {
        setIsResizing(true);
    };

    const handleMouseUp = () => {
        setIsResizing(false);
    };

    useEffect(() => {
        if (isResizing) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp, { once: true });
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isResizing]);

    return (
        <div id="horizontal-panel-container">
            <ReaderDisplayPanel style={{ width: `${leftWidth}%` }} />
            <div className="resize-bar-vertical" onMouseDown={handleMouseDown} />
            <TextInputDisplayPanel style={{ width: `${100 - leftWidth}%` }} />
        </div>
    );
};

export default HorizontalPanel;
