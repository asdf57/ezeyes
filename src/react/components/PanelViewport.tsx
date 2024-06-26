import React, { useContext, useEffect, useState } from "react";
import HorizontalPanel from "./panelviews/HorizontalPanel";
import ZoomView from "./panelviews/ZoomView";
import FlashcardView from "./panelviews/FlashcardView";
import VerticalPanel from "./panelviews/VerticalPanel";
import { PanelDisplayType } from "../SettingsSchema";
import { usePanel } from '../hooks/usePanel';
import { useMenuManager } from '../hooks/useMenuManager';
import { PanelContext } from "../contexts/PanelContext";
import { PanelViewportContext } from "../contexts/PanelViewportContext";
import "../styles/index.css";
import SettingsButton from "./SettingsButton";
import { MenuManager } from './MenuManager';
import { Button, ButtonGroup, Content, Flex, Footer, Header } from "@adobe/react-spectrum";
import ChevronDoubleRight from '@spectrum-icons/workflow/ChevronDoubleRight';
import ChevronDoubleLeft from '@spectrum-icons/workflow/ChevronDoubleLeft';
import Play from '@spectrum-icons/workflow/Play';
import Pause from '@spectrum-icons/workflow/Pause';
import FileMenuBar from "./FileMenuBar";
import HelpButton from "./HelpButton";
import SearchBar from "./SearchBar";
import { SettingsContext } from "../contexts/SettingsContext";
import { MenuType } from '../contexts/MenuManagerContext';

const MONTH = 2592000000;

const PanelViewport: React.FC = () => {
    const { isPlaying } = useContext(PanelContext);
    const { activeView } = useContext(PanelViewportContext);
    const { settings, dispatch } = useContext(SettingsContext);

    const { togglePlayPause, navigateForward, navigateBackward } = usePanel();
    const { openMenu } = useMenuManager();

    // Check if it's been a month since the last time the app was opened
    // This ensures we only run on application initialization and after the settings system has loaded in
    const [hasRunInitDateCheck, setHasRunInitDateCheck] = useState(false);

    useEffect(() => {
        //If we've already run the check, exit early
        if (hasRunInitDateCheck)
            return;

        const sinceLastOpened = Date.now() - settings.flags.lastOpened;

        if (sinceLastOpened > MONTH) {
            openMenu(MenuType.HELP);
        }

        dispatch({ type: 'UPDATE_LAST_OPENED' });
        setHasRunInitDateCheck(true);
    }, [settings.flags.lastOpened]);

    return (
        <div id="layout">
            <Header margin="size-100">
                <FileMenuBar />
                <Flex position={"absolute"} right={0} zIndex={1000}>
                    <HelpButton />
                </Flex>
                <Flex justifyContent="center" width="100%">
                    <SettingsButton />
                </Flex>
                <SearchBar/>
            </Header>

            <Content id="panel-viewport">
                <MenuManager/>
                {activeView === PanelDisplayType.HORIZONTAL && <HorizontalPanel />}
                {activeView === PanelDisplayType.VERTICAL && <VerticalPanel />}
                {activeView === PanelDisplayType.ZOOM && <ZoomView />}
                {activeView === PanelDisplayType.FLASHCARD && <FlashcardView />}
            </Content>

            <Footer>
                <Flex justifyContent="center" width="100%">
                    <ButtonGroup justifySelf="center" alignSelf="center" align="center" margin="size-100">
                        <Button variant="secondary" onPress={navigateBackward} data-testid="navigate-backward-btn-test-id">
                            <ChevronDoubleLeft UNSAFE_style={{padding: '17px 27px'}}/>
                        </Button>
                        <Button variant="secondary" onPress={togglePlayPause} data-testid="play-btn-test-id" autoFocus>
                            {isPlaying 
                            ? <Pause size='XXL' UNSAFE_style={{padding: '17px 27px'}}/>
                            : <Play size='XXL' UNSAFE_style={{padding: '17px 27px'}}/>
                            }
                        </Button>
                        <Button variant="secondary" onPress={navigateForward} data-testid="navigate-forward-btn-test-id" autoFocus>
                            <ChevronDoubleRight UNSAFE_style={{padding: '17px 27px'}}/>
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Footer>
        </div>
    );
};

export default PanelViewport;
