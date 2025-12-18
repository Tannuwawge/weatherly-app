import React, { useState, useEffect, useRef } from 'react';
import { Navbar, Nav, Container, Form } from 'react-bootstrap';
import { NavLink, Outlet } from 'react-router-dom';
import { LuCalendar } from 'react-icons/lu';

const Layout = () => {
  const [darkMode, setDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved === 'true';
  });
  
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [weatherCondition, setWeatherCondition] = useState(null);
  const dateInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('darkMode', darkMode);
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Dispatch date change event
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('weatherly-date-change', { detail: selectedDate }));
  }, [selectedDate]);

  // Dispatch weather change event
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('weatherly-weather-change', { detail: weatherCondition }));
  }, [weatherCondition]);

  return (
    <div className="app-content">
      <Navbar expand="lg" variant="dark" className="py-3">
        <Container>
          <Navbar.Brand as={NavLink} to="/" className="navbar-brand">
            Weatherly
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={NavLink} to="/" end>Home</Nav.Link>
              <Nav.Link as={NavLink} to="/about">About</Nav.Link>
              <Nav.Link as={NavLink} to="/contact">Contact</Nav.Link>
            </Nav>
            <div className="d-flex align-items-center gap-3">
              {/* Calendar Section */}
              <div className="position-relative d-flex align-items-center">
                <button 
                  className="calendar-btn"
                  onClick={() => dateInputRef.current?.showPicker?.() || dateInputRef.current?.focus()}
                  title="Change Date"
                >
                  <LuCalendar size={24} />
                </button>
                <input 
                  type="date" 
                  ref={dateInputRef}
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  style={{
                    opacity: 0,
                    width: '1px',
                    height: '1px',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    pointerEvents: 'none' // We rely on showPicker or label trigger, but keeping it focusable via script
                  }}
                />
              </div>

              {/* Dark Mode Toggle */}
              <Form.Check 
                type="switch"
                id="dark-mode-switch"
                label={darkMode ? "Dark Mode" : "Light Mode"}
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="text-white mb-0"
              />
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      
      <Container className="py-4">
        <Outlet context={{ darkMode, selectedDate, setWeatherCondition }} />
      </Container>
    </div>
  );
};

export default Layout;
