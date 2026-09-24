'use client';

import React, { useState, useEffect } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = formData.name || 'Not specified';
    const phone = formData.phone || 'Not specified';
    const email = formData.email || 'Not specified';
    const subject = formData.subject || 'General Inquiry';
    const message = formData.message || 'No message text provided';

    const text = `Hi Pure Drops RO, I would like to send an Inquiry from your website.

📩 *Contact Details:*
• *Name:* ${name}
• *Phone:* ${phone}
• *Email:* ${email}
• *Subject:* ${subject}
• *Message:* ${message}`;

    const whatsappUrl = `https://wa.me/919497150452?text=${encodeURIComponent(text)}`;

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      if (typeof window !== 'undefined') {
        window.open(whatsappUrl, '_blank');
      }
      setFormData({
        name: '',
        phone: '',
        email: '',
        subject: '',
        message: ''
      });

      setTimeout(() => {
        setSubmitSuccess(false);
      }, 6000);
    }, 600);
  };

  return (
    <>
      {/* ==========================================================================
           PAGE BANNER
           ========================================================================== */}
      <section className="page-banner" aria-label="Contact page introduction">
        <div className="container">
          <h1>Connect With Us</h1>
          <p>Drop by our laboratory counter or submit an inquiry to coordinate technician visits.</p>
        </div>
        
        {/* Banner Wave SVG */}
        <svg className="banner-wave" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 32L60 48C120 64 240 96 360 101.3C480 107 600 85 720 69.3C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V32Z" fill="#FFF"/>
        </svg>

        <div className="banner-decorations">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>
      </section>

      {/* ==========================================================================
           CONTACT DETAILS & FORM
           ========================================================================== */}
      <section className="section">
        <div className="container">
          <div className="contact-layout-grid">
            
            {/* Left Contact Info Details */}
            <div className="contact-info-panel animate-on-scroll">
              <h2 style={{ color: 'var(--bg-white)', fontSize: '1.8rem', marginBottom: '0.5rem' }}>Contact Info</h2>
              <p style={{ opacity: 0.9, marginBottom: '1.5rem', fontSize: '0.95rem' }}>Reach out via phone, email, or stop by our office directly.</p>

              {/* Address */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                </div>
                <div className="info-text">
                  <h3>Our Location</h3>
                  <p>
                    <a 
                      href="https://maps.app.goo.gl/QV4dZ44GWSHjJnKV7" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--bg-white)', textDecoration: 'underline' }}
                    >
                      Surabhi Complex, Karadi,<br />Thamarassery, Kerala 673573
                    </a>
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                </div>
                <div className="info-text">
                  <h3>Call Support</h3>
                  <p style={{ marginBottom: '0.3rem' }}><a href="tel:+919497150452" style={{ color: 'var(--bg-white)' }}>94971 50452</a></p>
                  <p><a href="tel:+919846253025" style={{ color: 'var(--bg-white)' }}>98462 53025</a></p>
                </div>
              </div>

              {/* Email */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p><a href="mailto:aquasolve.in@gmail.com" style={{ color: 'var(--bg-white)' }}>aquasolve.in@gmail.com</a></p>
                </div>
              </div>

              {/* Hours */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 10 10 10-4.48 10-10S17.51 2 11.99 2zM12 20c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67V7z"/></svg>
                </div>
                <div className="info-text">
                  <h3>Operating Hours</h3>
                  <p>Monday - Saturday: 9:00 AM - 7:00 PM<br />Sunday: Closed</p>
                </div>
              </div>

              {/* Social links */}
              <div className="social-links">
                <a href="#" className="social-icon" aria-label="Facebook"><svg viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.8c4.56-.93 8-4.96 8-9.8z"/></svg></a>
                <a href="#" className="social-icon" aria-label="Twitter"><svg viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.54v.05c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.12.15-.27 0-.54-.03-.8-.08.54 1.68 2.1 2.9 3.95 2.94-1.44 1.13-3.26 1.8-5.23 1.8-.34 0-.67-.02-1-.06C2.62 19.39 4.88 20 7.29 20c7.8c0 12.05-5.3 12.05-12.05 0-.34 0-.67-.04-1-.07C2 15.35 4.55 12 7.29 12z"/></svg></a>
                <a href="#" className="social-icon" aria-label="LinkedIn"><svg viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
              </div>
            </div>

            {/* Contact Inquiry Form */}
            <div className="booking-form-box animate-on-scroll">
              <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-color)', marginBottom: '1.5rem' }}>Send Message</h2>
              <form id="contactPageForm" onSubmit={handleSubmit}>
                {submitSuccess ? (
                  <div 
                    style={{
                      background: '#e6fffa',
                      border: '1px solid #319795',
                      color: '#234e52',
                      padding: '1.2rem',
                      borderRadius: '8px',
                      fontFamily: 'Outfit, sans-serif',
                      fontWeight: '600',
                      fontSize: '0.95rem',
                      textAlign: 'center',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '0.5rem',
                      animation: 'float 3s ease-in-out infinite'
                    }}
                  >
                    <svg style={{ width: '20px', height: '20px', fill: '#319795' }} viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    Message sent successfully!
                  </div>
                ) : (
                  <>
                    <div className="form-group">
                      <label htmlFor="name">Full Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        className="form-control" 
                        required 
                        placeholder="Enter name"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="phone">Phone Number</label>
                        <input 
                          type="tel" 
                          id="phone" 
                          className="form-control" 
                          required 
                          placeholder="Enter phone number"
                          value={formData.phone}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input 
                          type="email" 
                          id="email" 
                          className="form-control" 
                          required 
                          placeholder="Enter email address"
                          value={formData.email}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="subject">Subject</label>
                      <input 
                        type="text" 
                        id="subject" 
                        className="form-control" 
                        required 
                        placeholder="E.g., Domestic RO quote, softener details..."
                        value={formData.subject}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Your Message</label>
                      <textarea 
                        id="message" 
                        className="form-control" 
                        required 
                        placeholder="Describe your request..."
                        value={formData.message}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                    </div>
                    <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                      {isSubmitting ? 'Sending...' : 'Send Message'}
                    </button>
                  </>
                )}
              </form>
            </div>

          </div>

          {/* Map Section */}
          <div className="map-placeholder-section animate-on-scroll">
            <div className="section-header" style={{ marginBottom: '2rem' }}>
              <h2>Our Physical Address Map</h2>
              <p>Visit us in Thamarassery, Kozhikode, for laboratory analysis or direct purchases.</p>
            </div>

            <div className="map-grid-canvas">
              <svg className="map-drawing" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400">
                <rect width="100%" height="100%" fill="#E5E9F0"/>
                <path d="M-10 120 L810 120" stroke="#FFF" strokeWidth="25" fill="none"/>
                <path d="M-10 120 L810 120" stroke="#D8DEE9" strokeWidth="15" fill="none"/>
                
                <path d="M220 -10 L220 410" stroke="#FFF" strokeWidth="20" fill="none"/>
                <path d="M220 -10 L220 410" stroke="#D8DEE9" strokeWidth="12" fill="none"/>
                
                <path d="M520 -10 L520 410" stroke="#FFF" strokeWidth="25" fill="none"/>
                <path d="M520 -10 L520 410" stroke="#D8DEE9" strokeWidth="15" fill="none"/>
                
                <path d="M-10 300 C200 300, 300 280, 520 220 C600 200, 700 320, 810 320" stroke="#FFF" strokeWidth="18" fill="none"/>
                <path d="M-10 300 C200 300, 300 280, 520 220 C600 200, 700 320, 810 320" stroke="#D8DEE9" strokeWidth="10" fill="none"/>

                <path d="M-10 50 C200 80, 400 30, 600 70 C700 90, 750 20, 810 10" stroke="#88C0D0" strokeWidth="30" fill="none" opacity="0.6"/>
                
                <rect x="50" y="150" width="120" height="100" rx="10" fill="#A3BE8C" opacity="0.4"/>
                <text x="110" y="205" fontFamily="Outfit, sans-serif" fontWeight="600" fontSize="12" fill="#4C566A" textAnchor="middle">Karadi Greenery</text>

                <rect x="580" y="140" width="140" height="80" rx="10" fill="#A3BE8C" opacity="0.4"/>
                <text x="650" y="185" fontFamily="Outfit, sans-serif" fontWeight="600" fontSize="12" fill="#4C566A" textAnchor="middle">Surabhi Complex</text>

                <circle cx="220" cy="120" r="8" fill="#5E81AC"/>
                <text x="230" y="115" fontFamily="Outfit, sans-serif" fontSize="10" fontWeight="600" fill="#2E3440">Thamarassery Junction</text>
                
                <circle cx="520" cy="300" r="8" fill="#5E81AC"/>
                <text x="532" y="304" fontFamily="Outfit, sans-serif" fontSize="10" fontWeight="600" fill="#2E3440">Thamarassery - Wayanad Road</text>
                
                <g transform="translate(520, 160)">
                  <path d="M0 -30 C-10 -30, -18 -22, -18 -12 C-18 0, 0 30, 0 30 C0 30, 18 0, 18 -12 C18 -22, 10 -30, 0 -30 Z" fill="#BF616A"/>
                  <circle cx="0" cy="-12" r="6" fill="#FFF"/>
                </g>
              </svg>

              <div className="map-card-popup">
                <h4>Pure Drops RO</h4>
                <p>Surabhi Complex, Karadi, Thamarassery</p>
                <p style={{ fontWeight: 700, color: 'var(--secondary-color)', marginTop: '0.3rem' }}>Call: 94971 50452 / 98462 53025</p>
                <a 
                  href="https://maps.app.goo.gl/QV4dZ44GWSHjJnKV7" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="btn btn-primary" 
                  style={{ display: 'block', fontSize: '0.8rem', padding: '0.4rem 0.8rem', marginTop: '0.8rem', textAlign: 'center', background: 'var(--secondary-color)', color: '#fff', textDecoration: 'none' }}
                >
                  View on Google Maps
                </a>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
