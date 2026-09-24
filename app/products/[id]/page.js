'use client';

import React, { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { productsData } from '../productsData';
import { useQuote } from '../../../context/QuoteContext';

export default function ProductDetailPage({ params }) {
  const resolvedParams = use(params);
  const id = resolvedParams?.id || '6';
  
  // Lookup by ID or Slug
  const currentProduct = productsData[id] || 
    Object.values(productsData).find(p => p.slug === id) || 
    productsData['6'];

  const [selectedVariant, setSelectedVariant] = useState(
    currentProduct?.variants && currentProduct.variants.length > 0 ? currentProduct.variants[0] : null
  );

  useEffect(() => {
    if (currentProduct?.variants && currentProduct.variants.length > 0) {
      setSelectedVariant(currentProduct.variants[0]);
    } else {
      setSelectedVariant(null);
    }
  }, [id, currentProduct]);

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

  const activeTitle = selectedVariant ? `${currentProduct.title} (${selectedVariant.name})` : currentProduct.title;
  const whatsappMsg = encodeURIComponent(`Hi Pure Drops RO, I am interested in ${activeTitle}. Please provide more details and best price quote.`);
  const activeImageSrc = selectedVariant?.imageSrc || currentProduct.imageSrc;

  return (
    <>
      {/* ==========================================================================
           MAIN PRODUCT DETAILS CONTENT
           ========================================================================== */}
      <section className="section product-details-section" style={{ paddingTop: '2rem' }}>
        <div className="product-page-fullwidth">
          
          {/* Breadcrumb Navigation */}
          <div style={{ marginBottom: '1.5rem', fontSize: '0.9rem', color: '#64748b' }}>
            <Link href="/" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>Home</Link>
            <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>/</span>
            <Link href="/products" style={{ color: '#0284c7', textDecoration: 'none', fontWeight: 600 }}>Products</Link>
            <span style={{ margin: '0 0.5rem', color: '#94a3b8' }}>/</span>
            <span style={{ color: '#0f172a', fontWeight: 700 }}>{currentProduct.title}</span>
          </div>

          <div className="solution-detail-container animate-on-scroll">
            
            {/* Header Area */}
            <div className="solution-detail-header">
              <div className="solution-header-info">
                <span className="solution-badge tag-purifier">{currentProduct.tag}</span>
                <h3>{currentProduct.title}</h3>
                {currentProduct.price && (
                  <div className="solution-header-price">
                    {currentProduct.price.toLowerCase().startsWith('starting from') ? (
                      <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: '#94a3b8', fontWeight: 700 }}>Starting from</span>
                        <span className="solution-price-val">{currentProduct.price.replace(/starting from/i, '').trim()}</span>
                      </div>
                    ) : (
                      <span className="solution-price-val">{currentProduct.price}</span>
                    )}
                    <span className="solution-price-sub">(Inclusive of all taxes &amp; standard warranty)</span>
                  </div>
                )}
              </div>

              <div className="solution-header-btns">
                <button className="btn btn-primary" onClick={() => openModal(activeTitle)}>
                  Enquire &amp; Get Quote
                </button>
                <a 
                  href={`https://wa.me/919745137799?text=${whatsappMsg}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp"
                >
                  <svg viewBox="0 0 448 512" style={{ width: '18px', height: '18px', fill: '#fff' }}>
                    <path d="M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"></path>
                  </svg>
                  WhatsApp Us
                </a>
              </div>
            </div>

            {/* Body Grid */}
            <div className="solution-detail-body">
              
              {/* Media Column */}
              <div className="solution-media-col">
                <div className="solution-img-box" style={{ background: '#fff', border: '1px solid #e2e8f0', padding: '1.5rem', borderRadius: '16px' }}>
                  {activeImageSrc ? (
                    <img 
                      src={activeImageSrc} 
                      alt={activeTitle} 
                      style={{ maxHeight: '340px', objectFit: 'contain', transition: 'all 0.3s ease' }} 
                    />
                  ) : (
                    <div className="empty-product-image-box" style={{ minHeight: '260px' }}>
                      <svg className="empty-placeholder-icon" viewBox="0 0 24 24" style={{ width: '64px', height: '64px' }}>
                        <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" strokeWidth="1.5" stroke="currentColor" fill="none"/>
                        <path d="M19 11h2m-2 4h2m-2-8h2M3 11h2m-2 4h2m-2-8h2" strokeWidth="1.5" stroke="currentColor"/>
                      </svg>
                      <span className="empty-placeholder-text" style={{ fontSize: '0.95rem' }}>Pure Drops RO System</span>
                    </div>
                  )}
                </div>

                {/* Color Variants Switcher */}
                {currentProduct.variants && currentProduct.variants.length > 0 && (
                  <div style={{ marginTop: '1.2rem', background: '#f8fafc', padding: '1rem 1.2rem', borderRadius: '14px', border: '1px solid #e2e8f0' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.8rem' }}>
                      <span style={{ fontSize: '0.88rem', fontWeight: 700, color: '#0f172a' }}>
                        Select Color Variant:
                      </span>
                      <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#0284c7' }}>
                        {selectedVariant?.name}
                      </span>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap', alignItems: 'center' }}>
                      {currentProduct.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <button
                            key={v.id}
                            type="button"
                            onClick={() => setSelectedVariant(v)}
                            title={v.name}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.4rem 0.8rem',
                              borderRadius: '9999px',
                              border: isSelected ? `2px solid ${v.border || '#0284c7'}` : '1px solid #cbd5e1',
                              background: isSelected ? '#ffffff' : '#f1f5f9',
                              boxShadow: isSelected ? '0 4px 12px rgba(2, 132, 199, 0.2)' : 'none',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              outline: 'none'
                            }}
                          >
                            <span 
                              style={{
                                width: '18px',
                                height: '18px',
                                borderRadius: '50%',
                                backgroundColor: v.color,
                                border: v.color === '#ffffff' ? '1px solid #94a3b8' : 'none',
                                display: 'inline-block',
                                boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.2)'
                              }}
                            />
                            <span style={{ fontSize: '0.82rem', fontWeight: isSelected ? 700 : 500, color: isSelected ? '#0f172a' : '#475569' }}>
                              {v.name}
                            </span>
                          </button>
                        );
                      })}
                    </div>

                    {/* Thumbnail Previews */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.5rem', marginTop: '1rem' }}>
                      {currentProduct.variants.map((v) => {
                        const isSelected = selectedVariant?.id === v.id;
                        return (
                          <div
                            key={v.id}
                            onClick={() => setSelectedVariant(v)}
                            style={{
                              border: isSelected ? '2px solid #0284c7' : '1px solid #e2e8f0',
                              borderRadius: '10px',
                              padding: '0.3rem',
                              background: '#fff',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                              opacity: isSelected ? 1 : 0.7
                            }}
                          >
                            <img 
                              src={v.imageSrc} 
                              alt={v.name} 
                              style={{ width: '100%', height: '60px', objectFit: 'contain' }} 
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
                
                <div className="solution-badge-pill" style={{ marginTop: '1rem' }}>
                  <svg viewBox="0 0 24 24"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-5.45 9-12V5l-9-4zm-2 16l-4-4 1.41-1.41L10 14.17l6.59-6.59L18 9l-8 8z"/></svg>
                  Official Pure Drops RO Guaranteed Product
                </div>
              </div>

              {/* Content Column */}
              <div className="solution-content-col">
                <h4>Product Description</h4>
                <p className="solution-desc">{currentProduct.fullDesc || currentProduct.desc}</p>

                {/* Key Features Bullet Highlights */}
                {currentProduct.features && (
                  <div style={{ marginTop: '1.5rem', background: '#f8fafc', padding: '1.2rem 1.5rem', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                    <h5 style={{ fontSize: '0.95rem', fontWeight: 800, color: '#0f4c81', margin: '0 0 0.8rem', textTransform: 'uppercase' }}>Key System Features</h5>
                    <ul style={{ paddingLeft: '1.2rem', margin: 0, color: '#475569', fontSize: '0.92rem', lineHeight: '1.7' }}>
                      {currentProduct.features.map((feat, idx) => (
                        <li key={idx} style={{ marginBottom: '0.3rem' }}>{feat}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <h4 style={{ marginTop: '2rem' }}>Technical Specifications</h4>
                <div className="specs-grid">
                  {currentProduct.specs.map((item, idx) => {
                    const isObject = typeof item === 'object';
                    return (
                      <div key={idx} className="spec-box">
                        <span className="spec-label">{isObject ? item.label : `Spec ${idx + 1}`}</span>
                        <span className="spec-val">{isObject ? item.val : item}</span>
                      </div>
                    );
                  })}
                </div>

                {currentProduct.applications && (
                  <>
                    <h4 style={{ marginTop: '2rem' }}>Ideal Applications</h4>
                    <div className="apps-tags">
                      {currentProduct.applications.map((app, idx) => (
                        <span key={idx} className="app-tag">
                          <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          {app}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>

            </div>

            {/* Footer */}
            <div className="solution-detail-footer">
              <p>Have questions about sizing, vessel capacity, or installation in your area?</p>
              <div className="solution-footer-btns">
                <button className="btn btn-primary" onClick={() => openModal(currentProduct.title)}>
                  Book Free Consultation
                </button>
                <Link href="/products" className="btn btn-secondary">
                  &larr; Back to Products Catalog
                </Link>
              </div>
            </div>

          </div>

        </div>
      </section>
    </>
  );
}
