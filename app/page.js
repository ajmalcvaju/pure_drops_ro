'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useQuote } from '../context/QuoteContext';

// Animated stats counter component
const StatsCounter = ({ target, duration = 2000, suffix = "", decimals = 0 }) => {
  const [count, setCount] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.1 }
    );

    let currentRef = null;
    if (elementRef.current) {
      currentRef = elementRef.current;
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const end = parseFloat(target);
    if (start === end) return;

    const totalMiliseconds = duration;
    const incrementTime = 30;
    const totalSteps = totalMiliseconds / incrementTime;
    const increment = (end - start) / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [hasStarted, target, duration]);

  const formattedCount = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toLocaleString();

  return (
    <span ref={elementRef}>
      {formattedCount}{suffix}
    </span>
  );
};

export default function Home() {
  const { openModal } = useQuote();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [testimonialTransition, setTestimonialTransition] = useState(true);
  const [logoIndex, setLogoIndex] = useState(0);
  const [logoTransition, setLogoTransition] = useState(true);

  const heroSlides = [
    {
      title: <>Welcome to<br />Pure Drops RO</>,
      sub: "Kozhikode's premium water treatment organization. Delivering customized filters and systems matching rigorous global standards.",
      bullets: [
        "80% of all diseases are waterborne",
        "Enhanced household and business productivity",
        "Cost-effective compared to bottled water packages"
      ],
      ctaText: "Request Call Back",
      ctaProduct: "Welcome Slider Quote",
      imageSrc: "/hero_slide_child.jpg",
      visual: (
        <div className="water-droplets-visual">
          <div className="droplet-circle dc-1"></div>
          <div className="droplet-circle dc-2"></div>
          <div className="droplet-circle dc-3"></div>
        </div>
      ),
      label: "Illustration: Child Drinking Pure Water"
    },

    {
      title: <>Laboratory Certified<br />Water Analysis</>,
      sub: "Identify chemical imbalances, bacteria content, and precise TDS count to deploy correct filter configurations.",
      bullets: [
        "pH balance and iron presence check",
        "Accurate microbiology reports",
        "Certified local Kozhikode lab test technicians"
      ],
      ctaText: "Talk to Expert",
      ctaProduct: "Water Test Consultation",
      imageSrc: "/hero_slide_lab.jpg",
      visual: (
        <svg className="placeholder-illustration" viewBox="0 0 24 24"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"/></svg>
      ),
      label: "Illustration: Laboratory Testing Setup"
    }
  ];

  const testimonials = [
    {
      text: "The experience with the Pure Drops RO team is superior. We had them install a Gov. school purification system and the water laboratory report shows pristine results. Their dedication to schedule execution is remarkable.",
      author: "Mr. Prasanth IAS",
      role: "Kozhikode Regional Advisor"
    },
    {
      text: "To provide sustainable solutions with enduring commitment requires expert execution. Pure Drops RO designs outstanding custom RO plants. They maintain high-quality parameters and fast replacement support.",
      author: "Dr. Manoj",
      role: "Chief Clinical Director, Calicut"
    },
    {
      text: "Our home groundwater had massive scaling and iron particles. The HydroSoft Softener from Pure Drops RO completely transformed the hardness. Outstanding plumbing team, neat work, and no more scaling!",
      author: "Mrs. Anjali K.",
      role: "Homeowner, Eranhipaalam"
    },
    {
      text: "Thank you for the quick response. Your pre- and post-sales customer service has been incredibly good. Fast, polite, very informative.",
      author: "Ajay",
      role: "Businessman"
    },
    {
      text: "Thank you for the quick response. I want to let you know that I really appreciate the great customer assistance at Pure Drops RO.",
      author: "Salman",
      role: "Doctor"
    },
    {
      text: "We installed their commercial RO filtration plant in our campus. Excellent water flow, prompt filter replacement services, and absolute purity certified by labs.",
      author: "Mrs. Rema Devi",
      role: "School Principal"
    }
  ];

  // Auto Scroll Sliders & Setup Observers
  useEffect(() => {
    const heroTimer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 6000);

    const testimonialTimer = setInterval(() => {
      setTestimonialTransition(true);
      setTestimonialIndex((prev) => {
        if (prev === 6) {
          return 1;
        }
        return prev + 1;
      });
    }, 5000);

    const logoTimer = setInterval(() => {
      setLogoTransition(true);
      setLogoIndex((prev) => {
        if (prev === 5) {
          return 1;
        }
        return prev + 1;
      });
    }, 3000);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));

    return () => {
      clearInterval(heroTimer);
      clearInterval(testimonialTimer);
      clearInterval(logoTimer);
      observer.disconnect();
    };
  }, []);

  // Handle snap-back for seamless loop logo carousel
  useEffect(() => {
    if (logoIndex === 5) {
      const snapTimer = setTimeout(() => {
        setLogoTransition(false);
        setLogoIndex(0);
      }, 600); // matches CSS transition speed (0.6s)
      return () => clearTimeout(snapTimer);
    }
  }, [logoIndex]);

  // Handle snap-back for testimonials loop
  useEffect(() => {
    if (testimonialIndex === 6) {
      const snapTimer = setTimeout(() => {
        setTestimonialTransition(false);
        setTestimonialIndex(0);
      }, 600); // matches CSS transition speed (0.6s)
      return () => clearTimeout(snapTimer);
    }
  }, [testimonialIndex]);

  return (
    <>
      {/* ==========================================================================
           HERO SLIDER
           ========================================================================== */}
      <section className="hero-slider-container" aria-label="Hero Slide Showcase">
        <div className="slider-wrapper">
          {heroSlides.map((slide, index) => (
            <div key={index} className={`slide ${currentSlide === index ? 'active' : ''}`}>
              <div className="container">
                <div className="slide-content-grid">
                  <div className="slide-text">
                    {currentSlide === index && (
                      <>
                        {index === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
                        <p className="slide-sub">{slide.sub}</p>
                        <ul className="slide-bullets">
                          {slide.bullets.map((bullet, idx) => (
                            <li key={idx}>
                              <svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" /></svg>
                              {bullet}
                            </li>
                          ))}
                        </ul>
                        <div className="slide-buttons">
                          <button className="btn btn-primary" onClick={() => openModal(slide.ctaProduct)}>
                            {slide.ctaText}
                          </button>
                          {index === 0 ? (
                            <Link href="/about" className="btn btn-secondary">Learn More</Link>
                          ) : (
                            <Link href="/services" className="btn btn-secondary">Book Lab Test</Link>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                  <div className="slide-visual">
                    {slide.imageSrc ? (
                      <img src={slide.imageSrc} alt={slide.label} className="slide-image" />
                    ) : (
                      <div className="image-placeholder image-placeholder-large" aria-label={slide.label}>
                        {slide.visual}
                        <div className="placeholder-label">{slide.label}</div>
                        <div className="placeholder-dimensions">SVG / CSS Responsive Vector</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Slider Controls */}
        <button 
          className="slider-control slider-prev" 
          onClick={() => setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)}
          aria-label="Previous slide"
        >
          <svg viewBox="0 0 24 24"><path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/></svg>
        </button>
        <button 
          className="slider-control slider-next" 
          onClick={() => setCurrentSlide((prev) => (prev + 1) % heroSlides.length)}
          aria-label="Next slide"
        >
          <svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg>
        </button>

      </section>

      {/* ==========================================================================
           MISSION & VISION
           ========================================================================== */}
      <div className="container animate-on-scroll">
        <div className="mission-vision-bar">
          <div className="mv-card vision">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24"><path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
            </div>
            <div className="mv-info">
              <h3>Our Vision</h3>
              <p>To be a trusted leader in water treatment solutions, recognized for excellence, innovation and commitment to a sustainable tomorrow.</p>
            </div>
          </div>
          <div className="mv-card mission">
            <div className="mv-icon">
              <svg viewBox="0 0 24 24"><path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H7c0-2.76 2.24-5 5-5s5 2.24 5 5c0 1.04-.42 1.99-1.07 2.25z"/></svg>
            </div>
            <div className="mv-info">
              <h3>Our Mission</h3>
              <p>To deliver reliable, cost-effective and environmentally responsible water treatment solutions that ensure clean water, regulatory compliance and long-term value for our clients.</p>
            </div>
          </div>
        </div>
      </div>

      {/* ==========================================================================
           WHY CHOOSE AQUASOLVE (GRID)
           ========================================================================== */}
      <section className="section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
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
           ABOUT PREVIEW (SPLASH)
           ========================================================================== */}
      <section className="section section-bg">
        <div className="container">
          <div className="about-preview-wrapper">
            
            {/* Mobile Header (Shown 1st on mobile) */}
            <h2 className="about-preview-title about-title-mobile animate-on-scroll">
              About Pure Drops RO
            </h2>

            <div className="about-preview-grid">
              
              {/* Text & Button (Desktop Left Column / Mobile 3rd & 4th) */}
              <div className="about-text-column animate-on-scroll">
                <h2 className="about-preview-title about-title-desktop">
                  About Pure Drops RO
                </h2>
                <p className="about-preview-desc-1">
                  Pure Drops RO, based in Kozhikode, is a leading Water Treatment Company in Kerala. We specialize in engineering and executing high-standard water solutions for domestic, commercial, and industrial requirements.
                </p>
                <p className="about-preview-desc-2">
                  Our product line includes top-tier Aqua Gold water purifiers, reverse osmosis plants, wastewater treatment utilities, softeners, and iron removal structures. With a team of highly-trained chemical engineers and service specialists, we maintain quality standards across installation and after-sales service.
                </p>
                <div className="about-btn-wrap">
                  <Link href="/about" className="btn btn-primary">More Details</Link>
                </div>
              </div>

              {/* Image (Desktop Right Column / Mobile 2nd) */}
              <div className="about-image-column animate-on-scroll">
                <img src="/about_splash_water.jpg" alt="Fresh Splashing Glasses of Water" className="about-preview-img" />
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* ==========================================================================
           FEATURED PRODUCTS
           ========================================================================== */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2>Our Featured Products</h2>
            <p>Explore our premium domestic filters and heavy-duty filtration setups designed for Kerala's water conditions.</p>
          </div>

          <div className="products-grid">
            {/* Product 1 */}
            <Link href="/products/101" className="product-card-link animate-on-scroll">
              <div className="product-card">
                <div className="product-image-area">
                  <span className="product-tag" style={{ background: '#0f4c81' }}>Active Copper</span>
                  <img src="/product_aqua_phoenix_gold_ro.png" alt="Aqua Phoenix Gold Mineral RO Water Purifier" className="product-image" />
                </div>
                <div className="product-info">
                  <h3>Aqua Phoenix Gold Mineral RO Water Purifier</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>10 Stage RO+UV+UF+Active Copper Mineral Purifier with 10L Pure Water Storage and Smoked Canopy Gauge.</p>
                  <ul className="product-specs">
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Infusion: Active Copper Ions</li>
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Design: Smoked Canopy with Gauge</li>
                  </ul>
                  <div className="product-footer">
                    <span className="product-price">₹10,999</span>
                    <button 
                      className="btn btn-primary btn-card" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        openModal('Aqua Phoenix Gold Mineral RO Water Purifier'); 
                      }}
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 2 */}
            <Link href="/products/10" className="product-card-link animate-on-scroll">
              <div className="product-card">
                <div className="product-image-area">
                  <span className="product-tag" style={{ background: '#092f56' }}>Dual Mode</span>
                  <img src="/product_puroaqua_white.jpg" alt="Puroaqua Dual Mode (White)" className="product-image" />
                </div>
                <div className="product-info">
                  <h3>Puroaqua Dual Mode (White)</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>6-Stage Advanced Purification system with Dual-Mode toggle. RO+UF+ALK for high TDS well water, and SN+UF+ALK for municipal flow.</p>
                  <ul className="product-specs">
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Ideal for: High &amp; Low TDS Water</li>
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Enrichment: Alkaline pH balancer</li>
                  </ul>
                  <div className="product-footer">
                    <span className="product-price">₹14,500</span>
                    <button 
                      className="btn btn-primary btn-card" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        openModal('Puroaqua Dual Mode (White)'); 
                      }}
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 3 */}
            <Link href="/products/12" className="product-card-link animate-on-scroll">
              <div className="product-card">
                <div className="product-image-area">
                  <span className="product-tag">Carbon Filter</span>
                  <img src="/product_frp_vessel.png" alt="Pure Drops Carbon Filter" className="product-image" />
                </div>
                <div className="product-info">
                  <h3>Pure Drops Carbon Filter</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>High-grade activated carbon filter. Adsorbs chlorine, organic pesticides, bad taste, odor, and chemical impurities from supply water.</p>
                  <ul className="product-specs">
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Vessel: FRP pressure tank</li>
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Service: Simple backwash routine</li>
                  </ul>
                  <div className="product-footer">
                    <span className="product-price">₹30,000</span>
                    <button 
                      className="btn btn-primary btn-card" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        openModal('Pure Drops Carbon Filter'); 
                      }}
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>

            {/* Product 4 */}
            <Link href="/products/4" className="product-card-link animate-on-scroll">
              <div className="product-card">
                <div className="product-image-area">
                  <span className="product-tag">Heavy Duty</span>
                  <img src="/product_commercial_ro.png" alt="Pure Drops Commercial RO Treatment Plant" className="product-image" />
                </div>
                <div className="product-info">
                  <h3>Pure Drops Commercial RO Treatment Plant</h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-light)' }}>Industrial configuration featuring multiple filters, high pressure pumps, and large scale outputs.</p>
                  <ul className="product-specs">
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Flow Rate: 250 LPH to 5 KPH</li>
                    <li><svg viewBox="0 0 24 24"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg> Structure: Stainless Steel Frame</li>
                  </ul>
                  <div className="product-footer">
                    <span className="product-price">Get Quote</span>
                    <button 
                      className="btn btn-primary btn-card" 
                      onClick={(e) => { 
                        e.preventDefault(); 
                        e.stopPropagation(); 
                        openModal('Pure Drops Commercial RO Treatment Plant'); 
                      }}
                    >
                      Enquire Now
                    </button>
                  </div>
                </div>
              </div>
            </Link>
          </div>
          
          <div style={{ textAlign: 'center', marginTop: '3.5rem' }} className="animate-on-scroll">
            <Link href="/products" className="btn btn-secondary">Explore All Products</Link>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           KEY INDUSTRIES
           ========================================================================== */}
      <section className="section key-industries-section" aria-label="Key Industries Served">
        <div className="container">
          <div className="section-header animate-on-scroll text-center">
            <div className="title-with-lines">
              <span className="bullet">•</span>
              <h2>KEY INDUSTRIES</h2>
              <span className="bullet">•</span>
            </div>
            <p style={{ maxWidth: '650px', margin: '0.5rem auto 0 auto' }}>Providing custom water treatment plants, RO filtration systems, and softeners for various sectors.</p>
          </div>

          <div className="industries-grid">
            {/* Industry 1 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M7 13c1.66 0 3-1.34 3-3S8.66 7 7 7s-3 1.34-3 3 1.34 3 3 3zm12-6h-8v7H3V5H1v15h2v-3h18v3h2v-9c0-2.21-1.79-4-4-4z"/></svg>
                </div>
                <h3>HOTELS & RESORTS</h3>
                <p>Reliable water treatment for luxury stays, kitchens, laundry and recreational facilities.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_hotel.png" alt="Hotels & Resorts" />
              </div>
            </div>

            {/* Industry 2 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M19 10.5h-5.5V5h-3v5.5H5v3h5.5V19h3v-5.5H19v-3z"/></svg>
                </div>
                <h3>HOSPITALS & CLINICS</h3>
                <p>Safe, clean and hygienic water for critical applications and infection control.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_hospital.png" alt="Hospitals & Clinics" />
              </div>
            </div>

            {/* Industry 3 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M12 7V3H2v18h20V7H12zm-6 12H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm14 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v-2h2v-2z"/></svg>
                </div>
                <h3>APARTMENTS & BUILDINGS</h3>
                <p>Sustainable water solutions for daily needs, domestic use and facility management.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_apartment.png" alt="Apartments & Commercial Buildings" />
              </div>
            </div>

            {/* Industry 4 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M22 10l-6 4V9l-6 4V9L2 14v6h20V10z"/></svg>
                </div>
                <h3>INDUSTRIES & FACTORIES</h3>
                <p>Efficient water treatment for process requirements, reuse and regulatory compliance.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_factory.png" alt="Industries & Factories" />
              </div>
            </div>

            {/* Industry 5 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82zM12 3L1 9l11 6 9-4.91V17h2V9L12 3z"/></svg>
                </div>
                <h3>SCHOOLS & COLLEGES</h3>
                <p>Ensuring safe drinking water and a healthy environment for students and staff.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_school.png" alt="Schools & Colleges" />
              </div>
            </div>

            {/* Industry 6 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M15 11V5l-3-3-3 3v2H3v14h18V11h-6zm-8 8H5v-2h2v2zm0-4H5v-2h2v2zm0-4H5V9h2v2zm6 8h-2v-2h2v-2zm0-4h-2v-2h2v-2zm0-4h-2v-2h2v-2zm0-4h-2V5h2v2zm6 12h-2v-2h2v-2zm0-4h-2v-2h2v-2z"/></svg>
                </div>
                <h3>IT PARKS & OFFICES</h3>
                <p>High-quality water solutions for large facilities, cooling systems and pantries.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_office.png" alt="IT Parks & Offices" />
              </div>
            </div>

            {/* Industry 7 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M12 2L2 7v2h20V7L12 2zm-7 9h2v8H5v-8zm5 0h2v8h-2v-8zm5 0h2v8h-2v-8zm5 0h2v8h-2v-8zM2 21h20v2H2v-2z"/></svg>
                </div>
                <h3>GOVERNMENT ORGANIZATIONS</h3>
                <p>Compliant and dependable systems for public utilities, institutions and civic needs.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_government.png" alt="Government Organizations" />
              </div>
            </div>

            {/* Industry 8 */}
            <div className="industry-card animate-on-scroll">
              <div className="industry-header">
                <div className="industry-icon-circle">
                  <svg viewBox="0 0 24 24"><path d="M13 19h-2v-5.69c-2.35-.42-4-2.48-4-4.81 0-2.76 2.24-5 5-5s5 2.24 5 5c0 2.33-1.65 4.39-4 4.81V19zm-1-12c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/></svg>
                </div>
                <h3>RESORTS & LEISURE SPACES</h3>
                <p>Tailored solutions for swimming pools, landscaping, and guest comfort needs.</p>
              </div>
              <div className="industry-image-wrapper">
                <img src="/industry_leisure.png" alt="Resorts & Leisure Spaces" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           TESTIMONIALS
           ========================================================================== */}
      <section className="section section-bg">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2>Testimonials</h2>
            <p>Read opinions and feedback from clients who trust Pure Drops RO for their hydration safety.</p>
          </div>

          <div 
            className="testimonials-carousel-viewport animate-on-scroll"
            style={{
              '--test-index': testimonialIndex,
              '--test-speed': testimonialTransition ? '0.6s' : '0s'
            }}
          >
            <div className="testimonials-carousel-track">
              {[
                ...testimonials,
                testimonials[0],
                testimonials[1],
                testimonials[2]
              ].map((test, index) => (
                <div key={index} className="testimonials-carousel-item">
                  <div className="testimonial-card">
                    <div className="testimonial-card-quote-bg">
                      <span className="testimonial-card-quote-text">99</span>
                    </div>
                    <h3 className="testimonial-card-author">{test.author}</h3>
                    <span className="testimonial-card-role">{test.role}</span>
                    <div className="testimonial-card-stars">
                      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                    </div>
                    <p className="testimonial-card-text">"{test.text}"</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           OUR CLIENTS
           ========================================================================== */}
      <section className="section">
        <div className="container">
          <div className="section-header animate-on-scroll">
            <h2>Our Prestigious Clients</h2>
            <p>Trusted by leading institutions, clinics, bridal centers, and co-operatives in Calicut.</p>
          </div>

          <div 
            className="logo-carousel-viewport animate-on-scroll"
            style={{
              '--logo-index': logoIndex,
              '--logo-speed': logoTransition ? '0.6s' : '0s'
            }}
          >
            <div className="logo-carousel-track">
              {[
                '/client-logo-1.png',
                '/client-logo-2.png',
                '/client-seashell.png',
                '/client-copper-kitchen.png',
                '/client-logo-4.png',
                '/client-logo-5.png',
                '/client-logo-1.png',
                '/client-logo-2.png',
                '/client-seashell.png',
                '/client-copper-kitchen.png',
                '/client-logo-4.png'
              ].map((logo, idx) => (
                <div key={idx} className="logo-carousel-item">
                  <div className="client-logo-wrapper">
                    <img src={logo} alt={`Client Logo ${idx + 1}`} className="client-logo-img" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==========================================================================
           CTA MID BANNER
           ========================================================================== */}
      <section className="cta-banner">
        <div className="container animate-on-scroll">
          <h2>Is your water completely safe for drinking?</h2>
          <p>Schedule a professional testing visit by our Kozhikode laboratory technicians today. Ensure maximum wellness for your family or staff members.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <Link href="/services" className="btn btn-primary" style={{ background: 'var(--bg-white)', color: 'var(--primary-color)', boxShadow: 'none' }}>
              Book Laboratory Check
            </Link>
            <Link href="/contact" className="btn btn-secondary" style={{ borderColor: 'var(--bg-white)', color: 'var(--bg-white)' }}>
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
