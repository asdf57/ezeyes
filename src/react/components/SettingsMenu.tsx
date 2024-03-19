import React, { useContext } from 'react';
import { Heading, Content, Divider, ButtonGroup, Button, TextField, Form, Checkbox, Flex, Slider } from '@adobe/react-spectrum';
import { SettingsContext } from '../contexts/SettingsContext';
import { useSettings } from '../hooks/useSettings';
import { useMenuManager } from '../hooks/useMenuManager';

interface SettingsMenuProps {
    onClose: () => void;
}

function SettingsMenu(props: SettingsMenuProps) {
    const { settings } = useContext(SettingsContext);
    const { changePanelSetting } = useSettings();
    const { closeMenu } = useMenuManager();

    return (
        (
            <>
                <Heading>Settings</Heading>
                <Divider />
                <Content>
                <Flex direction="column" maxWidth="size-5000" gap="size-300">
                    <Slider onChange={(value) => {changePanelSetting('wpm', value)}} label="WPM" labelPosition="side" minValue={settings.panels.wpm.slowWpm.min} maxValue={settings.panels.wpm.slowWpm.max} defaultValue={settings.panels.wpm.slowWpm.min} step={10} />
                </Flex>
                <Form>
                    <TextField label="Name" />
                    <TextField label="Email address" />
                    <Checkbox>Make profile private</Checkbox>
                </Form>
                </Content>
                <ButtonGroup>
                    <Button variant="secondary" onPress={() => closeMenu()}>Cancel</Button>
                </ButtonGroup>
            </>
        )
    );
}

export default SettingsMenu;
