'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useQuote } from '../context/QuoteContext';

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { openModal } = useQuote();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path) => pathname === path;

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      {/* Top Contact Bar */}
      <div className="top-bar">
        <div className="container top-bar-content">
          <div className="top-left-info">
            <span className="iso-badge">ISO 9001:2015 CERTIFIED</span>
            <span>AN ISO 9001:2015 CERTIFIED COMPANY</span>
          </div>
          <div className="top-right-info">
            <span className="top-link" id="headerPhoneLink">
              <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
              Contact:&nbsp;
              <a href="tel:+919497150452" style={{ color: 'inherit', textDecoration: 'none' }}>94971 50452</a>
              &nbsp;/&nbsp;
              <a href="tel:+919846253025" style={{ color: 'inherit', textDecoration: 'none' }}>98462 53025</a>
            </span>
            <button 
              className="btn btn-primary btn-card" 
              onClick={() => openModal('General Consultation')}
              id="topRequestDemo"
            >
              REQUEST QUOTE
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="container">
        <nav className="main-nav">
          <Link href="/" className="logo" id="logoLink" onClick={closeMenu}>
            <img src="/logo.png" alt="Pure Drops RO Logo" className="logo-img" />
          </Link>
          
          <button 
            className={`hamburger ${isMenuOpen ? 'active' : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle Navigation"
          >
            <span style={isMenuOpen ? { transform: 'rotate(45deg) translate(5px, 5px)' } : {}}></span>
            <span style={isMenuOpen ? { opacity: 0 } : {}}></span>
            <span style={isMenuOpen ? { transform: 'rotate(-45deg) translate(7px, -7px)' } : {}}></span>
          </button>

          <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`} id="navLinks">
            <li>
              <Link href="/" className={isActive('/') ? 'active' : ''} onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/about" className={isActive('/about') ? 'active' : ''} onClick={closeMenu}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="/products" className={isActive('/products') ? 'active' : ''} onClick={closeMenu}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/services" className={isActive('/services') ? 'active' : ''} onClick={closeMenu}>
                Services & Lab
              </Link>
            </li>
            <li>
              <Link href="/contact" className={isActive('/contact') ? 'active' : ''} onClick={closeMenu}>
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
