import React, { useState, useEffect } from 'react';
import TextInputDisplayPanel from "../TextInputDisplayPanel";
import ReaderDisplayPanel from "../ReaderDisplayPanel";

const VerticalPanel: React.FC = () => {
    const [topHeight, setTopHeight] = useState(50);
    const [isResizing, setIsResizing] = useState(false);

    const handleMouseMove = (e: MouseEvent) => {
        if (isResizing) {
            const newHeight = (e.clientY / window.innerHeight) * 100;
            setTopHeight(newHeight);
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
        <div id="vertical-panel-container">
            <ReaderDisplayPanel style={{ height: `${topHeight}%` }} />
            <div className="resize-bar-horizontal" onMouseDown={handleMouseDown} />
            <TextInputDisplayPanel style={{ height: `${100 - topHeight}%` }} />
        </div>
    );
};

export default VerticalPanel;
