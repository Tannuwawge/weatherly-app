import React, { useState, useEffect, useMemo } from 'react';
import { Row, Col, Form, Button, Spinner, Alert } from 'react-bootstrap';
import { useOutletContext } from 'react-router-dom';
import { sendQuery } from '../services/api';
import CurrentWeatherCard from '../components/CurrentWeatherCard';
import ForecastCard from '../components/ForecastCard';
import { LuSun } from 'react-icons/lu';

export default function Home() {
  const { selectedDate, setWeatherCondition } = useOutletContext();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [data, setData] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setLoading(true);
    setError('');
    setMessage('');
    setData(null);
    try {
      const res = await sendQuery(query);
      setMessage(res.message);
      setData(res.data || null);
    } catch (e) {
      setError(e.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  // Derive displayed weather based on selectedDate
  const displayedWeather = useMemo(() => {
    if (!data) return null;
    const today = new Date().toISOString().split('T')[0];

    // If today or no date selected (fallback), return current data
    if (!selectedDate || selectedDate === today) {
      return data;
    }

    // Check forecast
    if (data.forecast?.list) {
      // Find forecast item matching the date
      // OpenWeatherMap dt_txt is "YYYY-MM-DD HH:MM:SS"
      const candidates = data.forecast.list.filter(item => item.dt_txt.startsWith(selectedDate));
      
      if (candidates.length > 0) {
        // Pick noon or first available
        const target = candidates.find(item => item.dt_txt.includes("12:00:00")) || candidates[0];
        
        return {
          city: data.city,
          temperature: target.main.temp,
          feels_like: target.main.feels_like,
          humidity: target.main.humidity,
          wind_kmh: Math.round(target.wind.speed * 3.6 * 10) / 10,
          description: target.weather[0].description,
          icon: target.weather[0].icon,
          dt: target.dt
        };
      }
    }
    
    return null; // Date not in forecast
  }, [data, selectedDate]);

  // Update background animation when displayed weather changes
  useEffect(() => {
    if (displayedWeather?.description) {
      setWeatherCondition(displayedWeather.description);
    } else if (data?.description && !displayedWeather) {
      // If displayedWeather is null (date out of range), maybe fall back to current weather bg?
      // Or just keep previous. Let's set to current.
      setWeatherCondition(data.description);
    }
  }, [displayedWeather, data, setWeatherCondition]);

  // Prepare Forecast Data
  const { hourly, daily } = useMemo(() => {
    if (!data?.forecast?.list) return { hourly: [], daily: [] };

    const list = data.forecast.list;
    
    // Hourly: 
    // If selectedDate is present and not today, show 3-hour intervals for that specific date.
    // Otherwise, show next 5 intervals from now.
    let hourlyData = [];
    const today = new Date().toISOString().split('T')[0];

    if (selectedDate && selectedDate !== today) {
        // Filter for the selected date
        hourlyData = list.filter(item => item.dt_txt.startsWith(selectedDate)).slice(0, 5);
    } else {
        // Default: Next 5 items
        hourlyData = list.slice(0, 5);
    }

    // Daily: One per day for next 5 days
    const dailyMap = {};
    list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap[date]) {
        dailyMap[date] = item;
      } else {
        const current = dailyMap[date];
        const currentHour = parseInt(current.dt_txt.split(' ')[1].split(':')[0]);
        const newHour = parseInt(item.dt_txt.split(' ')[1].split(':')[0]);
        // Prefer closer to noon (12)
        if (Math.abs(newHour - 12) < Math.abs(currentHour - 12)) {
          dailyMap[date] = item;
        }
      }
    });
    
    const dailyData = Object.values(dailyMap).sort((a, b) => a.dt - b.dt).slice(0, 5);

    return { hourly: hourlyData, daily: dailyData };
  }, [data, selectedDate]);

  return (
    <div className="home-page">
      {/* Search Section */}
      <div className="d-flex justify-content-center mb-5">
        <Form onSubmit={onSubmit} className="d-flex w-100" style={{ maxWidth: '600px' }}>
          <div className="position-relative w-100">
            <Form.Control
              type="text"
              placeholder="Search for your preferred City..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="glass-input"
            />
            <Button 
              type="submit" 
              className="btn-accent position-absolute top-0 end-0 m-1"
              disabled={loading}
            >
              {loading ? <Spinner size="sm" animation="border" /> : 'Search'}
            </Button>
          </div>
        </Form>
      </div>

      {error && <Alert variant="danger" className="glass-card text-white border-danger bg-danger bg-opacity-25">{error}</Alert>}
      
      {/* Main Content */}
      <Row className="g-4">
        {/* Left Card: Current Weather */}
        <Col lg={6}>
          {displayedWeather ? (
             <CurrentWeatherCard 
                data={displayedWeather} 
                date={selectedDate} 
             />
          ) : (
             <div className="glass-card h-100 d-flex align-items-center justify-content-center opacity-75">
                {data ? (
                  <div className="text-center">
                    <h4>Forecast data not available</h4>
                    <p>Please select a date within the next 5 days.</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <LuSun size={48} className="mb-3 opacity-50" />
                    <h4>Enter a city to start</h4>
                  </div>
                )}
             </div>
          )}
        </Col>

        {/* Right Card: Forecast */}
        <Col lg={6}>
          {data ? (
            <ForecastCard hourly={hourly} daily={daily} />
          ) : (
            <div className="glass-card h-100 d-flex align-items-center justify-content-center text-center opacity-75">
              <div>
                <h5>Forecast will appear here</h5>
                <p>Detailed hourly and 5-day forecast.</p>
              </div>
           </div>
          )}
        </Col>
      </Row>
    </div>
  );
}
