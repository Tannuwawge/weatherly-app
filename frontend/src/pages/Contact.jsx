import React from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';
import { LuMapPin, LuPhone, LuMail, LuInstagram, LuTwitter, LuFacebook } from 'react-icons/lu';

export default function Contact() {
  return (
    <div className="contact-page text-center">
      <div className="mb-5">
        <small className="d-block mb-2 opacity-75" style={{ color: 'var(--text-secondary)' }}>Let's Talk</small>
        <h1 className="display-4 fw-bold mb-3" style={{ color: 'var(--heading-color)' }}>Contact Us</h1>
        <p className="opacity-75 mx-auto" style={{ maxWidth: '700px', color: 'var(--text-secondary)' }}>
          Have questions about the weather or our AI? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
        </p>
      </div>

      <Row className="text-start g-5">
        {/* Left: Form */}
        <Col lg={7}>
          <h4 className="fw-bold mb-4" style={{ color: 'var(--heading-color)' }}>Send us a message</h4>
          <Form>
            <Row className="g-3 mb-3">
              <Col md={6}>
                <Form.Control type="text" placeholder="First name" className="glass-input" />
              </Col>
              <Col md={6}>
                <Form.Control type="text" placeholder="Last name" className="glass-input" />
              </Col>
            </Row>
            <div className="mb-3">
              <Form.Control type="email" placeholder="Email address" className="glass-input" />
            </div>
            <div className="mb-4">
              <Form.Control as="textarea" rows={5} placeholder="Your message" className="glass-input" style={{ borderRadius: '20px' }} />
            </div>
            <div className="text-end">
              <Button type="submit" className="btn-accent px-4 py-2">
                Send message
              </Button>
            </div>
          </Form>
        </Col>

        {/* Right: Info */}
        <Col lg={5} style={{ color: 'var(--text-primary)' }}>
          <div className="mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--heading-color)' }}>
              <LuMapPin className="text-accent" /> Address
            </h5>
            <p className="opacity-75">123 Mountain View, California, United States.</p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--heading-color)' }}>
              <LuPhone className="text-accent" /> Phone
            </h5>
            <p className="opacity-75">+1 123-456-7890</p>
          </div>

          <div className="mb-4">
            <h5 className="fw-bold mb-3 d-flex align-items-center gap-2" style={{ color: 'var(--heading-color)' }}>
              <LuMail className="text-accent" /> Email
            </h5>
            <p className="opacity-75">hello@Weatherly.com</p>
          </div>

          <div>
            <h5 className="fw-bold mb-3" style={{ color: 'var(--heading-color)' }}>Socials</h5>
            <div className="d-flex gap-3">
              <LuInstagram size={24} style={{ color: 'var(--accent-green)', cursor: 'pointer' }} />
              <LuTwitter size={24} style={{ color: 'var(--accent-green)', cursor: 'pointer' }} />
              <LuFacebook size={24} style={{ color: 'var(--accent-green)', cursor: 'pointer' }} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
