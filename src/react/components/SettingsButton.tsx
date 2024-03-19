import React from 'react';
import SettingsIcon from '@spectrum-icons/workflow/Settings';
import { Button } from '@adobe/react-spectrum';
import { useMenuManager } from '../hooks/useMenuManager';
import { MenuType } from '../contexts/MenuManagerContext';

function SettingsButton() {
    const { openMenu } = useMenuManager();

    return (
        <Button variant="secondary" onPress={() => openMenu(MenuType.SETTINGS)}>
            <SettingsIcon />
        </Button>
    );
}

export default SettingsButton;
