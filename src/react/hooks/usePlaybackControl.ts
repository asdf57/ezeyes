import { useEffect, useContext } from 'react';
import { PanelContext } from '../contexts/PanelContext';

export const usePlaybackControl = (updateFunction: () => void, speed: number) => {
  const { isPlaying, setIsPlaying } = useContext(PanelContext);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isPlaying) {
      intervalId = setInterval(updateFunction, speed);
    }

    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, updateFunction, speed]);

  const togglePlayPause = () => {
    setIsPlaying(isPlaying => !isPlaying);
  };

  return { togglePlayPause };
};
