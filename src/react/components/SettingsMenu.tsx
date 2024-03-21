import React, { useContext } from 'react';
import {
  Heading,
  Content,
  ButtonGroup,
  Button,
  Flex,
  Slider,
  Picker,
  Item,
  TabList,
  TabPanels,
  Tabs,
  NumberField,
  View,
  Grid,
} from '@adobe/react-spectrum';

import {ColorArea, ColorSlider} from '@react-spectrum/color';
import {parseColor} from '@react-stately/color';
import { SettingsContext } from '../contexts/SettingsContext';
import { useMenuManager } from '../hooks/useMenuManager';
import { PanelDisplayType, ThemeType, UISize, WPMType } from '../SettingsSchema';
import { KeybindInput } from './KeybindInput';

interface SettingsMenuProps {
    onClose: () => void;
}

function SettingsMenu(props: SettingsMenuProps) {
    const { settings, dispatch } = useContext(SettingsContext);
    const { closeMenu } = useMenuManager();

    return (
        <>
            <Heading>Settings</Heading>
            <Content>
                <Tabs aria-label="Settings Tabs" width={500}>
                    <TabList>
                        <Item key="processing">Processing</Item>
                        <Item key="display">Display</Item>
                        <Item key="filter">Filter</Item>
                        <Item key="overlay">Overlay</Item>
                        <Item key="keybinds">Keybindings</Item>
                    </TabList>
                    <TabPanels height="size-3600">
                        <Item key="processing">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    <Picker
                                        defaultSelectedKey={WPMType.NORMAL}
                                        label="Speed Mode"
                                        selectedKey={settings.processing.wpm.type}
                                        onSelectionChange={(value) => dispatch({ type: 'UPDATE_WPM_TYPE', value: value as WPMType })}>
                                        <Item key={WPMType.NORMAL}>Normal</Item>
                                        <Item key={WPMType.ASSISTED}>Assisted</Item>
                                    </Picker>
                                    <Slider
                                        label={`Words Per Minute`}
                                        minValue={settings.processing.wpm[settings.processing.wpm.type].min}
                                        maxValue={settings.processing.wpm[settings.processing.wpm.type].max}
                                        value={settings.processing.wpm[settings.processing.wpm.type].current}
                                        onChange={(value) => dispatch({ type: 'UPDATE_WPM_SETTING', wpmType: settings.processing.wpm.type, setting: 'current', value: value})}
                                    />
                                    <NumberField label="Word Sequence Length" defaultValue={settings.processing.wordSequenceLength} minValue={1} onChange={(value) => dispatch({type: 'UPDATE_WORD_SEQUENCE_LENGTH', value: value})} />
                                </Flex>
                            </View>
                        </Item>
                        <Item key="display">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    <Picker
                                        defaultSelectedKey={UISize.LARGE}
                                        label="UI Size"
                                        selectedKey={settings.ui.size}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_SIZE', value: value as UISize})}>
                                        <Item key={UISize.MEDIUM}>Medium</Item>
                                        <Item key={UISize.LARGE}>Large</Item>
                                    </Picker>
                                    <Picker
                                        defaultSelectedKey={ThemeType.DARK}
                                        label="Theme"
                                        selectedKey={settings.ui.theme}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_THEME', value: value as ThemeType})}>
                                        <Item key={ThemeType.LIGHT}>Light</Item>
                                        <Item key={ThemeType.DARK}>Dark</Item>
                                    </Picker>
                                    <Picker
                                        defaultSelectedKey={PanelDisplayType.HORIZONTAL}
                                        label="Default Display Type"
                                        selectedKey={settings.ui.defaultDisplayType}
                                        onSelectionChange={(value) => dispatch({type: 'UPDATE_UI_DEFAULT_DISPLAY', value: value as PanelDisplayType})}>
                                        <Item key={PanelDisplayType.HORIZONTAL}>Horizontal</Item>
                                        <Item key={PanelDisplayType.VERTICAL}>Vertical</Item>
                                        <Item key={PanelDisplayType.ZOOM}>Zoom</Item>
                                    <Item key={PanelDisplayType.FLASHCARD}>Flashcard</Item>
                                    </Picker>
                                    <NumberField label="Text Panel Font Size" defaultValue={settings.textInputPanel.fontSize} minValue={1} onChange={(value) => dispatch({type: 'UPDATE_TEXT_INPUT_FONT_SIZE', value: value})}/>
                                    <NumberField label="Reader Panel Font Size" defaultValue={settings.readerPanel.fontSize} minValue={1} onChange={(value) => dispatch({type: 'UPDATE_READER_PANEL_FONT_SIZE', value: value})}/>
                                </Flex>
                            </View>
                        </Item>
                        <Item key="overlay">
                            <View height="size-3600" overflow="auto">
                                <Flex direction="column" gap="size-150">
                                    <fieldset style={{ border: 0 }}>
                                        <Flex direction="column">
                                            <ColorSlider defaultValue="#ff0000" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} channel="red" />
                                            <ColorSlider defaultValue="#00ff00" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} channel="green" />
                                            <ColorSlider defaultValue="#0000ff" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} channel="blue" />
                                            <ColorSlider channel="alpha" value={settings.ui.overlayColor} onChange={(value) => dispatch({type: 'UPDATE_UI_OVERLAY_COLOR', value: value.toString('css')})} />
                                        </Flex>
                                    </fieldset>
                                </Flex>
                            </View>
                        </Item>
                        <Item key="filter">
                            <View height="size-3600" width="size-5500" overflow="auto" overflow-x="hidden">
                                <Grid
                                    columns={['1fr', '1fr']}
                                    gap="size-200"
                                    autoRows="size-800"
                                >
                                    <Slider label="Blur" defaultValue={settings.ui.blur} minValue={0} maxValue={10} step={0.1} onChange={(value) => dispatch({type: 'UPDATE_UI_BLUR', value: value})}/>
                                    <Slider label="Brightness" defaultValue={settings.ui.brightness} minValue={0} maxValue={3} step={0.1} onChange={(value) => dispatch({type: 'UPDATE_UI_BRIGHTNESS', value: value})}/>
                                    <Slider label="Contrast" defaultValue={settings.ui.contrast} minValue={0} maxValue={3} step={0.1} onChange={(value) => dispatch({type: 'UPDATE_UI_CONTRAST', value: value})}/>
                                    <Slider label="Grayscale" defaultValue={settings.ui.grayscale} minValue={0} maxValue={1} step={0.01} onChange={(value) => dispatch({type: 'UPDATE_UI_GRAYSCALE', value: value})}/>
                                    <Slider label="Hue Rotate" defaultValue={settings.ui.hueRotate} minValue={0} maxValue={360} step={1} onChange={(value) => dispatch({type: 'UPDATE_UI_HUE_ROTATE', value: value})}/>
                                    <Slider label="Invert" defaultValue={settings.ui.invert} minValue={0} maxValue={1} step={0.01} onChange={(value) => dispatch({type: 'UPDATE_UI_INVERT', value: value})}/>
                                    <Slider label="Opacity" defaultValue={settings.ui.opacity} minValue={0} maxValue={1} step={0.01} onChange={(value) => dispatch({type: 'UPDATE_UI_OPACITY', value: value})}/>
                                    <Slider label="Saturate" defaultValue={settings.ui.saturate} minValue={0} maxValue={3} step={0.1} onChange={(value) => dispatch({type: 'UPDATE_UI_SATURATE', value: value})}/>
                                    <Slider label="Sepia" defaultValue={settings.ui.sepia} minValue={0} maxValue={1} step={0.01} onChange={(value) => dispatch({type: 'UPDATE_UI_SEPIA', value: value})}/>
                                </Grid>
                            </View>
                        </Item>
                        <Item key="keybinds">
                            <View height="size-3600" overflow="auto">
                              <Grid
                                columns={['1fr', '1fr', '1fr']}
                                gap="size-0"
                                autoRows="size-800"
                              >
                                <KeybindInput key="play" keycode="play" label="Play/pause" keyValue={settings.keybindings.play}/>
                                <KeybindInput key="nextWord" keycode="nextWord" label="Next word" keyValue={settings.keybindings.nextWord}/>
                                <KeybindInput key="prevWord" keycode="prevWord" label="Previous word" keyValue={settings.keybindings.prevWord}/>
                                <KeybindInput key="openSettings" keycode="openSettings" label="Open settings" keyValue={settings.keybindings.openSettings}/>
                                <KeybindInput key="switchView" keycode="switchView" label="Switch panel view" keyValue={settings.keybindings.switchView}/>
                                <KeybindInput key="importFile" keycode="importFile" label="Import file menu" keyValue={settings.keybindings.importFile}/>
                                <KeybindInput key="prevParagraph" keycode="prevParagraph" label="Previous paragraph" keyValue={settings.keybindings.prevParagraph}/>
                                <KeybindInput key="nextParagraph" keycode="nextParagraph" label="Next paragraph" keyValue={settings.keybindings.nextParagraph}/>
                                <KeybindInput key="prevSentence" keycode="prevSentence" label="Previous sentence" keyValue={settings.keybindings.prevSentence}/>
                                <KeybindInput key="nextSentence" keycode="nextSentence" label="Next sentence" keyValue={settings.keybindings.nextSentence}/>
                                <KeybindInput key="flipFlashcard" keycode="flipFlashcard" label="Flip flashcard" keyValue={settings.keybindings.flipFlashcard}/>
                                <KeybindInput key="backToTop" keycode="backToTop" label="Back to top" keyValue={settings.keybindings.backToTop}/>
                              </Grid>
                            </View>
                        </Item>
                    </TabPanels>
                </Tabs>
            </Content>
            <ButtonGroup>
                <Button variant="secondary" onPress={closeMenu}>Cancel</Button>
            </ButtonGroup>
        </>
    );
}

export default SettingsMenu;
