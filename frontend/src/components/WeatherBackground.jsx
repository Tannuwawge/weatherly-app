import React, { useEffect, useState, useMemo } from 'react';
import '../styles/WeatherBackground.css';

const WeatherBackground = ({ condition }) => {
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setIsPaused(document.hidden);
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  const animationType = useMemo(() => {
    if (!condition) return 'sun';
    const lower = condition.toLowerCase();
    if (lower.includes('rain') || lower.includes('drizzle') || lower.includes('thunder')) return 'rain';
    if (lower.includes('snow') || lower.includes('sleet') || lower.includes('ice')) return 'snow';
    if (lower.includes('clear') || lower.includes('sun') || lower.includes('cloud')) return 'sun';
    return 'sun'; // Default
  }, [condition]);

  return (
    <div className="weather-bg">
      <RainyEffect active={animationType === 'rain'} paused={isPaused} />
      <SnowyEffect active={animationType === 'snow'} paused={isPaused} />
      <SunnyEffect active={animationType === 'sun'} paused={isPaused} />
    </div>
  );
};

const RainyEffect = ({ active, paused }) => {
  const drops = useMemo(() => [...Array(50)].map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 0.5 + 0.5
  })), []);

  const containerStyle = {
    opacity: active ? 1 : 0,
    transition: 'opacity 1s ease',
    pointerEvents: 'none',
    zIndex: 1
  };

  const animState = (!active || paused) ? 'paused' : 'running';

  return (
    <div className="rain-container" style={containerStyle}>
      {drops.map((d, i) => (
        <div 
          key={i} 
          className="raindrop"
          style={{
            left: `${d.left}%`,
            animationDelay: `${d.delay}s`,
            animationDuration: `${d.duration}s`,
            animationPlayState: animState
          }}
        />
      ))}
      <div 
        className="lightning" 
        style={{ 
            animation: 'flash 15s infinite', // Slower, rarer
            animationPlayState: animState 
        }} 
      />
    </div>
  );
};

const SnowyEffect = ({ active, paused }) => {
  const flakes = useMemo(() => [...Array(40)].map((_, i) => ({
    left: Math.random() * 100,
    delay: Math.random() * 5,
    duration: Math.random() * 5 + 5,
    size: Math.random() * 1.5 + 0.5, // em units
    opacity: Math.random() * 0.5 + 0.5
  })), []);

  const containerStyle = {
    opacity: active ? 1 : 0,
    transition: 'opacity 1s ease',
    pointerEvents: 'none',
    zIndex: 1
  };

  const animState = (!active || paused) ? 'paused' : 'running';

  return (
    <div className="snow-container" style={containerStyle}>
      {flakes.map((f, i) => (
        <div 
          key={i} 
          className="snowflake"
          style={{
            left: `${f.left}%`,
            fontSize: `${f.size}em`, // Use font-size for unicode snowflake
            animationDelay: `${f.delay}s`,
            animationDuration: `${f.duration}s`,
            opacity: f.opacity,
            animationPlayState: animState
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

const SunnyEffect = ({ active, paused }) => {
  const containerStyle = {
    opacity: active ? 1 : 0,
    transition: 'opacity 1s ease',
    pointerEvents: 'none',
    zIndex: 1
  };

  const animState = (!active || paused) ? 'paused' : 'running';

  return (
    <div className="sun-container" style={containerStyle}>
      <div 
        className="sun-rays" 
        style={{ animationPlayState: animState }} 
      />
    </div>
  );
};

export default WeatherBackground;
