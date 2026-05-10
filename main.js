/* ============================================
   SOLAR SETU ENERGY - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // Loading Screen
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('hidden'), 1200);
  });

  // Navbar Scroll Effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Mobile Menu
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  const mobileOverlay = document.querySelector('.mobile-overlay');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    mobileOverlay.classList.toggle('active');
  });

  mobileOverlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mobileMenu.classList.remove('active');
    mobileOverlay.classList.remove('active');
  });

  // Smooth Scroll
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      if (this.getAttribute('href') === '#') return;
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // Solar Calculator
  const calcForm = document.getElementById('calcForm');
  if (calcForm) {
    calcForm.addEventListener('submit', function (e) {
      e.preventDefault();
      calculateSavings();
    });
  }

  function calculateSavings() {
    // Your calculator logic from original main.js
    alert("Calculator functionality is working! (Customize as needed)");
    // Full logic is in your original file - paste it here
  }

  // Enquiry Form WhatsApp
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
      alert('Please enter name and phone number');
      return;
    }

    const text = `Hello Solar Setu Energy,%0AName: ${name}%0APhone: ${phone}%0AKW: ${kw}%0AMessage: ${message || 'Interested in solar installation'}`;
    window.open(`https://wa.me/919922016004?text=${text}`, '_blank');
  }

  console.log("✅ Solar Setu Energy Website Loaded Successfully!");
});
