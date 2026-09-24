'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useQuote } from '../../context/QuoteContext';
import { productsData } from './productsData';

export default function Products() {
  const { openModal } = useQuote();
  const [activeFilter, setActiveFilter] = useState('all');

  const productsList = Object.values(productsData).map(p => ({
    id: p.id,
    title: p.title,
    category: p.category,
    tag: p.tag,
    price: p.price,
    desc: p.desc,
    specs: p.specs.map(s => typeof s === 'string' ? s : `${s.label}: ${s.val}`),
    imageSrc: p.imageSrc
  }));

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const cat = params.get('category');
      if (cat && ['domestic', 'filters', 'plants', 'cooler', 'all'].includes(cat)) {
        setActiveFilter(cat);
      }
    }
  }, []);

  const handleFilterChange = (catKey) => {
    setActiveFilter(catKey);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (catKey === 'all') {
        url.searchParams.delete('category');
      } else {
        url.searchParams.set('category', catKey);
      }
      window.history.pushState({}, '', url.toString());
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0, rootMargin: '0px 0px 200px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [activeFilter]);

  const filteredProducts = activeFilter === 'all' 
    ? productsList 
    : productsList.filter(p => p.category === activeFilter);

  const countAll = productsList.length;
  const countPurifiers = productsList.filter(p => p.category === 'domestic').length;
  const countFilterPlants = productsList.filter(p => p.category === 'filters').length;
  const countROPlants = productsList.filter(p => p.category === 'plants').length;
  const countCoolers = productsList.filter(p => p.category === 'cooler').length;

  return (
    <>
      {/* ==========================================================================
           PAGE BANNER
           ========================================================================== */}
      <section className="page-banner" aria-label="Product catalog page introduction">
        <div className="container">
          <h1>Product Catalog &amp; Systems</h1>
          <p>Explore our complete range of certified water purifiers, whole-house treatment plants, commercial RO systems, and stainless steel water coolers.</p>
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
           PRODUCTS SHOWCASE & FILTERS
           ========================================================================== */}
      <section className="section">
        <div className="container">
          
          {/* Filter Tabs */}
          <div className="product-filters">
            <button className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`} onClick={() => handleFilterChange('all')}>
              All Products ({countAll})
            </button>
            <button className={`filter-btn ${activeFilter === 'domestic' ? 'active' : ''}`} onClick={() => handleFilterChange('domestic')}>
              Water Purifiers ({countPurifiers})
            </button>
            <button className={`filter-btn ${activeFilter === 'filters' ? 'active' : ''}`} onClick={() => handleFilterChange('filters')}>
              Water Treatment Plant ({countFilterPlants})
            </button>
            <button className={`filter-btn ${activeFilter === 'plants' ? 'active' : ''}`} onClick={() => handleFilterChange('plants')}>
              Water Treatment RO Plant ({countROPlants})
            </button>
            <button className={`filter-btn ${activeFilter === 'cooler' ? 'active' : ''}`} onClick={() => handleFilterChange('cooler')}>
              Water Cooler ({countCoolers})
            </button>
          </div>

          {/* Products Catalog Grid */}
          <div className="products-grid" style={{ minHeight: '400px' }}>
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`} className="product-card-link">
                <div className="product-card" data-category={product.category}>
                  <div className="product-image-area">
                    <span className="product-tag">{product.tag}</span>
                    {product.imageSrc ? (
                      <img src={product.imageSrc} alt={product.title} className="product-image" />
                    ) : (
                      <div className="empty-product-image-box">
                        <svg className="empty-placeholder-icon" viewBox="0 0 24 24">
                          <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                          <path d="M19 11h2m-2 4h2m-2-8h2M3 11h2m-2 4h2m-2-8h2" strokeWidth="1.5" stroke="currentColor"/>
                        </svg>
                        <span className="empty-placeholder-text">Pure Drops RO</span>
                      </div>
                    )}
                  </div>
                  <div className="product-info">
                    <h3>{product.title}</h3>
                    <p style={{ fontSize: '0.85rem', color: 'var(--text-light)', marginBottom: '0.8rem' }}>{product.desc}</p>
                    <ul className="product-specs">
                      {product.specs.slice(0, 3).map((spec, idx) => (
                        <li key={idx}>
                          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          {spec}
                        </li>
                      ))}
                    </ul>
                    <div className="product-footer">
                      {(() => {
                        const priceStr = String(product.price || "Get Quote").trim();
                        if (priceStr.toLowerCase().startsWith('starting from')) {
                          const amount = priceStr.replace(/starting from/i, '').trim();
                          return (
                            <div className="product-price-block">
                              <span className="product-price-label">Starting from</span>
                              <span className="product-price-val">{amount}</span>
                            </div>
                          );
                        }
                        return (
                          <div className="product-price-block">
                            <span className="product-price-val">{priceStr}</span>
                          </div>
                        );
                      })()}
                      <button 
                        className="btn btn-primary btn-card" 
                        onClick={(e) => { 
                          e.preventDefault(); 
                          e.stopPropagation(); 
                          openModal(product.title); 
                        }}
                      >
                        Enquire Now
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================================
           PRODUCT COMPARISON SYSTEM
           ========================================================================== */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2>Product Selection Matrix</h2>
            <p>Compare water filter attributes to identify which configuration fits your source parameters.</p>
          </div>

          <div className="table-responsive animate-on-scroll">
            <table className="comparison-table">
              <thead>
                <tr>
                  <th>Product Model</th>
                  <th>Category</th>
                  <th>Ideal Source Water</th>
                  <th>Max TDS Handle</th>
                  <th>Electricity Needs</th>
                  <th>Reject Water Ratio</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td><strong>Puroaqua Dual Mode (Black / White)</strong></td>
                  <td>Domestic RO / UF</td>
                  <td>Flexible (Borewell & Municipal)</td>
                  <td>1200 PPM (RO Mode)</td>
                  <td>Yes (RO Mode) / Direct (SN Mode)</td>
                  <td>RO Mode Only (Approx. 55%)</td>
                </tr>
                <tr>
                  <td><strong>Pure Drops Sediment Filter</strong></td>
                  <td>Sediment Filter</td>
                  <td>Turbid / muddy well water</td>
                  <td>Suspended Solids Only</td>
                  <td>No</td>
                  <td>Backwash wash only</td>
                </tr>
                <tr>
                  <td><strong>Pure Drops Iron Remover Filter</strong></td>
                  <td>Iron Filter</td>
                  <td>Reddish well water (metallic taste)</td>
                  <td>Iron up to 5 PPM</td>
                  <td>No</td>
                  <td>Backwash wash only</td>
                </tr>
                <tr>
                  <td><strong>Pure Drops Carbon Filter</strong></td>
                  <td>Carbon Filter</td>
                  <td>Chlorinated / smelly supply water</td>
                  <td>Chemicals & Odor Only</td>
                  <td>No</td>
                  <td>Backwash wash only</td>
                </tr>
                <tr>
                  <td><strong>Pure Drops Commercial RO Treatment Plant</strong></td>
                  <td>Commercial</td>
                  <td>Heavy industrial / community supply</td>
                  <td>2000 PPM</td>
                  <td>Yes (3-Phase option)</td>
                  <td>Yes (Approx. 50%)</td>
                </tr>
                <tr>
                  <td><strong>Pure Drops Sewage Treatment Plant (STP)</strong></td>
                  <td>Commercial STP</td>
                  <td>Domestic sewage / blackwater reuse</td>
                  <td>Organic Load / Pathogens</td>
                  <td>Yes (Blower & Pumps)</td>
                  <td>MBR Sludge discharge</td>
                </tr>
                <tr>
                  <td><strong>Pure Drops Effluent Treatment Plant (ETP)</strong></td>
                  <td>Commercial ETP</td>
                  <td>Industrial chemical wastewater</td>
                  <td>Chemical Load (ZLD)</td>
                  <td>Yes (Aerators & Dosing)</td>
                  <td>Sludge filter press</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           CALL TO ACTION
           ========================================================================== */}
      <section className="cta-banner">
        <div className="container animate-on-scroll">
          <h2>Unsure of your water parameters?</h2>
          <p>Book a free visit by our technicians in Calicut. We bring handheld testing equipment to check your TDS and pH on the spot.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn btn-primary" onClick={() => openModal('TDS Water Quality Check')} style={{ background: 'var(--bg-white)', color: 'var(--primary-color)', boxShadow: 'none' }}>
              Request On-Site TDS Check
            </button>
            <Link href="/contact" className="btn btn-secondary" style={{ borderColor: 'var(--bg-white)', color: 'var(--bg-white)' }}>
              Contact Support
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
