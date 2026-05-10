/* ============================================
   SOLAR SETU ENERGY - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- Loading Screen ----------
  const loader = document.getElementById('loader');
  window.addEventListener('load', function () {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1200);
  });
  // Fallback
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);

  // ---------- Navbar Scroll Effect ----------
  const navbar = document.querySelector('.navbar');
  const backToTop = document.querySelector('.back-to-top');

  function handleScroll() {
    const scrollY = window.scrollY;
    if (scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    if (backToTop) {
      if (scrollY > 400) {
        backToTop.classList.add('visible');
      } else {
        backToTop.classList.remove('visible');
      }
    }
  }

  window.addEventListener('scroll', handleScroll);
  handleScroll();

  // ---------- Back to Top ----------
  if (backToTop) {
    backToTop.addEventListener('click', function () {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Mobile Menu ----------
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-menu a');

  function toggleMobileMenu() {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
    document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
  }

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', toggleMobileMenu);
  mobileOverlay.addEventListener('click', closeMobileMenu);
  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ---------- Smooth Scroll for Anchor Links ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ---------- Animated Counter ----------
  function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
      if (counter.dataset.animated) return;

      const target = parseInt(counter.getAttribute('data-target'));
      const suffix = counter.getAttribute('data-suffix') || '';
      const prefix = counter.getAttribute('data-prefix') || '';
      const duration = 2000;
      const step = target / (duration / 16);
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = prefix + Math.floor(current) + suffix;
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = prefix + target + suffix;
        }
      };

      counter.dataset.animated = 'true';
      updateCounter();
    });
  }

  // ---------- Scroll Animations ----------
  const animateElements = document.querySelectorAll('.animate-on-scroll');
  const counterSection = document.querySelector('.stats-grid');

  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach(el => observer.observe(el));

  // Counter observer
  if (counterSection) {
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounters();
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    counterObserver.observe(counterSection);
  }

  // ---------- Testimonials Slider ----------
  const sliderTrack = document.querySelector('.testimonials-track');
  const prevBtn = document.querySelector('.testimonial-prev');
  const nextBtn = document.querySelector('.testimonial-next');

  if (sliderTrack) {
    let currentSlide = 0;
    const cards = sliderTrack.querySelectorAll('.testimonial-card');
    const totalCards = cards.length;

    function getVisibleCards() {
      if (window.innerWidth <= 768) return 1;
      if (window.innerWidth <= 1024) return 2;
      return 3;
    }

    function getCardWidth() {
      const visible = getVisibleCards();
      const containerWidth = sliderTrack.parentElement.offsetWidth;
      return (containerWidth - (visible - 1) * 16) / visible;
    }

    function updateSlider() {
      const visible = getVisibleCards();
      const maxSlide = Math.max(0, totalCards - visible);
      if (currentSlide > maxSlide) currentSlide = maxSlide;
      const cardWidth = getCardWidth();
      const offset = currentSlide * (cardWidth + 16);
      sliderTrack.style.transform = `translateX(-${offset}px)`;
    }

    function nextSlide() {
      const visible = getVisibleCards();
      const maxSlide = Math.max(0, totalCards - visible);
      currentSlide = currentSlide >= maxSlide ? 0 : currentSlide + 1;
      updateSlider();
    }

    function prevSlide() {
      const visible = getVisibleCards();
      const maxSlide = Math.max(0, totalCards - visible);
      currentSlide = currentSlide <= 0 ? maxSlide : currentSlide - 1;
      updateSlider();
    }

    if (nextBtn) nextBtn.addEventListener('click', nextSlide);
    if (prevBtn) prevBtn.addEventListener('click', prevSlide);

    // Set card widths
    function setCardWidths() {
      const cardWidth = getCardWidth();
      cards.forEach(card => {
        card.style.minWidth = `${cardWidth}px`;
      });
      updateSlider();
    }

    setCardWidths();
    window.addEventListener('resize', setCardWidths);

    // Auto slide
    let autoSlide = setInterval(nextSlide, 5000);
    sliderTrack.addEventListener('mouseenter', () => clearInterval(autoSlide));
    sliderTrack.addEventListener('mouseleave', () => {
      autoSlide = setInterval(nextSlide, 5000);
    });
  }

  // ---------- Solar Calculator ----------
  const calcForm = document.getElementById('calcForm');
  if (calcForm) {
    calcForm.addEventListener('submit', function (e) {
      e.preventDefault();
      calculateSavings();
    });
  }

  function calculateSavings() {
    const monthlyBill = parseFloat(document.getElementById('monthlyBill').value) || 0;
    const roofArea = parseFloat(document.getElementById('roofArea').value) || 0;
    const solarKW = parseFloat(document.getElementById('solarKWSelect').value) || 0;

    if (monthlyBill === 0 && solarKW === 0) {
      alert('Please enter your monthly bill or select solar capacity');
      return;
    }

    // Approximate calculations for Indian context
    const avgRatePerUnit = 8.5; // ₹ per unit (average in Maharashtra)
    const monthlyUnits = monthlyBill > 0 ? Math.round(monthlyBill / avgRatePerUnit) : 0;
    
    let recommendedKW;
    if (solarKW > 0) {
      recommendedKW = solarKW;
    } else {
      // Roughly 1 KW produces ~120 units/month in Maharashtra
      recommendedKW = Math.ceil(monthlyUnits / 120);
    }

    const solarGeneration = recommendedKW * 120; // units per month
    const monthlySaving = Math.round(solarGeneration * avgRatePerUnit);
    const annualSaving = monthlySaving * 12;
    
    // Cost calculation (approx ₹45,000-55,000 per KW after subsidy)
    const costPerKW = 50000;
    const totalCost = recommendedKW * costPerKW;
    const subsidyAmount = recommendedKW <= 3 ? Math.min(recommendedKW * 14544, 78000) : 78000;
    const costAfterSubsidy = totalCost - subsidyAmount;
    
    const paybackYears = costAfterSubsidy > 0 ? (costAfterSubsidy / annualSaving).toFixed(1) : 0;
    const co2Saved = (solarGeneration * 12 * 0.82 / 1000).toFixed(1); // tonnes per year

    // Display results
    document.getElementById('calcRecommendedKW').textContent = recommendedKW + ' KW';
    document.getElementById('calcMonthlySaving').textContent = '₹' + monthlySaving.toLocaleString();
    document.getElementById('calcAnnualSaving').textContent = '₹' + annualSaving.toLocaleString();
    document.getElementById('calcSubsidy').textContent = '₹' + subsidyAmount.toLocaleString();
    document.getElementById('calcPayback').textContent = paybackYears + ' Years';
    document.getElementById('calcCO2').textContent = co2Saved + ' Tonnes/Year';

    // Show results
    const resultsDiv = document.querySelector('.calculator-results');
    resultsDiv.style.display = 'block';
  }

  // ---------- Enquiry Form → WhatsApp ----------
  const enquiryForm = document.getElementById('enquiryForm');
  if (enquiryForm) {
    enquiryForm.addEventListener('submit', function (e) {
      e.preventDefault();
      sendWhatsApp();
    });
  }

  function sendWhatsApp() {
    const name = document.getElementById('enqName').value.trim();
    const phone = document.getElementById('enqPhone').value.trim();
    const kw = document.getElementById('enqKW').value;
    const message = document.getElementById('enqMessage').value.trim();

    if (!name || !phone) {
      alert('Please enter your name and phone number');
      return;
    }

    const whatsappMessage = encodeURIComponent(
      `Hello Solar Setu Energy,\n\nMy Name: ${name}\nPhone Number: ${phone}\nInterested Solar Capacity: ${kw}\nMessage: ${message || 'N/A'}\n\nPlease share details about solar installation.`
    );

    const whatsappURL = `https://wa.me/919922016004?text=${whatsappMessage}`;
    window.open(whatsappURL, '_blank');
  }

  // ---------- Floating WhatsApp Button ----------
  const whatsappFloat = document.querySelector('.whatsapp-float-btn');
  if (whatsappFloat) {
    whatsappFloat.addEventListener('click', function () {
      const msg = encodeURIComponent('Hello Solar Setu Energy! I am interested in solar installation. Please share details.');
      window.open(`https://wa.me/919922016004?text=${msg}`, '_blank');
    });
  }

  // ---------- Active Nav Link Highlight ----------
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-links a:not(.navbar-cta)');

  function highlightNav() {
    const scrollY = window.scrollY + 100;
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav);

  // ---------- Navbar link active style ----------
  const style = document.createElement('style');
  style.textContent = `.navbar-links a.active { color: var(--primary-red-light) !important; } .navbar-links a.active::after { width: 100% !important; }`;
  document.head.appendChild(style);

});
