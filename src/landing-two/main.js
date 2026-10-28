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

    const navLinks = navigation.querySelectorAll('.header__nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => toggleMenu(false));
    });
  }

  // Services Carousel Infinite Loop Scroll Controls targeting .services__carousel-wrapper
  const carouselWrapper = document.querySelector('.services__carousel-wrapper');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');

  if (carouselWrapper && prevBtn && nextBtn) {
    const scrollAmount = 408;

    nextBtn.addEventListener('click', () => {
      if (carouselWrapper.scrollLeft + carouselWrapper.clientWidth >= carouselWrapper.scrollWidth - 10) {
        carouselWrapper.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        carouselWrapper.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    });

    prevBtn.addEventListener('click', () => {
      if (carouselWrapper.scrollLeft <= 10) {
        carouselWrapper.scrollTo({ left: carouselWrapper.scrollWidth, behavior: 'smooth' });
      } else {
        carouselWrapper.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      }
    });
  }

  // Interactive Booking Form Validation & Simulation
  initFormValidator('#bookingForm', (form) => {
    const submitBtn = form.querySelector('.booking-btn-submit, .form-submit');
    const successMsg = form.querySelector('#bookingSuccess');
    
    if (submitBtn) {
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Отправка заявки...';

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
        form.reset();

        form.querySelectorAll('.form-input, .form-input-custom').forEach(input => {
          input.classList.remove('is-valid', 'is-invalid');
        });

        if (successMsg) {
          successMsg.style.display = 'block';
          setTimeout(() => {
            successMsg.style.display = 'none';
          }, 5000);
        }
      }, 1200);
    }
  });
});
