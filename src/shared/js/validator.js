/**
 * Reusable client-side validation utility
 */
export const validators = {
  required(value) {
    return value.trim() !== '' ? null : 'Поле обязательно для заполнения';
  },
  email(value) {
    if (!value.trim()) return null; // optional or handled by required
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim()) ? null : 'Введите корректный email адрес (например, name@domain.ru)';
  },
  phone(value) {
    if (!value.trim()) return null;
    const phoneRegex = /^[\d\s\+\-\(\)]{10,20}$/;
    return phoneRegex.test(value.trim()) ? null : 'Введите корректный номер телефона (минимум 10 цифр)';
  },
  minLength(min) {
    return (value) => value.trim().length >= min ? null : `Минимальная длина: ${min} символов`;
  }
};

export function validateField(value, rules) {
  for (const rule of rules) {
    const error = rule(value);
    if (error) return error;
  }
  return null;
}

export function initFormValidator(formSelector, successCallback) {
  const form = document.querySelector(formSelector);
  if (!form) return;

  const fields = form.querySelectorAll('[data-validate]');

  fields.forEach(field => {
    const isCheckbox = field.type === 'checkbox';
    const rulesNames = field.getAttribute('data-validate').split(' ');
    const rules = rulesNames.map(name => {
      if (name === 'required') return validators.required;
      if (name === 'email') return validators.email;
      if (name === 'phone') return validators.phone;
      if (name.startsWith('min:')) {
        const min = parseInt(name.split(':')[1], 10);
        return validators.minLength(min);
      }
      return null;
    }).filter(Boolean);

    const validate = () => {
      let errorMsg = null;
      if (isCheckbox) {
        if (rulesNames.includes('required') && !field.checked) {
          errorMsg = 'Необходимо согласие на обработку данных';
        }
      } else {
        errorMsg = validateField(field.value, rules);
      }

      const formGroup = field.closest('.form-group') || field.closest('.form-group--checkbox-custom') || field.parentElement;
      let errorEl = formGroup.querySelector('.form-error');

      if (errorMsg) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        if (!errorEl) {
          errorEl = document.createElement('div');
          errorEl.className = 'form-error';
          formGroup.appendChild(errorEl);
        }
        errorEl.textContent = errorMsg;
        return false;
      } else {
        field.classList.remove('is-invalid');
        if (!isCheckbox && field.value.trim() !== '') {
          field.classList.add('is-valid');
        } else {
          field.classList.remove('is-valid');
        }
        if (errorEl) {
          errorEl.remove();
        }
        return true;
      }
    };

    if (isCheckbox) {
      field.addEventListener('change', validate);
    } else {
      field.addEventListener('blur', validate);
      field.addEventListener('input', () => {
        if (field.classList.contains('is-invalid')) {
          validate();
        }
      });
    }
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    fields.forEach(field => {
      const isCheckbox = field.type === 'checkbox';
      const rulesNames = field.getAttribute('data-validate').split(' ');
      const rules = rulesNames.map(name => {
        if (name === 'required') return validators.required;
        if (name === 'email') return validators.email;
        if (name === 'phone') return validators.phone;
        if (name.startsWith('min:')) {
          const min = parseInt(name.split(':')[1], 10);
          return validators.minLength(min);
        }
        return null;
      }).filter(Boolean);

      let errorMsg = null;
      if (isCheckbox) {
        if (rulesNames.includes('required') && !field.checked) {
          errorMsg = 'Необходимо согласие на обработку данных';
        }
      } else {
        errorMsg = validateField(field.value, rules);
      }

      const formGroup = field.closest('.form-group') || field.closest('.form-group--checkbox-custom') || field.parentElement;
      let errorEl = formGroup.querySelector('.form-error');

      if (errorMsg) {
        field.classList.add('is-invalid');
        field.classList.remove('is-valid');
        if (!errorEl) {
          errorEl = document.createElement('div');
          errorEl.className = 'form-error';
          formGroup.appendChild(errorEl);
        }
        errorEl.textContent = errorMsg;
        isValid = false;
      } else {
        field.classList.remove('is-invalid');
        if (errorEl) {
          errorEl.remove();
        }
      }
    });

    if (isValid) {
      if (typeof successCallback === 'function') {
        successCallback(form);
      }
    }
  });
}
