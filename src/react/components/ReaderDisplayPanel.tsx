import React, { useContext, CSSProperties } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { SettingsContext } from '../contexts/SettingsContext';
import { View, Text } from '@adobe/react-spectrum';

interface ReaderDisplayProps {
  style?: CSSProperties;
}

const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ style }) => {
    const { curWordSequence } = useContext(PanelContext);
    const { settings } = useContext(SettingsContext);
    
    if (style == null) {
        style = { 'fontSize': settings.readerPanel.fontSize } as React.CSSProperties
    } else if (style.fontSize == null) {
        style['fontSize'] = settings.readerPanel.fontSize;
    }

    return (
        <div id="reader-display-panel" style={style}>
            <View>
                <Text UNSAFE_className="text reader-text">{curWordSequence}</Text>
            </View>
        </div>
    );
};

export default ReaderDisplay;