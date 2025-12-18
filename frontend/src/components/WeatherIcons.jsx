import React from 'react';
import { 
  LuSun, LuMoon, LuCloud, LuCloudSun, LuCloudMoon, 
  LuCloudRain, LuCloudDrizzle, LuCloudLightning, 
  LuCloudSnow, LuWind 
} from 'react-icons/lu';

export const getWeatherIcon = (iconCode, size = 64, color = "#FDB813") => {
  if (!iconCode) return <LuSun size={size} color={color} />;

  // OpenWeatherMap icon codes
  const code = iconCode.replace('n', 'd'); // Simplify night to day for some icons if generic, but distinct for clear/clouds
  const isNight = iconCode.includes('n');

  switch (iconCode) {
    case '01d': return <LuSun size={size} color="#FDB813" />;
    case '01n': return <LuMoon size={size} color="#FDB813" />; // Moon color?
    case '02d': return <LuCloudSun size={size} color="#FDB813" />;
    case '02n': return <LuCloudMoon size={size} color="#A7BFE8" />;
    case '03d': 
    case '03n': 
    case '04d': 
    case '04n': return <LuCloud size={size} color="#A7BFE8" />;
    case '09d': 
    case '09n': return <LuCloudDrizzle size={size} color="#5F9FD7" />;
    case '10d': 
    case '10n': return <LuCloudRain size={size} color="#5F9FD7" />;
    case '11d': 
    case '11n': return <LuCloudLightning size={size} color="#F6B1C3" />;
    case '13d': 
    case '13n': return <LuCloudSnow size={size} color="#FFFFFF" />;
    case '50d': 
    case '50n': return <LuWind size={size} color="#CFCFCF" />;
    default: return <LuSun size={size} color={color} />;
  }
};
