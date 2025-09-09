import { useState, useRef, useCallback, useEffect } from 'react';

export const useTimer = (initialState = false) => {
  const [isPlaying, setIsPlaying] = useState(initialState);
  const [currentTime, setCurrentTime] = useState(0);

  const requestRef = useRef();
  const startTimeRef = useRef();
  const pausedTimeRef = useRef(0);

  const animate = (timestamp) => {
    if (startTimeRef.current === undefined) {
      startTimeRef.current = timestamp;
    }
    const elapsed = timestamp - startTimeRef.current;
    setCurrentTime(pausedTimeRef.current + elapsed);
    requestRef.current = requestAnimationFrame(animate);
  };

  useEffect(() => {
    if (isPlaying) {
      startTimeRef.current = undefined;
      requestRef.current = requestAnimationFrame(animate);
    } else {
      pausedTimeRef.current = currentTime;
      cancelAnimationFrame(requestRef.current);
    }

    return () => cancelAnimationFrame(requestRef.current);
  }, [isPlaying]);

  const resetTimer = useCallback(() => {
    setIsPlaying(false);
    setCurrentTime(0);
    pausedTimeRef.current = 0;
    startTimeRef.current = undefined;
    cancelAnimationFrame(requestRef.current);
  }, []);

  return { 
    currentTime: currentTime / 1000, 
    isPlaying, 
    setIsPlaying, 
    resetTimer 
  };
};