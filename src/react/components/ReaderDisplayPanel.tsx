import React, { useContext, CSSProperties } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { View, Text } from '@adobe/react-spectrum';

interface ReaderDisplayProps {
  style?: CSSProperties;
}

const ReaderDisplay: React.FC<ReaderDisplayProps> = ({ style }) => {
    const { curWordSequence } = useContext(PanelContext);

    return (
        <div id="reader-display-panel" style={style}>
            <View>
                <Text UNSAFE_className="text reader-text">{curWordSequence}</Text>
            </View>
        </div>
    );
};

export default ReaderDisplay;
