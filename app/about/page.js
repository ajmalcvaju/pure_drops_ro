'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useQuote } from '../../context/QuoteContext';

function CounterNumber({ target, suffix = '+' }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let startTime = null;
          const duration = 2000;

          const step = (timestamp) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const currentCount = Math.floor(easeProgress * target);
            setCount(currentCount);

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

export default function About() {
  const { openModal } = useQuote();

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

  return (
    <>
      {/* ==========================================================================
           PAGE BANNER
           ========================================================================== */}
      <section className="page-banner" aria-label="About us page introduction">
        <div className="container">
          <h1>About Pure Drops RO</h1>
          <p>A look into our history, values, and commitment to distributing clean water and premium wellness across Kozhikode since 2001.</p>
        </div>
        
        {/* Banner Wave SVG */}
        <svg className="banner-wave" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 32L60 48C120 64 240 96 360 101.3C480 107 600 85 720 69.3C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V32Z" fill="#F4F9F9"/>
        </svg>

        <div className="banner-decorations">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>
      </section>

      {/* ==========================================================================
           COMPANY PROFILE / PIONEERS IN CLEAN WATER TECHNOLOGY
           ========================================================================== */}
      <section className="section section-bg" style={{ paddingTop: '2.5rem', paddingBottom: '2.5rem' }}>
        <div className="container">
          <div className="pioneers-wrapper">
            
            {/* Mobile Title (Shown 1st on mobile) */}
            <h2 className="pioneers-title pioneers-title-mobile animate-on-scroll">
              Pioneers in Clean Water Technology
            </h2>

            <div className="pioneers-grid">
              
              {/* Image (Desktop Left Column / Mobile 2nd) */}
              <div className="pioneers-image-column animate-on-scroll">
                <img src="/about_iso_seal.jpg" alt="ISO 9001:2015 Certified Company Seal" className="pioneers-img" />
              </div>

              {/* Text Column (Desktop Right Column / Mobile 3rd) */}
              <div className="pioneers-text-column animate-on-scroll">
                <h2 className="pioneers-title pioneers-title-desktop">
                  Pioneers in Clean Water Technology
                </h2>
                <p className="pioneers-desc">
                  Pure Drops RO was established with the vision of solving the water safety crises in Kozhikode and surrounding districts in Kerala. Recognising that municipal supply and groundwater have distinct chemical differences, we set out to build custom-engineered water purification products.
                </p>
                <p className="pioneers-desc">
                  Today, our ISO 9001:2015 certified assemblies filter harmful microbes, heavy minerals, and organic contamination in thousands of residential villas, apartment complexes, medical clinics, and commercial spaces.
                </p>
                <p className="pioneers-desc" style={{ marginBottom: 0 }}>
                  We believe in the science of purification. We don't just supply filters; we analyze your water chemistry and curate customized membranes and sand components to match your exact water quality footprint.
                </p>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR VISION & MISSION
           ========================================================================== */}
      <section className="section" style={{ paddingTop: '3rem', paddingBottom: '3rem' }}>
        <div className="container">
          <div className="vision-mission-grid animate-on-scroll">
            
            {/* Our Vision Card */}
            <div className="vm-card vm-card-vision">
              <div className="vm-header">
                <div className="vm-icon-circle">
                  <svg viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                    <circle cx="12" cy="12" r="3.5"></circle>
                    <path d="M12 5v-1.5M12 20.5v-1.5M4.93 4.93l-1.06-1.06M20.13 20.13l-1.06-1.06M19.07 4.93l1.06-1.06M3.87 20.13l1.06-1.06"></path>
                  </svg>
                </div>
                <div className="vm-title-wrap">
                  <h3 className="vm-title">OUR VISION</h3>
                  <div className="vm-underline"></div>
                </div>
              </div>
              <p className="vm-desc">
                To be a trusted leader in water treatment solutions, recognized for excellence, innovation and commitment to a sustainable tomorrow.
              </p>
              
              {/* Background Watermark SVG */}
              <svg className="vm-watermark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
            </div>

            {/* Our Mission Card */}
            <div className="vm-card vm-card-mission">
              <div className="vm-header">
                <div className="vm-icon-circle">
                  <svg viewBox="0 0 24 24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="12" cy="12" r="5"></circle>
                    <circle cx="12" cy="12" r="1.8" fill="#0096aa"></circle>
                    <path d="M22 2l-6.5 6.5M17.5 2H22v4.5"></path>
                  </svg>
                </div>
                <div className="vm-title-wrap">
                  <h3 className="vm-title">OUR MISSION</h3>
                  <div className="vm-underline"></div>
                </div>
              </div>
              <p className="vm-desc">
                To deliver reliable, cost-effective and environmentally responsible water treatment solutions that ensure clean water, regulatory compliance and long-term value for our clients.
              </p>

              {/* Background Watermark SVG */}
              <svg className="vm-watermark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="6"></circle>
                <circle cx="12" cy="12" r="2"></circle>
              </svg>
            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
           PURE DROPS RO BY NUMBERS
           ========================================================================== */}
      <section className="section stats-numbers-section animate-on-scroll">
        <div className="container">
          <div className="stats-numbers-header">
            <span className="stats-numbers-dash">&#9679;</span>
            <h2 className="stats-numbers-title">PURE DROPS RO BY NUMBERS</h2>
            <span className="stats-numbers-dash">&#9679;</span>
          </div>

          <div className="stats-numbers-grid">
            {/* Stat 1 */}
            <div className="stat-number-card">
              <div className="stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                </svg>
              </div>
              <div className="stat-number"><CounterNumber target={25} /></div>
              <div className="stat-label">Years of<br/>Experience</div>
            </div>

            {/* Stat 2 */}
            <div className="stat-number-card">
              <div className="stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>
                </svg>
              </div>
              <div className="stat-number"><CounterNumber target={2000} /></div>
              <div className="stat-label">Projects<br/>Completed</div>
            </div>

            {/* Stat 3 */}
            <div className="stat-number-card">
              <div className="stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
                </svg>
              </div>
              <div className="stat-number"><CounterNumber target={1750} /></div>
              <div className="stat-label">Happy<br/>Clients</div>
            </div>

            {/* Stat 4 */}
            <div className="stat-number-card">
              <div className="stat-icon-circle">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.77 3.77z"/>
                </svg>
              </div>
              <div className="stat-number"><CounterNumber target={750} /></div>
              <div className="stat-label">AMC/O&M<br/>Clients</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR CERTIFICATIONS
           ========================================================================== */}
      <section className="section certifications-section animate-on-scroll">
        <div className="container">
          <div className="stats-numbers-header" style={{ marginBottom: '2.5rem' }}>
            <span className="stats-numbers-dash" style={{ color: 'var(--primary-color)', fontSize: '0.5rem' }}>&#9679;</span>
            <h2 className="certifications-title">OUR CERTIFICATIONS</h2>
            <span className="stats-numbers-dash" style={{ color: 'var(--primary-color)', fontSize: '0.5rem' }}>&#9679;</span>
          </div>

          <div className="certifications-grid">
            {/* ISO 9001:2015 */}
            <div className="cert-card">
              <div className="cert-logo">
                <img src="/cert-iso.png" alt="ISO Certification Logo" className="cert-img" />
              </div>
              <div className="cert-number">9001:2015</div>
              <div className="cert-label">Quality Management</div>
            </div>

            {/* ISO 14001:2015 */}
            <div className="cert-card">
              <div className="cert-logo">
                <img src="/cert-iso.png" alt="ISO Certification Logo" className="cert-img" />
              </div>
              <div className="cert-number">14001:2015</div>
              <div className="cert-label">Environmental<br/>Management</div>
            </div>

            {/* MSME */}
            <div className="cert-card">
              <div className="cert-logo">
                <img src="/cert-msme.png" alt="MSME Registered Enterprise Logo" className="cert-img" />
              </div>
              <div className="cert-number" style={{ visibility: 'hidden' }}>&nbsp;</div>
              <div className="cert-label">Registered<br/>Enterprise</div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR CORE VALUES (GRID)
           ========================================================================== */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
        <div className="container">
          
          <div className="why-choose-section-box animate-on-scroll">
            
            {/* Top Banner Header */}
            <div className="why-choose-banner-header">
              <h3>&middot; OUR CORE VALUES &middot;</h3>
            </div>

            <div className="why-choose-grid">
              
              {/* 1. INTEGRITY */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <circle cx="12" cy="12" r="5"></circle>
                    <circle cx="12" cy="12" r="1.8" fill="#ffffff"></circle>
                    <path d="M22 2l-6.5 6.5M17.5 2H22v4.5"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>INTEGRITY</h4>
                  <p>We believe in honest communication and ethical business practices.</p>
                </div>
              </div>

              {/* 2. COMMITMENT */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-blue">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>COMMITMENT</h4>
                  <p>We are committed to delivering quality in every project we undertake.</p>
                </div>
              </div>

              {/* 3. INNOVATION */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M9 18h6M10 22h4M15 9A3 3 0 0 0 9 9c0 2 2 3 2 4h2c0-1 2-2 2-4z"></path>
                    <line x1="12" y1="2" x2="12" y2="4"></line>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                    <line x1="1" y1="12" x2="3" y2="12"></line>
                    <line x1="21" y1="12" x2="23" y2="12"></line>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>INNOVATION</h4>
                  <p>We continuously innovate to provide better, smarter and sustainable solutions.</p>
                </div>
              </div>

              {/* 4. TEAMWORK */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-blue">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C5.34 5 3 7.34 3 10s2.34 5 5 5 5-2.34 5-5zm8 3c-2.33 0-7 1.17-7 3.5V20h14v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>TEAMWORK</h4>
                  <p>We work together to achieve excellence and build lasting relationships.</p>
                </div>
              </div>

              {/* 5. RESPONSIBILITY */}
              <div className="why-choose-card why-choose-full-width">
                <div className="wc-icon-circle wc-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M9 12l2 2 4-4"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>RESPONSIBILITY</h4>
                  <p>We take responsibility towards our customers, society and environment.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
           TIMELINE / HISTORY SECTION
           ========================================================================== */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2>Our Journey & Timeline</h2>
            <p>Tracing the evolution of Pure Drops RO from a local dealer into a prominent purification organization in Kerala.</p>
          </div>

          <div className="timeline-container animate-on-scroll">
            {/* Timeline 2001 */}
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-badge">2001</div>
              <div className="timeline-panel">
                <div className="timeline-date">Company Foundation</div>
                <h3>Domestic Filter Pioneer</h3>
                <p>Pure Drops RO opens as a domestic filter supplier in Kozhikode, Kerala, aiming to improve local tap water standards.</p>
              </div>
            </div>

            {/* Timeline 2008 */}
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-badge">2008</div>
              <div className="timeline-panel">
                <div className="timeline-date">Expansion & Softener Integration</div>
                <h3>Regional Network & Softeners</h3>
                <p>Expanded our technical service network across Kozhikode district and commenced custom domestic water softener installations.</p>
              </div>
            </div>

            {/* Timeline 2015 */}
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-badge">2015</div>
              <div className="timeline-panel">
                <div className="timeline-date">Commercial Focus & ISO Certification</div>
                <h3>ISO 9001:2015 & Commercial RO Plants</h3>
                <p>Achieved ISO quality certifications and launched high-volume commercial RO plants, sand filters, and iron removal systems for institutions and apartments.</p>
              </div>
            </div>

            {/* Timeline 2020 */}
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-badge">2020</div>
              <div className="timeline-panel">
                <div className="timeline-date">Lab Setup</div>
                <h3>Water Analysis Laboratory</h3>
                <p>Opened a dedicated water chemistry testing laboratory counter in Kozhikode for scientific membrane tuning based on local water quality footprints.</p>
              </div>
            </div>

            {/* Timeline 2026 */}
            <div className="timeline-item animate-on-scroll">
              <div className="timeline-badge">2026</div>
              <div className="timeline-panel">
                <div className="timeline-date">Present Day</div>
                <h3>25+ Years of Excellence & 10,000+ Clients</h3>
                <p>Celebrating over two decades as a leading water treatment provider in Kerala, servicing clients like Iqraa Hospital, Milma, NIT Calicut, and Sadhbhavana World School.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           CALL TO ACTION
           ========================================================================== */}
      <section className="cta-banner">
        <div className="container animate-on-scroll">
          <h2>Experience the Pure Drops RO Difference</h2>
          <p>Get in touch with our team in Kozhikode to discuss your household scaling issues or business filtration requirements.</p>
          <button className="btn btn-primary" onClick={() => openModal('About Us Consultation')} style={{ background: 'var(--bg-white)', color: 'var(--primary-color)', boxShadow: 'none' }}>
            Request Free Assessment
          </button>
        </div>
      </section>
    </>
  );
}
