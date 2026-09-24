document.addEventListener('DOMContentLoaded', () => {
  // Initialize all modules
  initHeaderScroll();
  initMobileMenu();
  initHeroSlider();
  initTestimonialSlider();
  initScrollAnimations();
  initProductFilter();
  initQuoteModal();
  initFaqAccordion();
  initFormsHandler();
});

/* ==========================================================================
   1. HEADER SCROLL EFFECT
   ========================================================================== */
function initHeaderScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Check initially
}

/* ==========================================================================
   2. MOBILE NAV MENU
   ========================================================================== */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  if (!hamburger || !navLinks) return;

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
    
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (hamburger.classList.contains('active')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
    } else {
      spans[0].style.transform = 'none';
      spans[1].style.opacity = '1';
      spans[2].style.transform = 'none';
    }
  });

  // Close menu when clicking links
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      hamburger.classList.remove('active');
      hamburger.querySelectorAll('span').forEach(span => span.style.transform = 'none');
      hamburger.querySelectorAll('span')[1].style.opacity = '1';
    });
  });
}

/* ==========================================================================
   3. HERO SLIDER
   ========================================================================== */
function initHeroSlider() {
  const slider = document.querySelector('.hero-slider-container');
  if (!slider) return;

  const slides = slider.querySelectorAll('.slide');
  const prevBtn = slider.querySelector('.slider-prev');
  const nextBtn = slider.querySelector('.slider-next');
  const dotsContainer = slider.querySelector('.slider-dots');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;
  const intervalTime = 6000;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('slider-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
  });

  const dots = dotsContainer.querySelectorAll('.slider-dot');

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function prevSlide() {
    goToSlide(currentSlide - 1);
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      nextSlide();
      resetInterval();
    });
  }

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      prevSlide();
      resetInterval();
    });
  }

  function startInterval() {
    slideInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(slideInterval);
    startInterval();
  }

  startInterval();
}

/* ==========================================================================
   4. TESTIMONIAL SLIDER
   ========================================================================== */
function initTestimonialSlider() {
  const container = document.querySelector('.testimonials-container');
  if (!container) return;

  const slides = container.querySelectorAll('.testimonial-slide');
  const dotsContainer = container.querySelector('.testimonial-dots');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let scrollInterval;
  const intervalTime = 5000;

  // Create dots
  slides.forEach((_, index) => {
    const dot = document.createElement('button');
    dot.classList.add('testimonial-dot');
    if (index === 0) dot.classList.add('active');
    dot.setAttribute('aria-label', `Go to testimonial ${index + 1}`);
    dotsContainer.appendChild(dot);

    dot.addEventListener('click', () => {
      goToSlide(index);
      resetInterval();
    });
  });

  const dots = dotsContainer.querySelectorAll('.testimonial-dot');

  function goToSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    currentSlide = (n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startInterval() {
    scrollInterval = setInterval(nextSlide, intervalTime);
  }

  function resetInterval() {
    clearInterval(scrollInterval);
    startInterval();
  }

  startInterval();
}

/* ==========================================================================
   5. SCROLL-DRIVEN ANIMATIONS
   ========================================================================== */
function initScrollAnimations() {
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target); // Trigger only once
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    animatedElements.forEach(el => el.classList.add('animated'));
  }
}

/* ==========================================================================
   6. PRODUCT FILTERS (PRODUCTS PAGE)
   ========================================================================== */
function initProductFilter() {
  const filterContainer = document.querySelector('.product-filters');
  const productsGrid = document.querySelector('.products-grid');

  if (!filterContainer || !productsGrid) return;

  const buttons = filterContainer.querySelectorAll('.filter-btn');
  const cards = productsGrid.querySelectorAll('.product-card');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      // Toggle active button
      buttons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filterValue = button.getAttribute('data-filter');

      cards.forEach(card => {
        const category = card.getAttribute('data-category');

        // Apply scale transition
        card.style.transition = 'all 0.35s ease';
        
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.8)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 350);
        }
      });
    });
  });
}

/* ==========================================================================
   7. REQUEST QUOTE MODAL SYSTEM
   ========================================================================== */
