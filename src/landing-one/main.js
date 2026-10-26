import { initFormValidator } from '../shared/js/validator.js';

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Burger Menu & Smooth Morphing Animation
  const burgerBtn = document.getElementById('burgerBtn');
  const navigation = document.getElementById('navigation');

  function toggleMenu(open) {
    const isOpen = open !== undefined ? open : !navigation.classList.contains('is-open');
    if (isOpen) {
      navigation.classList.add('is-open');
      burgerBtn.classList.add('is-active');
      burgerBtn.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    } else {
      navigation.classList.remove('is-open');
      burgerBtn.classList.remove('is-active');
      burgerBtn.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  }

  if (burgerBtn && navigation) {
    burgerBtn.addEventListener('click', () => toggleMenu());

    // Close menu when clicking on nav links or CTA inside menu
    const navLinks = navigation.querySelectorAll('.header__nav-link, .header__nav-cta');
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // Contact Form Validation & Submission Simulation
  initFormValidator('#contactForm', (form) => {
    const submitBtn = form.querySelector('.form-submit');
    const successMsg = form.querySelector('#formSuccess');
    
    submitBtn.disabled = true;
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Отправка...';

    setTimeout(() => {
      submitBtn.disabled = false;
      submitBtn.textContent = originalText;
      form.reset();

      form.querySelectorAll('.form-input').forEach(input => {
        input.classList.remove('is-valid', 'is-invalid');
      });

      if (successMsg) {
        successMsg.style.display = 'block';
        setTimeout(() => {
          successMsg.style.display = 'none';
        }, 5000);
      }
    }, 1200);
  });
});
