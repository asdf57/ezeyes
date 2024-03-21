import React, { useContext } from "react";
import HorizontalPanel from "./panelviews/HorizontalPanel";
import ZoomView from "./panelviews/ZoomView";
import FlashcardView from "./panelviews/FlashcardView";
import VerticalPanel from "./panelviews/VerticalPanel";
import { PanelDisplayType } from "../SettingsSchema";
import { usePanel } from '../hooks/usePanel';
import { PanelContext } from "../contexts/PanelContext";
import { PanelViewportContext } from "../contexts/PanelViewportContext";
import "../styles/index.css";
import SettingsButton from "./SettingsButton";
import { MenuManager } from './MenuManager'
import { Button, ButtonGroup, Content, Flex, Footer, Header } from "@adobe/react-spectrum";
import ChevronDoubleRight from '@spectrum-icons/workflow/ChevronDoubleRight';
import ChevronDoubleLeft from '@spectrum-icons/workflow/ChevronDoubleLeft';
import Play from '@spectrum-icons/workflow/Play';
import Pause from '@spectrum-icons/workflow/Pause';
import FileMenuBar from "./FileMenuBar";

const PanelViewport: React.FC = () => {
    const { isPlaying } = useContext(PanelContext);
    const { activeView } = useContext(PanelViewportContext);

    const { togglePlayPause, navigateForward, navigateBackward} = usePanel();

    return (
        <div id="layout">
            <Header margin="size-100">
                <FileMenuBar />
                <Flex justifyContent="center" width="100%">   
                    <SettingsButton />
                </Flex>
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
                        <Button variant="secondary" onPress={navigateBackward}>
                            <ChevronDoubleLeft UNSAFE_style={{padding: '17px 27px'}}/>
                        </Button>
                        <Button variant="secondary" onPress={togglePlayPause} autoFocus>
                            {isPlaying 
                            ? <Pause size='XXL' UNSAFE_style={{padding: '17px 27px'}}/>
                            : <Play size='XXL' UNSAFE_style={{padding: '17px 27px'}}/>
                            }
                        </Button>
                        <Button variant="secondary" onPress={navigateForward} autoFocus>
                            <ChevronDoubleRight UNSAFE_style={{padding: '17px 27px'}}/>
                        </Button>
                    </ButtonGroup>
                </Flex>
            </Footer>
        </div>
    );
};

export default PanelViewport;
