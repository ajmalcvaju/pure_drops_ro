'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer>
      <div className="container">
        <div className="footer-grid">
          
          <div className="footer-about">
            <Link href="/" className="footer-logo">
              <img src="/logo.png" alt="Pure Drops RO Logo" className="footer-logo-img" />
            </Link>
            <p>
              An ISO 9001:2015 certified company in Kerala. Pioneers in installing premium domestic ROs, water softeners, and heavy commercial filtration systems.
            </p>
          </div>

          <div className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li><Link href="/"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Home</Link></li>
              <li><Link href="/about"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> About Us</Link></li>
              <li><Link href="/products"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Our Products</Link></li>
              <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Services</Link></li>
              <li><Link href="/contact"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Contact Us</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Services</h3>
            <ul className="footer-links">
              <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Water Quality Test</Link></li>
              <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Domestic RO Setup</Link></li>
              <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> AMC Maintenance</Link></li>
              <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Water Softening</Link></li>
              <li><Link href="/services"><svg viewBox="0 0 24 24"><path d="M8.59 16.59L10 18l6-6-6-6-1.41 1.41L13.17 12z"/></svg> Iron Filtration</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h3>Contact Details</h3>
            <ul className="footer-contact">
              <li>
                <svg viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                <div className="footer-contact-text">
                  <span>Address</span>
                  <a 
                    href="https://maps.app.goo.gl/QV4dZ44GWSHjJnKV7" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    style={{ color: 'inherit', textDecoration: 'underline' }}
                  >
                    10/505, Chethukadavu, Mukkam Road,<br />Kunnamangalam, Kozhikode, Kerala - 673571
                  </a>
                </div>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
                <div className="footer-contact-text">
                  <span>Phone</span>
                  <a href="tel:+919745137799" style={{ color: 'inherit', display: 'block' }}>97451 37799</a>
                </div>
              </li>
              <li>
                <svg viewBox="0 0 24 24"><path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/></svg>
                <div className="footer-contact-text">
                  <span>Email</span>
                  <a href="mailto:waterpuredrops@gmail.com" style={{ color: 'inherit' }}>waterpuredrops@gmail.com</a>
                </div>
              </li>
              <li style={{ marginTop: '0.4rem', fontSize: '0.9rem' }}>
                <span style={{ fontWeight: '600', color: 'var(--accent-color)' }}>GSTIN: 32IQAPK9062G1ZT</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 Pure Drops RO. All Rights Reserved. Designed for Maximum Wellness.</p>
          <div className="footer-bottom-links">
            <a href="#">Privacy Policy</a>
            <a href="#">Terms & Conditions</a>
            <a href="#">Sitemap</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
