import { useContext, useEffect } from 'react';
import { MenuManagerContext } from '../contexts/MenuManagerContext';
var Mousetrap = require('mousetrap-pause')(require('mousetrap'));

const useFocusManager = () => {
    const { currentMenu } = useContext(MenuManagerContext);

    useEffect(() => {
        if (currentMenu) {
            Mousetrap.pause();
        } else {
            Mousetrap.unpause();
        }
    }, [currentMenu]);
};

export default useFocusManager;
