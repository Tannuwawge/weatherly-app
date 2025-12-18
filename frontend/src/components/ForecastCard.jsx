import React from 'react';
import { getWeatherIcon } from './WeatherIcons';

const ForecastCard = ({ hourly = [], daily = [] }) => {
  return (
    <div className="glass-card h-100">
      <h4 className="fw-bold mb-4">Hourly Forecast</h4>
      <div className="d-flex justify-content-between mb-5 overflow-auto pb-2" style={{ gap: '1rem' }}>
        {hourly.length > 0 ? hourly.map((item, idx) => (
          <div key={idx} className="text-center p-2 rounded bg-white bg-opacity-10" style={{ minWidth: '80px' }}>
             <div className="small mb-2 opacity-75">
               {new Date(item.dt * 1000).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
             </div>
             <div className="mb-2 d-flex justify-content-center">
               {getWeatherIcon(item.weather[0].icon, 32)}
             </div>
             <div className="fw-bold">{Math.round(item.main.temp)}°C</div>
          </div>
        )) : (
          <div className="text-center w-100 opacity-50">No hourly data available</div>
        )}
      </div>

      <h4 className="fw-bold mb-3">5-Day Forecast</h4>
      <div className="d-flex flex-column gap-3">
        {daily.length > 0 ? daily.map((item, idx) => (
          <div key={idx} className="d-flex justify-content-between align-items-center">
            <div style={{ width: '100px' }} className="opacity-75">
              {new Date(item.dt * 1000).toLocaleDateString([], {weekday: 'long'})}
            </div>
            <div className="d-flex align-items-center gap-2">
              {getWeatherIcon(item.weather[0].icon, 24)}
              <span>{item.weather[0].main}</span>
            </div>
            <div className="fw-bold">{Math.round(item.main.temp)}°C</div>
          </div>
        )) : (
            <div className="text-center w-100 opacity-50">No forecast data available</div>
        )}
      </div>
    </div>
  );
};

export default ForecastCard;
