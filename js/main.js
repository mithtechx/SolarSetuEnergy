/* ============================================
   SOLAR SETU ENERGY - Modern JavaScript
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {

  // ============== NAVBAR SCROLL EFFECT ==============
  const navbar = document.querySelector('.navbar');
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ============== MOBILE MENU ==============
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  
  // Create mobile menu dynamically
  function createMobileMenu() {
    const mobileMenu = document.createElement('div');
    mobileMenu.className = 'mobile-menu';
    mobileMenu.innerHTML = `
      <a href="#home">Home</a>
      <a href="#about">About</a>
      <a href="#services">Services</a>
      <a href="#subsidy">Subsidy</a>
      <a href="#projects">Projects</a>
      <a href="#contact">Contact</a>
      <a href="#enquiry" class="mobile-cta">Get Free Quote</a>
    `;
    document.body.appendChild(mobileMenu);

    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileMenu.classList.toggle('active');
    });

    // Close menu when clicking links
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileMenu.classList.remove('active');
      });
    });
  }
  
  createMobileMenu();

  // ============== SMOOTH SCROLL ==============
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      e.preventDefault();
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        const offset = 80;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.scrollY - offset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ============== SOLAR CALCULATOR ==============
  function calculateSavings() {
    const bill = parseFloat(document.getElementById('monthlyBill')?.value) || 3000;
    
    // Rough calculation for Maharashtra
    const units = Math.round(bill / 8.5);
    const recommendedKW = Math.ceil(units / 130);
    
    const monthlySaving = Math.round(recommendedKW * 130 * 8);
    const annualSaving = monthlySaving * 12;
    const subsidy = recommendedKW <= 3 ? recommendedKW * 14544 : 78000;
    
    alert(`✅ Your Estimated Savings:\n\n` +
          `Recommended System: ${recommendedKW} KW\n` +
          `Monthly Saving: ₹${monthlySaving.toLocaleString()}\n` +
          `Annual Saving: ₹${annualSaving.toLocaleString()}\n` +
          `Government Subsidy: ₹${subsidy.toLocaleString()}\n\n` +
          `Contact us for exact proposal!`);
  }

  // Make calculateSavings available globally
  window.calculateSavings = calculateSavings;

  // ============== WHATSAPP ENQUIRY ==============
  function sendToWhatsApp() {
    const name = document.getElementById('enqName')?.value || "Customer";
    const phone = document.getElementById('enqPhone')?.value || "";
    const kw = document.getElementById('enqKW')?.value || "Not Sure";

    if (!phone) {
      alert("Please enter your phone number");
      return;
    }

    const message = `Hello Solar Setu Energy!%0A%0A` +
                    `Name: ${name}%0A` +
                    `Phone: ${phone}%0A` +
                    `Interested Capacity: ${kw} KW%0A%0A` +
                    `Please send me details & quotation.`;

    window.open(`https://wa.me/919922016004?text=${message}`, '_blank');
  }

  window.sendToWhatsApp = sendToWhatsApp;

  // ============== BACK TO TOP ==============
  const backToTop = document.createElement('button');
  backToTop.className = 'back-to-top';
  backToTop.innerHTML = '↑';
  document.body.appendChild(backToTop);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      backToTop.style.opacity = '1';
    } else {
      backToTop.style.opacity = '0';
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ============== ANIMATION ON SCROLL ==============
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section').forEach(section => {
    section.style.transition = 'all 0.8s ease';
    section.style.opacity = '0';
    section.style.transform = 'translateY(40px)';
    observer.observe(section);
  });

  console.log('%c✅ Solar Setu Energy Website Loaded Successfully!', 'color: #e63939; font-size: 16px; font-weight: bold');
});
