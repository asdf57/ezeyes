import useKeybindings from '../hooks/useKeybindings';

const KeybindingManager = (): JSX.Element => {
  useKeybindings();

  return null;
};

export default KeybindingManager;
