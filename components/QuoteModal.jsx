'use client';

import React, { useState, useEffect } from 'react';
import { useQuote } from '../context/QuoteContext';

export default function QuoteModal() {
  const { isOpen, productName, closeModal } = useQuote();
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Reset form states when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setFormData({ name: '', phone: '', email: '', message: '' });
      setSubmitSuccess(false);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const name = formData.name || 'Not specified';
    const phone = formData.phone || 'Not specified';
    const email = formData.email || 'Not specified';
    const reqMessage = formData.message || 'No additional requirements specified';
    const product = productName || 'General System';

    const text = `Hi Pure Drops RO, I would like to Request a Quote / Callback.

🛍️ *Inquiry Details:*
• *Product/System:* ${product}
• *Name:* ${name}
• *Phone:* ${phone}
• *Email:* ${email}
• *Requirements:* ${reqMessage}`;

    const whatsappUrl = `https://wa.me/919497150452?text=${encodeURIComponent(text)}`;

    setSubmitSuccess(true);
    setIsSubmitting(false);

    if (typeof window !== 'undefined') {
      const newWin = window.open(whatsappUrl, '_blank');
      if (!newWin) {
        window.location.href = whatsappUrl;
      }
    }

    setTimeout(() => {
      closeModal();
    }, 2000);
  };

  return (
    <div className="modal-overlay active" onClick={(e) => e.target.classList.contains('modal-overlay') && closeModal()}>
      <div className="modal-box">
        <div className="modal-header">
          <h3>Request Quote / Callback</h3>
          <button className="modal-close" onClick={closeModal} aria-label="Close modal">
            <svg viewBox="0 0 24 24"><path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/></svg>
          </button>
        </div>
        <div className="modal-body">
          <form id="modalQuoteForm" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="modalProduct">Inquired System/Product</label>
              <input type="text" id="modalProduct" className="form-control" value={productName} readOnly />
            </div>
            
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
                Thank you! Inquiry sent successfully.
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
                    placeholder="Enter your name" 
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
                      placeholder="Enter contact number" 
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address (Optional)</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="form-control" 
                      placeholder="Enter your email" 
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Requirements</label>
                  <textarea 
                    id="message" 
                    className="form-control" 
                    placeholder="Describe your water source (well, corporation) or quantity needs..." 
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                  />
                </div>
                <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={isSubmitting}>
                  {isSubmitting ? 'Sending...' : 'Submit Inquiry'}
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
