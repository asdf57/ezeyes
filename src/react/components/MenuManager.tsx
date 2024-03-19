import React, { useContext } from 'react';
import { Dialog, DialogContainer, Heading } from '@adobe/react-spectrum';
import { MenuManagerContext, MenuType } from '../contexts/MenuManagerContext';
import SettingsMenu from './SettingsMenu';
import { useMenuManager } from '../hooks/useMenuManager';

export const renderModalContent = (currentMenu: MenuType, closeMenu: () => void) => {
  switch (currentMenu) {
    case MenuType.SETTINGS:
      return <SettingsMenu onClose={closeMenu} />;
  }
};

export const MenuManager: React.FC = () => {
  const { currentMenu } = useContext(MenuManagerContext);
  const { closeMenu } = useMenuManager();

  return (
    <DialogContainer onDismiss={closeMenu} type="modal" isDismissable>
      {currentMenu && (
        <Dialog>
          {renderModalContent(currentMenu, closeMenu)}
        </Dialog>
      )}
    </DialogContainer>
  );
};
