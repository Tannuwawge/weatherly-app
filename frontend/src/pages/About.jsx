import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { LuSun } from 'react-icons/lu';

export default function About() {
  return (
    <div className="about-page">
      <Row className="align-items-center g-5">
        <Col lg={6}>
          {/* Green accent card with centered animated sun */}
          <div className="glass-card d-flex align-items-center justify-content-center" 
               style={{ minHeight: '400px', background: 'var(--accent-green)', border: 'none' }}>
             <LuSun size={120} color="#0f172a" className="opacity-75" style={{ animation: 'pulse-rotate 10s linear infinite' }} />
          </div>
        </Col>
        <Col lg={6}>
          <div className="ps-lg-4">
            <h5 className="opacity-75 mb-2" style={{ color: 'var(--text-secondary)' }}>Our Story</h5>
            <h1 className="display-4 fw-bold mb-4" style={{ color: 'var(--heading-color)' }}>About Us</h1>
            <p className="lead fs-6 opacity-75 mb-4" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              Weatherly was born from a simple idea: weather apps shouldn't just display data, they should tell a story. 
              We combine advanced AI agents with real-time meteorological data to provide natural language weather updates 
              that feel like talking to a friend.
            </p>
            <p className="lead fs-6 opacity-75" style={{ lineHeight: '1.8', color: 'var(--text-secondary)' }}>
              Built with modern technologies like React, FastAPI, and LangChain, our platform is designed to be as 
              beautiful as it is functional. Whether you're planning a weekend getaway or just checking if you need 
              an umbrella, Weatherly has you covered with style and precision.
            </p>
          </div>
        </Col>
      </Row>
    </div>
  );
}
