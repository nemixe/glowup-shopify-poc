/* ========================================
   GlowUp Skincare — Scroll Animations (jQuery)
   ======================================== */

(function($) {
  'use strict';

  // Animate on Scroll
  function initScrollAnimations() {
    var elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    var observer = new IntersectionObserver(function(entries) {
      entries.forEach(function(entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    elements.forEach(function(el) { observer.observe(el); });
  }

  // Sticky Header Shadow
  function initStickyHeader() {
    var header = document.querySelector('.site-header');
    if (!header) return;
    window.addEventListener('scroll', function() {
      header.classList.toggle('is-scrolled', window.scrollY > 50);
    });
  }

  // Smooth Scroll for anchor links
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
      anchor.addEventListener('click', function(e) {
        var target = document.querySelector(this.getAttribute('href'));
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  // Mobile Menu Toggle
  function initMobileMenu() {
    var overlay = document.querySelector('.mobile-menu-overlay');
    var menu = document.querySelector('.mobile-menu');
    var openBtn = document.querySelector('.mobile-menu-open');
    var closeBtn = document.querySelector('.mobile-menu-close');
    if (!menu || !overlay) return;

    function open() { overlay.classList.add('is-open'); menu.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function close() { overlay.classList.remove('is-open'); menu.classList.remove('is-open'); document.body.style.overflow = ''; }

    if (openBtn) openBtn.addEventListener('click', open);
    if (closeBtn) closeBtn.addEventListener('click', close);
    overlay.addEventListener('click', close);
    document.addEventListener('keydown', function(e) { if (e.key === 'Escape') close(); });
  }

  // Quantity buttons on product pages (AJAX)
  function initQuantityButtons() {
    document.querySelectorAll('.qty-btn').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var input = this.parentElement.querySelector('input[name="quantity"]');
        if (!input) return;
        var val = parseInt(input.value) + parseInt(this.dataset.delta);
        if (val >= 1) input.value = val;
      });
    });
  }

  // Initialize everything on DOM ready
  $(document).ready(function() {
    initScrollAnimations();
    initStickyHeader();
    initSmoothScroll();
    initMobileMenu();
    initQuantityButtons();
  });

})(jQuery);
