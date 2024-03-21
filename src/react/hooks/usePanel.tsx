import { useContext, useEffect, useRef } from 'react';
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
    curWordSequence,
    textContent,
    wordIndices,
    setCurWordSequenceIndex,
  } = useContext(PanelContext);


  const curWordSequenceRef = useRef(curWordSequence);
  const textContentRef = useRef(textContent);
  const prevParagraphIndexRef = useRef(prevParagraphIndex);
  const nextParagraphIndexRef = useRef(nextParagraphIndex);
  const prevSentenceIndexRef = useRef(prevSentenceIndex);
  const nextSentenceIndexRef = useRef(nextSentenceIndex);
  const prevWordSequenceIndexRef = useRef(prevWordSequenceIndex);
  const curWordSequenceIndexRef = useRef(curWordSequenceIndex);
  const nextWordSequenceIndexRef = useRef(nextWordSequenceIndex);
  const paragraphIndicesRef = useRef(paragraphIndices);
  const sentenceIndicesRef = useRef(sentenceIndices);
  const wordSequenceIndicesRef = useRef(wordSequenceIndices);
  const wordIndicesRef = useRef(wordIndices);

  useEffect(() => {
    curWordSequenceRef.current = curWordSequence;
    textContentRef.current = textContent;
    prevParagraphIndexRef.current = prevParagraphIndex;
    nextParagraphIndexRef.current = nextParagraphIndex;
    prevSentenceIndexRef.current = prevSentenceIndex;
    nextSentenceIndexRef.current = nextSentenceIndex;
    prevWordSequenceIndexRef.current = prevWordSequenceIndex;
    curWordSequenceIndexRef.current = curWordSequenceIndex;
    nextWordSequenceIndexRef.current = nextWordSequenceIndex;
    paragraphIndicesRef.current = paragraphIndices;
    sentenceIndicesRef.current = sentenceIndices;
    wordSequenceIndicesRef.current = wordSequenceIndices;
    wordIndicesRef.current = wordIndices;
  }, [
    curWordSequence,
    textContent,
    prevParagraphIndex,
    nextParagraphIndex,
    prevSentenceIndex,
    nextSentenceIndex,
    prevWordSequenceIndex,
    curWordSequenceIndex,
    nextWordSequenceIndex,
    paragraphIndices,
    wordSequenceIndices,
    sentenceIndices,
    wordIndices,
  ]);

  const { settings } = useContext(SettingsContext);
  const speed = 1000 / (settings.processing.wpm[settings.processing.wpm.type].current / 60);

  const navigateForward = () => {
    if (curWordSequenceIndexRef.current < wordSequenceIndicesRef.current[wordSequenceIndicesRef.current.length - 1])
      setCurWordSequenceIndex(nextWordSequenceIndexRef.current);
  };

  const navigateBackward = () => {
    if (curWordSequenceIndexRef.current > wordSequenceIndicesRef.current[0])
      setCurWordSequenceIndex(prevWordSequenceIndexRef.current);
  };

  const navigateToPrevParagraph = () => {
    if (curWordSequenceIndexRef.current > paragraphIndicesRef.current[0])
      setCurWordSequenceIndex(prevParagraphIndexRef.current);
  };

  const navigateToNextParagraph = () => {
    if (curWordSequenceIndexRef.current < paragraphIndicesRef.current[paragraphIndicesRef.current.length - 1])
      setCurWordSequenceIndex(nextParagraphIndexRef.current);
  };

  const navigateToPrevSentence = () => {
    if (curWordSequenceIndexRef.current > sentenceIndicesRef.current[0])
      setCurWordSequenceIndex(prevSentenceIndexRef.current);
  };

  const navigateToNextSentence = () => {
  if (curWordSequenceIndexRef.current < sentenceIndicesRef.current[sentenceIndicesRef.current.length - 1])
      setCurWordSequenceIndex(nextSentenceIndexRef.current);
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