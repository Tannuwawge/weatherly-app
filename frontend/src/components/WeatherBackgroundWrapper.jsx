import React, { useState, useEffect } from 'react';
import WeatherBackground from './WeatherBackground';
import { useLocation } from 'react-router-dom';

const getSeasonFromDate = (dateStr) => {
  if (!dateStr) return 'sun';
  const date = new Date(dateStr);
  const month = date.getMonth(); // 0-11
  
  // Winter: Oct (9) - Feb (1)
  if (month >= 9 || month <= 1) return 'snow';
  // Rainy: Jul (6) - Sep (8)
  if (month >= 6 && month <= 8) return 'rain';
  // Summer: Mar (2) - Jun (5)
  return 'sun';
};

export default function WeatherBackgroundWrapper() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weatherOverride, setWeatherOverride] = useState(null);
  
  // Listen for custom events dispatched by other components
  useEffect(() => {
    const handleDateChange = (e) => {
        if (e.detail) setSelectedDate(e.detail);
    };
    
    const handleWeatherChange = (e) => {
        setWeatherOverride(e.detail); // detail can be null to clear override
    };

    window.addEventListener('weatherly-date-change', handleDateChange);
    window.addEventListener('weatherly-weather-change', handleWeatherChange);

    return () => {
        window.removeEventListener('weatherly-date-change', handleDateChange);
        window.removeEventListener('weatherly-weather-change', handleWeatherChange);
    };
  }, []);

  const finalCondition = weatherOverride || getSeasonFromDate(selectedDate);

  return (
    <>
      <div className="global-background" />
      <WeatherBackground condition={finalCondition} />
    </>
  );
}
