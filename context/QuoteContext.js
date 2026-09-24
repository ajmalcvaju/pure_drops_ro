'use client';

import React, { createContext, useContext, useState } from 'react';

const QuoteContext = createContext(undefined);

export function QuoteProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [productName, setProductName] = useState('');

  const openModal = (product = 'General Consultation') => {
    setProductName(product);
    setIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setIsOpen(false);
    document.body.style.overflow = '';
  };

  return (
    <QuoteContext.Provider value={{ isOpen, productName, openModal, closeModal }}>
      {children}
    </QuoteContext.Provider>
  );
}

export function useQuote() {
  const context = useContext(QuoteContext);
  if (!context) {
    throw new Error('useQuote must be used within a QuoteProvider');
  }
  return context;
}
