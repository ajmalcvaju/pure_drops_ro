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

    const whatsappUrl = `https://wa.me/919745137799?text=${encodeURIComponent(text)}`;

    setIsSubmitting(false);
    setSubmitSuccess(true);
    if (typeof window !== 'undefined') {
      window.location.href = whatsappUrl;
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
  };

  return (
    <>
      {/* ==========================================================================
           PAGE BANNER
           ========================================================================== */}
      <section className="page-banner" aria-label="Contact page introduction">
        <div className="container">
          <h1>Connect With Us</h1>
          <p>Submit an inquiry or contact us directly to coordinate technician visits and water testing.</p>
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
                  <h3>Our Registered Office</h3>
                  <p>
                    <a 
                      href="https://maps.app.goo.gl/QV4dZ44GWSHjJnKV7" 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      style={{ color: 'var(--bg-white)', textDecoration: 'underline' }}
                    >
                      10/505, Chethukadavu, Mukkam Road,<br />Kunnamangalam, Kozhikode, Kerala - 673571
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
                  <p><a href="tel:+919745137799" style={{ color: 'var(--bg-white)' }}>97451 37799</a></p>
                </div>
              </div>

              {/* Email */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                </div>
                <div className="info-text">
                  <h3>Email Us</h3>
                  <p><a href="mailto:waterpuredrops@gmail.com" style={{ color: 'var(--bg-white)' }}>waterpuredrops@gmail.com</a></p>
                </div>
              </div>

              {/* GSTIN */}
              <div className="info-item">
                <div className="info-icon">
                  <svg viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
                </div>
                <div className="info-text">
                  <h3>GST Registration</h3>
                  <p style={{ fontWeight: '600', letterSpacing: '0.5px' }}>32IQAPK9062G1ZT</p>
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
          <div className="map-section animate-on-scroll" style={{ marginTop: '3rem' }}>
            <div className="section-header" style={{ marginBottom: '2rem', textAlign: 'center' }}>
              <h2>Our Location Map</h2>
              <p>Visit us at Chethukadavu, Kunnamangalam, Kozhikode for consultations or direct purchases.</p>
            </div>

            <div style={{ position: 'relative', width: '100%', borderRadius: '16px', overflow: 'hidden', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3911.935547758951!2d75.88970290000002!3d11.339418400000001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTHCsDIwJzIxLjkiTiA3NcKwNTMnMjIuOSJF!5e0!3m2!1sen!2sin!4v1790237014922!5m2!1sen!2sin" 
                width="100%" 
                height="450" 
                style={{ border: 0, display: 'block' }} 
                allowFullScreen="" 
                loading="lazy" 
                referrerPolicy="strict-origin-when-cross-origin"
                title="Pure Drops RO Google Maps Location"
              ></iframe>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
