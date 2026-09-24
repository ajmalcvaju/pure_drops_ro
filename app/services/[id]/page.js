'use client';

import React, { useEffect, use } from 'react';
import Link from 'next/link';
import { servicesData } from '../servicesData';
import { useQuote } from '../../../context/QuoteContext';

export default function ServiceDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id || 'purifier';
  const currentSol = servicesData[id] || servicesData.purifier;
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
  }, [id]);

  return (
    <>
      {/* ==========================================================================
           PAGE BANNER & BREADCRUMB
           ========================================================================== */}
      <section className="page-banner" aria-label="Service Detail Page Header">
        <div className="container">
          <div style={{ marginBottom: '1rem', fontSize: '0.9rem', color: 'rgba(255,255,255,0.75)' }}>
            <Link href="/" style={{ color: '#fff', textDecoration: 'none' }}>Home</Link> &nbsp;&gt;&nbsp; 
            <Link href="/services" style={{ color: '#fff', textDecoration: 'none', marginLeft: '0.4rem' }}>Services</Link> &nbsp;&gt;&nbsp; 
            <span style={{ color: '#7dd3fc', marginLeft: '0.4rem', fontWeight: 700 }}>{currentSol.tag}</span>
          </div>
          <h1>{currentSol.title}</h1>
          <p>{currentSol.subtitle}</p>
        </div>
        
        {/* Banner Wave SVG */}
        <svg className="banner-wave" viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 32L60 48C120 64 240 96 360 101.3C480 107 600 85 720 69.3C840 53 960 43 1080 42.7C1200 43 1320 53 1380 58.7L1440 64V120H1380C1320 120 1200 120 1080 120C960 120 480 120 360 120C240 120 120 120 60 120H0V32Z" fill="#FFF"/>
        </svg>

        <div className="banner-decorations">
          <div className="bubble bubble-1"></div>
          <div className="bubble bubble-2"></div>
          <div className="bubble bubble-3"></div>
        </div>
      </section>

      {/* ==========================================================================
           MAIN SERVICE SOLUTION DETAILS CONTENT
           ========================================================================== */}
      <section className="section solution-details-section" style={{ paddingTop: '3rem' }}>
        <div className="container">

          {/* Quick Navigation Tabs for Other Services */}
          <div className="solution-tabs animate-on-scroll" style={{ marginTop: 0, marginBottom: '3rem' }}>
            <Link href="/services/purifier" className={`solution-tab ${id === 'purifier' ? 'active' : ''}`}>
              <span className="tab-dot dot-purifier">●</span> Water Purifier
            </Link>
            <Link href="/services/wtp" className={`solution-tab ${id === 'wtp' ? 'active' : ''}`}>
              <span className="tab-dot dot-wtp">●</span> WTP Plant
            </Link>
            <Link href="/services/stp" className={`solution-tab ${id === 'stp' ? 'active' : ''}`}>
              <span className="tab-dot dot-stp">●</span> STP Plant
            </Link>
            <Link href="/services/etp" className={`solution-tab ${id === 'etp' ? 'active' : ''}`}>
              <span className="tab-dot dot-etp">●</span> ETP Plant
            </Link>
          </div>

          {/* Main Solution Detail Card */}
          <div className="solution-detail-container animate-on-scroll">
            <div className="solution-detail-header">
              <div className="solution-header-info">
                <span className={`solution-badge ${currentSol.tagClass}`}>{currentSol.tag}</span>
                <h3>{currentSol.title}</h3>
                <p className="solution-subtitle">{currentSol.subtitle}</p>
              </div>
              <button className="btn btn-primary" onClick={() => openModal(currentSol.title)}>
                Get Free Consultation &amp; Quote
              </button>
            </div>

            <div className="solution-detail-body">
              <div className="solution-media-col">
                <div className="solution-img-box">
                  <img src={currentSol.imageSrc} alt={currentSol.title} />
                </div>
                <div className="solution-badge-pill">
                  <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                  {currentSol.badge}
                </div>
              </div>

              <div className="solution-content-col">
                <h4>System Overview</h4>
                <p className="solution-desc">{currentSol.description}</p>

                {/* Highlights List */}
                {currentSol.highlights && (
                  <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f4c81', margin: '0 0 0.8rem', textTransform: 'uppercase' }}>Key System Features</h5>
                    <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: '1.7' }}>
                      {currentSol.highlights.map((h, i) => (
                        <li key={i} style={{ marginBottom: '0.3rem' }}>{h}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <h4 style={{ marginTop: '2rem' }}>Key Technical Specifications</h4>
                <div className="specs-grid">
                  {currentSol.specs.map((item, idx) => (
                    <div key={idx} className="spec-box">
                      <span className="spec-label">{item.label}</span>
                      <span className="spec-val">{item.val}</span>
                    </div>
                  ))}
                </div>

                <h4 style={{ marginTop: '2rem' }}>Treatment Process Sequence</h4>
                <div className="process-pipeline">
                  {currentSol.process.map((step, idx) => (
                    <div key={idx} className="pipeline-step">
                      <span className="step-num">{idx + 1}</span>
                      <span className="step-text">{step}</span>
                      {idx < currentSol.process.length - 1 && <span className="step-arrow">&rarr;</span>}
                    </div>
                  ))}
                </div>

                <h4 style={{ marginTop: '2rem' }}>Ideal Applications</h4>
                <div className="apps-tags">
                  {currentSol.applications.map((app, idx) => (
                    <span key={idx} className="app-tag">
                      <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {app}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="solution-detail-footer">
              <p>Need customized capacity calculations or on-site engineering survey for your facility?</p>
              <div className="solution-footer-btns">
                <button className="btn btn-primary" onClick={() => openModal(currentSol.title)}>
                  Request Technical Proposal
                </button>
                <Link href="/services" className="btn btn-secondary">
                  &larr; Back to All Services
                </Link>
              </div>
            </div>
          </div>

        </div>
      </section>
    </>
  );
}