function initQuoteModal() {
  const modalOverlay = document.getElementById('quoteModal');
  if (!modalOverlay) return;

  const closeBtn = modalOverlay.querySelector('.modal-close');
  const modalBody = modalOverlay.querySelector('.modal-body');
  const productInput = modalOverlay.querySelector('#modalProduct');

  // Find all buttons that trigger quote
  const quoteTriggers = document.querySelectorAll('.trigger-quote');

  quoteTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Check if button belongs to a product card
      const productCard = trigger.closest('.product-card');
      let productName = "";

      if (productCard) {
        productName = productCard.querySelector('h3').textContent;
      } else {
        productName = trigger.getAttribute('data-product') || "General Water System Inquiry";
      }

      if (productInput) {
        productInput.value = productName;
      }

      // Show modal
      modalOverlay.classList.add('active');
      document.body.style.overflow = 'hidden'; // Stop page scrolling
    });
  });

  const closeModal = () => {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });

  // Handle escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   8. FAQ ACCORDION (SERVICES PAGE)
   ========================================================================== */
function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const header = item.querySelector('.faq-header');
    const body = item.querySelector('.faq-body');

    if (!header || !body) return;

    header.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      // Close other items
      faqItems.forEach(otherItem => {
        if (otherItem !== item && otherItem.classList.contains('active')) {
          otherItem.classList.remove('active');
          otherItem.querySelector('.faq-body').style.height = '0px';
        }
      });

      // Toggle active
      if (isActive) {
        item.classList.remove('active');
        body.style.height = '0px';
      } else {
        item.classList.add('active');
        // Calculate auto height scrollHeight
        body.style.height = body.scrollHeight + 'px';
      }
    });
  });
}

/* ==========================================================================
   9. FORMS SUBMISSION ANIMATIONS
   ========================================================================== */
function initFormsHandler() {
  const forms = document.querySelectorAll('form');

  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector('[type="submit"]');
      const originalBtnHtml = submitBtn.innerHTML;

      // Disable inputs and button
      const inputs = form.querySelectorAll('input, textarea, select, button');
      inputs.forEach(input => input.disabled = true);

      // Loading state spinner in submit button
      submitBtn.innerHTML = `
        <svg class="spinner" viewBox="0 0 50 50" style="animation: rotate 2s linear infinite; width: 20px; height: 20px; fill: none; stroke: currentColor; stroke-width: 4px; stroke-linecap: round;">
          <circle cx="25" cy="25" r="20"></circle>
        </svg> Sending...`;

      // Simulate API submit delay (1.5 seconds)
      setTimeout(() => {
        // Show success animation/alert
        const successDiv = document.createElement('div');
        successDiv.style.background = '#e6fffa';
        successDiv.style.border = '1px solid #319795';
        successDiv.style.color = '#234e52';
        successDiv.style.padding = '1.2rem';
        successDiv.style.borderRadius = '8px';
        successDiv.style.marginTop = '1rem';
        successDiv.style.fontFamily = 'Outfit, sans-serif';
        successDiv.style.fontWeight = '600';
        successDiv.style.fontSize = '0.95rem';
        successDiv.style.textAlign = 'center';
        successDiv.style.display = 'flex';
        successDiv.style.alignItems = 'center';
        successDiv.style.justifyContent = 'center';
        successDiv.style.gap = '0.5rem';
        successDiv.style.opacity = '0';
        successDiv.style.transform = 'translateY(10px)';
        successDiv.style.transition = 'all 0.35s ease';

        successDiv.innerHTML = `
          <svg style="width: 20px; height: 20px; fill: #319795" viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
          </svg> Thank you! Your request has been sent successfully. We will contact you shortly.`;

        form.appendChild(successDiv);

        // Reset submit button and inputs
        submitBtn.innerHTML = originalBtnHtml;
        inputs.forEach(input => input.disabled = false);
        form.reset();

        // Fade in success message
        setTimeout(() => {
          successDiv.style.opacity = '1';
          successDiv.style.transform = 'translateY(0)';
        }, 50);

        // If this form is inside the modal, close modal after a brief duration
        const modalOverlay = form.closest('.modal-overlay');
        if (modalOverlay) {
          setTimeout(() => {
            modalOverlay.classList.remove('active');
            document.body.style.overflow = '';
            successDiv.remove();
          }, 3000);
        } else {
          // Remove success alert after 6 seconds
          setTimeout(() => {
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(10px)';
            setTimeout(() => successDiv.remove(), 350);
          }, 6000);
        }

      }, 1500);
    });
  });
}

// Add rotate animation styles dynamically for loading spinner
const style = document.createElement('style');
style.textContent = `
  @keyframes rotate {
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(style);
