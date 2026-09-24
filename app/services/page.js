'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuote } from '../../context/QuoteContext';

export default function Services() {
  const { openModal } = useQuote();
  const [activeFaq, setActiveFaq] = useState(null);

  // Stateful Lab Booking Form
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    source: 'Open Well',
    location: 'On-site Technician Visit (Kozhikode district only)',
    issues: ''
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

  const handleFaqToggle = (index) => {
    setActiveFaq(activeFaq === index ? null : index);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = formData.name || 'Not specified';
    const phone = formData.phone || 'Not specified';
    const source = formData.source || 'Open Well';
    const location = formData.location || 'On-site Technician Visit (Kozhikode district only)';
    const issues = formData.issues || 'None mentioned';

    const text = `Hi Pure Drops RO, I want to Schedule a Water Quality Analysis Test.

📌 *Booking Details:*
• *Name:* ${name}
• *Phone:* ${phone}
• *Water Source:* ${source}
• *Testing Location:* ${location}
• *Issues Observed:* ${issues}`;

    const whatsappUrl = `https://wa.me/919745137799?text=${encodeURIComponent(text)}`;

    setIsSubmitting(false);
    setSubmitSuccess(true);
    if (typeof window !== 'undefined') {
      window.location.href = whatsappUrl;
    }

    setFormData({
      name: '',
      phone: '',
      source: 'Open Well',
      location: 'On-site Technician Visit (Kozhikode district only)',
      issues: ''
    });

    setTimeout(() => {
      setSubmitSuccess(false);
    }, 6000);
  };

  const faqsList = [
    {
      q: "How often should I test my water supply?",
      a: "For private well or borewells in Kozhikode, we recommend a laboratory analysis at least once a year. If you observe reddish iron deposits, salty taste, or scaling on your bathroom fittings, schedule a test immediately to protect your pipe network and health."
    },
    {
      q: "What is TDS and what level is safe for drinking?",
      a: "TDS stands for Total Dissolved Solids. It represents the total mineral concentration in water. According to WHO and BIS parameters, a TDS level below 300 mg/litre (PPM) is considered excellent. If your source water has TDS exceeding 500 PPM, deploying a Reverse Osmosis (RO) purifier is highly recommended."
    },
    {
      q: "How frequently do filter cartridges need replacement?",
      a: "The external spun pre-filter cartridge should be replaced every 3 to 6 months depending on water turbidity. Internal carbon and sediment cartridges typically last 9 to 12 months, while primary RO membranes should be checked and replaced every 1.5 to 2 years under regular domestic usage."
    },
    {
      q: "Do you offer Annual Maintenance Contracts (AMC)?",
      a: "Yes. Pure Drops RO offers structured, affordable domestic and commercial AMC packages. Our plans cover quarterly cleaning visits, filter swaps, pump audits, and priority free assistance for call-outs, saving you from heavy emergency repair bills."
    },
    {
      q: "What is the difference between RO and UV purification?",
      a: "Reverse Osmosis (RO) uses a semi-permeable membrane to physical block dissolved chemicals, heavy metals, and salts, reducing TDS. Ultra-Violet (UV) uses high-intensity light to neutralize bacteria and viruses without changing water chemistry or TDS. Low TDS water only needs UV/UF, while high TDS water requires RO."
    }
  ];

  return (
    <>
      {/* ==========================================================================
           PAGE BANNER
           ========================================================================== */}
      <section className="page-banner" aria-label="Services page introduction">
        <div className="container">
          <h1>Our Services</h1>
          <p>Expert installations, periodic maintenance support, and extensive water diagnostic reports.</p>
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
           STP / ETP / WTP / WATER PURIFIER PLANT SHOWCASE (TOP)
           ========================================================================== */}
      <section className="section plant-showcase-section" aria-label="Water Treatment Plants Showcase">
        <div className="container">
          <div className="section-header animate-on-scroll text-center">
            <h2>Industrial &amp; Commercial Plant Solutions</h2>
            <p style={{ maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>Heavy-duty treatment facilities engineered for optimal recycling, purification, and environmental compliance.</p>
          </div>

          <div className="plants-grid">
            {/* 1st: Water Purifier */}
            <Link href="/services/purifier" className="plant-card-link animate-on-scroll">
              <div className="plant-card">
                <div className="plant-tag tag-purifier">WATER PURIFIER</div>
                <div className="plant-img-wrapper">
                  <img src="/product_puroaqua_black.jpg" alt="Pure Drops RO Water Purifier" />
                </div>
                <div className="plant-info">
                  <p>Advanced domestic RO + UF + Alkaline water purifiers that deliver 100% pure, healthy drinking water.</p>
                  <div className="plant-card-action">
                    <span>View Specs &amp; Details</span> &rarr;
                  </div>
                </div>
              </div>
            </Link>

            {/* 2nd: WTP Plant */}
            <Link href="/services/wtp" className="plant-card-link animate-on-scroll">
              <div className="plant-card">
                <div className="plant-tag tag-wtp">WTP PLANT</div>
                <div className="plant-img-wrapper">
                  <img src="/wtp_plant.png" alt="Water Treatment Plant (WTP)" />
                </div>
                <div className="plant-info">
                  <p>Water Treatment Plants (Media Filtration &amp; Softeners) that deliver safe, clean &amp; potable water.</p>
                  <div className="plant-card-action">
                    <span>View Specs &amp; Details</span> &rarr;
                  </div>
                </div>
              </div>
            </Link>

            {/* 3rd: Water Treatment RO Plant */}
            <Link href="/services/ro" className="plant-card-link animate-on-scroll">
              <div className="plant-card">
                <div className="plant-tag tag-ro">COMMERCIAL RO PLANT</div>
                <div className="plant-img-wrapper">
                  <img src="/product_industrial_ro_plant_1000lph.png" alt="Commercial Water Treatment RO Plant" />
                </div>
                <div className="plant-info">
                  <p>High-capacity commercial &amp; industrial Reverse Osmosis Skid plants engineered for heavy-duty purification.</p>
                  <div className="plant-card-action">
                    <span>View Specs &amp; Details</span> &rarr;
                  </div>
                </div>
              </div>
            </Link>

            {/* 4th: Water Cooler */}
            <Link href="/services/cooler" className="plant-card-link animate-on-scroll">
              <div className="plant-card">
                <div className="plant-tag tag-cooler">WATER COOLER</div>
                <div className="plant-img-wrapper">
                  <img src="/product_evermac_neo_80.jpg" alt="SS 304 Commercial Water Cooler" />
                </div>
                <div className="plant-info">
                  <p>Heavy-duty SS 304 food-grade commercial water coolers with Tecumseh compressors for instant chilled drinking water.</p>
                  <div className="plant-card-action">
                    <span>View Specs &amp; Details</span> &rarr;
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR CORE SERVICES GRID (8 CARDS)
           ========================================================================== */}
      <section className="section" style={{ paddingTop: '1.5rem', paddingBottom: '1rem' }}>
        <div className="container">
          
          <div className="core-services-section-box animate-on-scroll">
            
            {/* Top Banner Header */}
            <div className="core-services-banner-header">
              <h3>&middot; OUR CORE SERVICES &middot;</h3>
            </div>

            <div className="core-services-grid">
              
              {/* 1. DESIGN & ENGINEERING */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-navy">
                  <svg viewBox="0 0 24 24">
                    <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
                    <line x1="8" y1="21" x2="16" y2="21"></line>
                    <line x1="12" y1="17" x2="12" y2="21"></line>
                    <path d="M7 8h5"></path>
                    <path d="M7 11h3"></path>
                    <circle cx="16" cy="10" r="2.5"></circle>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-navy">DESIGN &amp; ENGINEERING</h4>
                <p className="cs-card-desc">Customized, cost-effective and efficient designs using latest technology and industry standards.</p>
              </div>

              {/* 2. SUPPLY OF PLANTS */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <rect x="4" y="6" width="6" height="14" rx="3"></rect>
                    <rect x="14" y="6" width="6" height="14" rx="3"></rect>
                    <path d="M7 2v4"></path>
                    <path d="M17 2v4"></path>
                    <path d="M10 11h4"></path>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-teal">SUPPLY OF PLANTS</h4>
                <p className="cs-card-desc">High quality, durable and performance-tested equipment from trusted manufacturers and partners.</p>
              </div>

              {/* 3. INSTALLATION & COMMISSIONING */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-navy">
                  <svg viewBox="0 0 24 24">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-navy">INSTALLATION &amp; COMMISSIONING</h4>
                <p className="cs-card-desc">Professional installation with precise testing and commissioning for smooth start-up.</p>
              </div>

              {/* 4. OPERATIONS & MAINTENANCE (O&M) */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                    <path d="M12 2v2"></path>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-teal">OPERATIONS &amp; MAINTENANCE (O&amp;M)</h4>
                <p className="cs-card-desc">Skilled operation and maintenance support to ensure optimum performance and system reliability.</p>
              </div>

              {/* 5. ANNUAL MAINTENANCE CONTRACTS (AMC) */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path>
                    <rect x="8" y="2" width="8" height="4" rx="1" ry="1"></rect>
                    <polyline points="9 14 11 16 15 11"></polyline>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-teal">ANNUAL MAINTENANCE CONTRACTS (AMC)</h4>
                <p className="cs-card-desc">Comprehensive AMC plans to keep your systems running efficiently all year round.</p>
              </div>

              {/* 6. UPGRADES & RETROFITS */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-navy">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="3"></circle>
                    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-navy">UPGRADES &amp; RETROFITS</h4>
                <p className="cs-card-desc">System upgrades, retrofits and performance enhancement solutions for existing installations.</p>
              </div>

              {/* 7. WATER TESTING & ANALYSIS */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M10 2v7.5L4.5 18A2 2 0 0 0 6.2 21h11.6a2 2 0 0 0 1.7-3L14 9.5V2"></path>
                    <path d="M8.5 2h7"></path>
                    <path d="M7 16h10"></path>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-teal">WATER TESTING &amp; ANALYSIS</h4>
                <p className="cs-card-desc">Accurate testing and analysis to ensure water quality, compliance and process optimization.</p>
              </div>

              {/* 8. CONSULTATION & TECHNICAL SUPPORT */}
              <div className="core-service-card">
                <div className="cs-icon-circle cs-circle-navy">
                  <svg viewBox="0 0 24 24">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <path d="M8 11l3 3 5-5"></path>
                  </svg>
                </div>
                <h4 className="cs-card-title cs-title-navy">CONSULTATION &amp; TECHNICAL SUPPORT</h4>
                <p className="cs-card-desc">Expert guidance and 24/7 support to address your challenges and deliver the right solutions.</p>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
           WHY CHOOSE AQUASOLVE (GRID)
           ========================================================================== */}
      <section className="section" style={{ paddingTop: '1rem', paddingBottom: '2rem' }}>
        <div className="container">
          
          <div className="why-choose-section-box animate-on-scroll">
            
            {/* Top Banner Header */}
            <div className="why-choose-banner-header">
              <h3>&middot; WHY CHOOSE PURE DROPS RO? &middot;</h3>
            </div>

            <div className="why-choose-grid">
              
              {/* 1. EXPERIENCED TEAM */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>EXPERIENCED TEAM</h4>
                  <p>Skilled professionals with deep domain knowledge and hands-on experience.</p>
                </div>
              </div>

              {/* 2. CUSTOMIZED SOLUTIONS */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-blue">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="9"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>CUSTOMIZED SOLUTIONS</h4>
                  <p>Tailor-made systems to meet your specific requirements and site conditions.</p>
                </div>
              </div>

              {/* 3. QUALITY ASSURANCE */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="8" r="6"></circle>
                    <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"></path>
                    <path d="M9 8l2 2 4-4"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>QUALITY ASSURANCE</h4>
                  <p>High-quality components and strict testing at every stage of execution.</p>
                </div>
              </div>

              {/* 4. ON-TIME DELIVERY */}
              <div className="why-choose-card">
                <div className="wc-icon-circle wc-circle-blue">
                  <svg viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12 6 12 12 16 14"></polyline>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>ON-TIME DELIVERY</h4>
                  <p>Strong project management ensuring timely delivery and smooth execution.</p>
                </div>
              </div>

              {/* 5. AFTER-SALES SUPPORT */}
              <div className="why-choose-card why-choose-full-width">
                <div className="wc-icon-circle wc-circle-teal">
                  <svg viewBox="0 0 24 24">
                    <path d="M3 18v-6a9 9 0 0 1 18 0v6"></path>
                    <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path>
                  </svg>
                </div>
                <div className="wc-content">
                  <h4>AFTER-SALES SUPPORT</h4>
                  <p>Dedicated support team for operation, maintenance and long-term reliability.</p>
                </div>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* ==========================================================================
           LAB WATER QUALITY BOOKING FORM
           ========================================================================== */}
      <section className="section section-bg">
        <div className="container">
          <div className="grid-2">
            
            <div className="animate-on-scroll">
              <h2 style={{ fontSize: '2.2rem', marginBottom: '1.5rem' }}>Schedule On-Site Water Quality Test</h2>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '1rem' }}>
                Understanding your water is the first step towards health. Pure Drops RO provides comprehensive water quality testing and analysis across Kozhikode.
              </p>
              <p style={{ color: 'var(--text-light)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
                Simply schedule an on-site technician visit. Our experienced technicians test for TDS parameters, acidity, calcium carbonate hardness, and iron sediment presence directly at your location.
              </p>
              <div style={{ display: 'flex', gap: '1.5rem', marginTop: '2rem' }}>
                <div className="info-item" style={{ color: 'var(--primary-color)' }}>
                  <div className="info-icon" style={{ background: 'var(--bg-cyan-light)' }}><svg viewBox="0 0 24 24" style={{ fill: 'var(--primary-color)' }}><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg></div>
                  <div className="info-text">
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700 }}>Registered Office Address</h4>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>10/505, Chethukadavu, Mukkam Road, Kunnamangalam, Kozhikode, Kerala - 673571</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="animate-on-scroll">
              <div className="booking-form-box">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1.5rem', color: 'var(--primary-color)' }}>Schedule Testing</h3>
                <form id="labTestingForm" onSubmit={handleSubmit}>
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
                      Testing visit scheduled successfully!
                    </div>
                  ) : (
                    <>
                      <div className="form-group">
                        <label htmlFor="name">Your Name</label>
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
                            placeholder="Phone number"
                            value={formData.phone}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          />
                        </div>
                        <div className="form-group">
                          <label htmlFor="source">Water Source</label>
                          <select 
                            id="source" 
                            className="form-control"
                            value={formData.source}
                            onChange={handleChange}
                            disabled={isSubmitting}
                          >
                            <option>Open Well</option>
                            <option>Borewell groundwater</option>
                            <option>Corporation water supply</option>
                            <option>Rainwater tank</option>
                          </select>
                        </div>
                      </div>
                      <div className="form-group">
                        <label htmlFor="location">Testing Location preference</label>
                        <select 
                          id="location" 
                          className="form-control"
                          value={formData.location}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        >
                          <option>On-site Technician Visit (Kozhikode district only)</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="issues">Water Issues Observed (Optional)</label>
                        <textarea 
                          id="issues" 
                          className="form-control" 
                          placeholder="E.g., Reddish color, salty taste, scaling on bathroom taps..."
                          value={formData.issues}
                          onChange={handleChange}
                          disabled={isSubmitting}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                        {isSubmitting ? 'Scheduling...' : 'Schedule Analysis'}
                      </button>
                    </>
                  )}
                </form>
              </div>
            </div>

          </div>
        </div>
      </section>



      {/* ==========================================================================
           FAQ ACCORDION
           ========================================================================== */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2>Frequently Asked Questions</h2>
            <p>Read quick answers regarding water quality parameters, filter maintenance, and operations.</p>
          </div>

          <div className="faq-container animate-on-scroll">
            {faqsList.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div key={index} className={`faq-item ${isOpen ? 'active' : ''}`}>
                  <div className="faq-header" onClick={() => handleFaqToggle(index)}>
                    <h3>{faq.q}</h3>
                    <svg className="faq-toggle-icon" viewBox="0 0 24 24"><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg>
                  </div>
                  <div className="faq-body" style={{ height: isOpen ? 'auto' : '0px', overflow: 'hidden' }}>
                    <p>{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
