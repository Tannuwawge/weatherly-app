import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LuDroplets, LuWind } from 'react-icons/lu';
import { getWeatherIcon } from './WeatherIcons';

const CurrentWeatherCard = ({ data, date }) => {
  // Ensure data exists or use defaults
  // Fix timezone issue by setting time to noon if date is provided string
  const displayDate = date ? new Date(date + 'T12:00:00') : new Date();
  
  const dateStr = displayDate.toLocaleDateString('en-US', {  
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // If data is from forecast (unix timestamp), use that time, otherwise current time
  const timeStr = data?.dt 
    ? new Date(data.dt * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
    : new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  return (
    <div className="glass-card h-100">
      <div className="d-flex justify-content-between align-items-start mb-4">
        <div>
          <h2 className="fw-bold mb-0">{data?.city || 'Your City'}</h2>
          <small className="opacity-75">{dateStr} {timeStr}</small>
        </div>
        {getWeatherIcon(data?.icon, 64)}
      </div>

      <div className="d-flex align-items-center mb-4">
        <h1 className="display-1 fw-bold mb-0 me-3">
          {data?.temperature !== undefined ? Math.round(data.temperature) : '--'}°
        </h1>
        <div className="opacity-75">
          <div className="text-capitalize">{data?.description || '--'}</div>
          <div>Feels like {data?.feels_like !== undefined ? Math.round(data.feels_like) : '--'}°</div>
        </div>
      </div>

      <Row className="g-3">
        <Col xs={4}>
          <div className="p-3 rounded bg-white bg-opacity-10 text-center h-100 d-flex flex-column justify-content-center align-items-center">
            <LuDroplets size={24} className="mb-1" />
            <div className="small opacity-75">Humidity</div>
            <div className="fw-bold">{data?.humidity !== undefined ? data.humidity + '%' : '--'}</div>
          </div>
        </Col>
        <Col xs={4}>
          <div className="p-3 rounded bg-white bg-opacity-10 text-center h-100 d-flex flex-column justify-content-center align-items-center">
            <LuWind size={24} className="mb-1" />
            <div className="small opacity-75">Wind</div>
            <div className="fw-bold">{data?.wind_kmh !== undefined ? data.wind_kmh + ' km/h' : '--'}</div>
          </div>
        </Col>
        <Col xs={4}>
           <div className="p-3 rounded bg-white bg-opacity-10 text-center h-100 d-flex flex-column justify-content-center align-items-center">
             <div className="mb-1">
               {getWeatherIcon(data?.icon, 24)}
             </div>
             <div className="small opacity-75">Condition</div>
             <div className="fw-bold small text-truncate" style={{ maxWidth: '100%' }}>{data?.description || '--'}</div>
           </div>
        </Col>
      </Row>
    </div>
  );
};

export default CurrentWeatherCard;
