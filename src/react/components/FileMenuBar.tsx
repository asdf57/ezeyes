import React, { useContext, useMemo } from 'react';
import { Menu, MenuTrigger, ActionButton, Item, Flex } from '@adobe/react-spectrum';
import { SubmenuTrigger } from '@react-spectrum/menu';
import { useFileMenuBar } from '../hooks/useFileMenuBar';
import { FileManagerContext } from '../contexts/FileManagerContext';

function FileMenuBar() {
    const { processOptions } = useFileMenuBar();
    const { currentFiles } = useContext(FileManagerContext);

    const render = useMemo(() => () => {
        const renderItems: React.JSX.Element[] = [];

        if (currentFiles.length === 0) {
            return <Item key="pass">(none)</Item>
        }

        currentFiles.forEach((filePath) => {
            renderItems.push(
                <Item key={filePath}>{filePath.split('\\').pop()}</Item>
            );
        });

        return renderItems;
    }, [currentFiles]);

    return (
        <Flex gap="size-100" position={'absolute'} zIndex={1000}>
        <MenuTrigger>
            <ActionButton>
                File
            </ActionButton>
            <Menu onAction={(key) => processOptions(key)}>
                <Item key="load">Load File</Item>
                <SubmenuTrigger>
                    <Item>Import Previous</Item>
                    <Menu onAction={(key) => processOptions(key)} items={currentFiles}>
                        { render() }
                    </Menu>
                </SubmenuTrigger>
                <Item key="reset">Reset Preferences</Item>
                <Item key="toggle-dark-mode">Toggle Dark Mode</Item>
            </Menu>
        </MenuTrigger>
        </Flex>
    );
};

export default FileMenuBar;
