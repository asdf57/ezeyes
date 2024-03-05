import React from 'react';
import { useInView } from 'react-intersection-observer';

const Chunk = ({ words }: any) => {
  const { ref, inView } = useInView({ triggerOnce: false });

  return (
    <div ref={ref}>
      {inView ? words : null}
    </div>
  );
};

export default React.memo(Chunk);
