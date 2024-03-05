import React from 'react';
import { useInView } from 'react-intersection-observer';

const Word = ({ word, wordIndex, onStartHere, isHighlighted }: any) => {
    const { ref, inView } = useInView({ triggerOnce: false, fallbackInView: true});
  
  
    const highlightClass = isHighlighted ? 'highlight' : '';

    return (
      <span ref={ref} id={`word-${wordIndex}`} className={highlightClass} onClick={() => onStartHere(wordIndex)}>
        {inView ? word : null}
      </span>
    );
  };


export default React.memo(Word);
