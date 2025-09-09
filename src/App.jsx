import { useState, useEffect } from 'react';
import './App.css';
import { lyricsData } from './lyricsData.js';
import { useTimer } from './useTimer.js';

function App() {
  const [currentLineIndex, setCurrentLineIndex] = useState(-1);
  const { currentTime, isPlaying, setIsPlaying, resetTimer } = useTimer();

  const handlePlayPause = () => {
    setIsPlaying(prev => !prev);
  };
  
  const handleReset = () => {
    resetTimer();
    setCurrentLineIndex(-1);
  };

  useEffect(() => {
    let newIndex = -1;
    for (let i = lyricsData.length - 1; i >= 0; i--) {
      if (currentTime >= lyricsData[i].time) {
        newIndex = i;
        break;
      }
    }

    if (newIndex !== currentLineIndex) {
      setCurrentLineIndex(newIndex);
    }
  }, [currentTime, currentLineIndex]);

  useEffect(() => {
    const activeLyric = document.querySelector('.lyric-line.active');
    if (activeLyric) {
      activeLyric.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [currentLineIndex]);

  return (
    <div className="app-container">
      <div className="lyrics-container">
        {currentLineIndex === -1 && (
            <p className="lyric-line active" style={{ fontStyle: 'italic', opacity: 0.6 }}>
                Tekan play untuk memulai...
            </p>
        )}
        {lyricsData.map((line, index) => (
          <p
            key={index}
            className={`lyric-line ${index === currentLineIndex ? 'active' : ''}`}
          >
            {line.text}
          </p>
        ))}
      </div>

      <div className="controls">
        <button onClick={handleReset} className="control-btn" title="Reset">
          ⟲
        </button>
        <button onClick={handlePlayPause} className="play-pause-btn">
          {isPlaying ? '❚❚' : '►'}
        </button>
      </div>
    </div>
  );
}

export default App;