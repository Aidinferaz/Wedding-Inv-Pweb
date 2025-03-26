document.addEventListener('DOMContentLoaded', function() {
    // Make timeline items visible on scroll
    const timelineItems = document.querySelectorAll('.timeline-item');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const sections = document.querySelectorAll('section');
    
    // Add initial visible class to first timeline item
    if (timelineItems.length > 0) {
        timelineItems[0].classList.add('visible');
    }
    
    function checkScroll() {
      // Timeline items animation
      timelineItems.forEach((item, index) => {
        const itemTop = item.getBoundingClientRect().top;
        const triggerHeight = window.innerHeight * 0.8;
        
        if (itemTop < triggerHeight) {
          setTimeout(() => {
            item.classList.add('visible');
          }, index * 200); // Staggered animation
        }
      });
      
      // Sections fade-in animation
      sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const triggerHeight = window.innerHeight * 0.9;
        
        if (sectionTop < triggerHeight && !section.classList.contains('visible')) {
          section.classList.add('visible');
          section.style.opacity = 1;
          section.style.transform = 'translateY(0)';
        }
      });
    }
    
    // Set initial styles for sections
    sections.forEach(section => {
      if (!section.classList.contains('visible')) {
        section.style.opacity = 0;
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 1s ease, transform 1s ease';
      }
    });
    
    // Add parallax effect to header & footer
    const header = document.querySelector('header');
    const footer = document.querySelector('footer');
    const parallaxSection = document.querySelector('.parallax-section');
    
    window.addEventListener('scroll', function() {
      const scrollPosition = window.pageYOffset;
      
      // Parallax for header and footer
      if (header) {
        header.style.backgroundPosition = `center ${scrollPosition * 0.4}px`;
      }
      
      if (footer) {
        footer.style.backgroundPosition = `center ${-scrollPosition * 0.2}px`;
      }
      
      // Parallax for middle section
      if (parallaxSection) {
        const parallaxOffset = parallaxSection.offsetTop;
        if (scrollPosition > parallaxOffset - window.innerHeight && scrollPosition < parallaxOffset + parallaxSection.offsetHeight) {
          const yPos = -(scrollPosition - parallaxOffset) * 0.3;
          parallaxSection.style.backgroundPosition = `center ${yPos}px`;
        }
      }
      
      checkScroll();
    });
    
    // Call scroll check on page load
    setTimeout(checkScroll, 500);
    
    // Gift card hover effects
    const giftCards = document.querySelectorAll('.gift-card');
    
    giftCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px)';
        this.style.boxShadow = '0 15px 30px rgba(0,0,0,0.15)';
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = '';
        this.style.boxShadow = '';
      });
    });
    
    // Form inputs animation for better UX
    const formInputs = document.querySelectorAll('#rsvp-form input, #rsvp-form select, #rsvp-form textarea');
    
    formInputs.forEach(input => {
      const formGroup = input.closest('.form-group');
      
      input.addEventListener('focus', function() {
        formGroup.classList.add('focused');
      });
      
      input.addEventListener('blur', function() {
        if (this.value === '') {
          formGroup.classList.remove('focused');
        }
      });
      
      // Check initial state
      if (input.value !== '') {
        formGroup.classList.add('focused');
      }
    });
    
    // Gallery image reveal animations
    const observerOptions = {
      threshold: 0.3,
      rootMargin: '0px'
    };
    
    const galleryObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          galleryObserver.unobserve(entry.target);
        }
      });
    }, observerOptions);
    
    galleryItems.forEach((item, index) => {
      item.style.opacity = '0';
      item.style.transform = 'scale(0.8)';
      item.style.transition = `all 0.6s ease ${index * 0.1}s`;
      galleryObserver.observe(item);
    });
    
    // Add revealed class to items in viewport
    document.addEventListener('scroll', () => {
      galleryItems.forEach(item => {
        const rect = item.getBoundingClientRect();
        const isInViewport = (
          rect.top >= 0 &&
          rect.left >= 0 &&
          rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
        
        if (isInViewport) {
          item.classList.add('revealed');
        }
      });
    }, { passive: true });
    
    // Event cards hover animation
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
      card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.event-icon');
        if (icon) {
          icon.style.transform = 'scale(1.2) rotate(10deg)';
          icon.style.transition = 'transform 0.3s ease';
        }
      });
      
      card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.event-icon');
        if (icon) {
          icon.style.transform = '';
        }
      });
    });
    
    // Protocol item hover animation
    const protocolItems = document.querySelectorAll('.protocol-item');
    
    protocolItems.forEach(item => {
      item.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.protocol-icon');
        if (icon) {
          icon.style.transform = 'translateY(-5px)';
          icon.style.color = 'var(--dark-accent)';
          icon.style.transition = 'all 0.3s ease';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.protocol-icon');
        if (icon) {
          icon.style.transform = '';
          icon.style.color = '';
        }
      });
    });
});

// Typingwriter effect for quotes
function startTypingEffect() {
  const quote = document.querySelector('.quote');
  if (!quote) return;
  
  const text = quote.textContent;
  quote.textContent = '';
  quote.style.opacity = '1';
  
  let charIndex = 0;
  const typingInterval = setInterval(() => {
    if (charIndex < text.length) {
      quote.textContent += text.charAt(charIndex);
      charIndex++;
    } else {
      clearInterval(typingInterval);
    }
  }, 50);
}

// Initialize typing effect when quote section is in view
function setupTypingObserver() {
  const quoteSection = document.querySelector('.parallax-section');
  if (!quoteSection) return;
  
  const quoteObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting) {
      startTypingEffect();
      quoteObserver.unobserve(quoteSection);
    }
  }, { threshold: 0.5 });
  
  quoteObserver.observe(quoteSection);
}

// Start the typing effect observer
window.addEventListener('load', setupTypingObserver);