import { useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';
import { usePlaybackControl } from './usePlaybackControl';
import { SettingsContext } from '../contexts/SettingsContext';

export const usePanel = () => {
  const {
    curWordSequenceIndex,
    nextWordSequenceIndex,
    paragraphIndices,
    wordSequenceIndices,
    prevWordSequenceIndex,
    prevParagraphIndex,
    nextParagraphIndex,
    prevSentenceIndex,
    sentenceIndices,
    nextSentenceIndex,
    setCurWordSequenceIndex,
  } = useContext(PanelContext);

  const { settings } = useContext(SettingsContext);
  const speed = 1000 / (settings.panels.wpm.curWpm / 60);

  const navigateForward = () => {
    if (curWordSequenceIndex < wordSequenceIndices[wordSequenceIndices.length - 1])
      setCurWordSequenceIndex(nextWordSequenceIndex);
  };

  const navigateBackward = () => {
    if (curWordSequenceIndex > wordSequenceIndices[0])
      setCurWordSequenceIndex(prevWordSequenceIndex);
  };

  const navigateToPrevParagraph = () => {
    if (curWordSequenceIndex > paragraphIndices[0])
      setCurWordSequenceIndex(prevParagraphIndex);
  };

  const navigateToNextParagraph = () => {
    if (curWordSequenceIndex < paragraphIndices[paragraphIndices.length - 1])
      setCurWordSequenceIndex(nextParagraphIndex);
  };

  const navigateToPrevSentence = () => {
    if (curWordSequenceIndex > sentenceIndices[0])
      setCurWordSequenceIndex(prevSentenceIndex);
  };

  const navigateToNextSentence = () => {
  if (curWordSequenceIndex < sentenceIndices[sentenceIndices.length - 1])
      setCurWordSequenceIndex(nextSentenceIndex);
  };

  const { togglePlayPause } = usePlaybackControl(navigateForward, speed);

  return {
    navigateToPrevParagraph,
    navigateToNextParagraph,
    navigateToPrevSentence,
    navigateToNextSentence,
    navigateForward,
    navigateBackward,
    togglePlayPause,
  };
};