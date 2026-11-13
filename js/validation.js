/**
 * GrowGlobal – Form Validation Module
 * Academic Course: 25CS208 – Web Technology
 * Implements strict JavaScript Regex validation with real-time inline feedback
 * and form submission guards.
 */

(function () {
  'use strict';

  // Master Regular Expression Rules as specified in academic syllabus
  const VALIDATION_RULES = {
    // Full Name: Letters and spaces only, 2 to 50 characters
    fullName: /^[a-zA-Z\s]{2,50}$/,

    // Employee / Register ID: Alphanumeric 6 to 12 chars
    employeeId: /^[A-Z0-9]{6,12}$/i,

    // Standard RFC-compliant Email Regex
    email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,

    // Indian Standard Mobile Number: Starts with 6,7,8,9 followed by 9 digits
    mobile: /^[6-9]\d{9}$/,

    // Password: Min 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special character
    password: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^])[A-Za-z\d@$!%*?&#^]{8,}$/
  };

  const ERROR_MESSAGES = {
    fullName: 'Full name must contain 2–50 alphabetic characters and spaces only.',
    employeeId: 'Register/Employee ID must be 6–12 alphanumeric characters (e.g., EMP102948).',
    email: 'Please enter a valid email address (e.g., user@domain.com).',
    mobile: 'Mobile number must be a valid 10-digit number starting with 6, 7, 8, or 9.',
    division: 'Please select your business division or region.',
    password: 'Password must be at least 8 characters with 1 uppercase, 1 lowercase, 1 number, and 1 special symbol.',
    confirmPassword: 'Passwords do not match.',
    terms: 'You must agree to the Terms of Service and Privacy Policy.',
    required: 'This field is required.'
  };

  /**
   * Helper to set input validity visual cues and feedback message.
   */
  function setFieldState(inputEl, isValid, errorMessage = '') {
    if (!inputEl) return;

    const formGroup = inputEl.closest('.form-group') || inputEl.parentElement;
    let errorEl = formGroup.querySelector('.invalid-feedback');
    let successEl = formGroup.querySelector('.valid-feedback');

    // Create feedback containers dynamically if missing
    if (!errorEl) {
      errorEl = document.createElement('div');
      errorEl.className = 'invalid-feedback';
      formGroup.appendChild(errorEl);
    }
    if (!successEl) {
      successEl = document.createElement('div');
      successEl.className = 'valid-feedback';
      successEl.textContent = 'Looks good!';
      formGroup.appendChild(successEl);
    }

    if (isValid) {
      inputEl.classList.remove('is-invalid');
      inputEl.classList.add('is-valid');
      errorEl.textContent = '';
      errorEl.style.display = 'none';
      successEl.style.display = 'block';
    } else {
      inputEl.classList.remove('is-valid');
      inputEl.classList.add('is-invalid');
      errorEl.textContent = errorMessage;
      errorEl.style.display = 'block';
      successEl.style.display = 'none';
    }
  }

  /**
   * Calculate password strength score (0 to 3).
   */
  function evaluatePasswordStrength(password) {
    if (!password) return 0;
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password) && /[a-z]/.test(password)) score++;
    if (/\d/.test(password) && /[@$!%*?&#^]/.test(password)) score++;
    return score;
  }

  /**
   * Initialize Registration Form Validation (register.html)
   */
  function initRegistrationForm() {
    const form = document.getElementById('registrationForm');
    if (!form) return;

    const submitBtn = document.getElementById('registerSubmitBtn');
    const fullNameInput = document.getElementById('regFullName');
    const employeeIdInput = document.getElementById('regEmployeeId');
    const emailInput = document.getElementById('regEmail');
    const mobileInput = document.getElementById('regMobile');
    const divisionSelect = document.getElementById('regDivision');
    const passwordInput = document.getElementById('regPassword');
    const confirmPasswordInput = document.getElementById('regConfirmPassword');
    const strengthProgress = document.getElementById('passwordStrengthProgress');

    const fieldStatus = {
      fullName: false,
      employeeId: false,
      email: false,
      mobile: false,
      division: false,
      password: false,
      confirmPassword: false
    };

    function checkFormValidity() {
      const allValid = Object.values(fieldStatus).every(Boolean);
      if (submitBtn) {
        submitBtn.disabled = !allValid;
      }
      return allValid;
    }

    // Full Name
    fullNameInput?.addEventListener('input', function () {
      const val = this.value.trim();
      const valid = VALIDATION_RULES.fullName.test(val);
      fieldStatus.fullName = valid;
      setFieldState(this, valid, ERROR_MESSAGES.fullName);
      checkFormValidity();
    });

    // Employee ID
    employeeIdInput?.addEventListener('input', function () {
      const val = this.value.trim();
      const valid = VALIDATION_RULES.employeeId.test(val);
      fieldStatus.employeeId = valid;
      setFieldState(this, valid, ERROR_MESSAGES.employeeId);
      checkFormValidity();
    });

    // Email
    emailInput?.addEventListener('input', function () {
      const val = this.value.trim();
      const valid = VALIDATION_RULES.email.test(val);
      fieldStatus.email = valid;
      setFieldState(this, valid, ERROR_MESSAGES.email);
      checkFormValidity();
    });

    // Mobile Number
    mobileInput?.addEventListener('input', function () {
      const val = this.value.trim();
      const valid = VALIDATION_RULES.mobile.test(val);
      fieldStatus.mobile = valid;
      setFieldState(this, valid, ERROR_MESSAGES.mobile);
      checkFormValidity();
    });

    // Division Selection
    divisionSelect?.addEventListener('change', function () {
      const valid = this.value !== '' && this.value !== 'select';
      fieldStatus.division = valid;
      setFieldState(this, valid, ERROR_MESSAGES.division);
      checkFormValidity();
    });

    // Password
    passwordInput?.addEventListener('input', function () {
      const val = this.value;
      const valid = VALIDATION_RULES.password.test(val);
      fieldStatus.password = valid;
      setFieldState(this, valid, ERROR_MESSAGES.password);

      // Update strength bar
      if (strengthProgress) {
        const strength = evaluatePasswordStrength(val);
        strengthProgress.className = 'password-strength-progress';
        if (strength === 1) strengthProgress.classList.add('strength-weak');
        else if (strength === 2) strengthProgress.classList.add('strength-medium');
        else if (strength === 3) strengthProgress.classList.add('strength-strong');
      }

      // Revalidate confirm password if already typed
      if (confirmPasswordInput && confirmPasswordInput.value.length > 0) {
        const matches = confirmPasswordInput.value === val;
        fieldStatus.confirmPassword = matches;
        setFieldState(confirmPasswordInput, matches, ERROR_MESSAGES.confirmPassword);
      }

      checkFormValidity();
    });

    // Confirm Password
    confirmPasswordInput?.addEventListener('input', function () {
      const val = this.value;
      const matches = val.length > 0 && val === (passwordInput ? passwordInput.value : '');
      fieldStatus.confirmPassword = matches;
      setFieldState(this, matches, ERROR_MESSAGES.confirmPassword);
      checkFormValidity();
    });

    // Initial check (starts disabled)
    checkFormValidity();

    // Form Submission
    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!checkFormValidity()) return;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Creating Account...';

      try {
        const userObj = {
          fullName: fullNameInput.value.trim(),
          employeeId: employeeIdInput.value.trim().toUpperCase(),
          email: emailInput.value.trim(),
          mobile: mobileInput.value.trim(),
          division: divisionSelect.value,
          password: passwordInput.value
        };

        if (window.GrowGlobalStorage) {
          await window.GrowGlobalStorage.registerUser(userObj);
          window.GrowGlobalStorage.setSession(userObj);
        }

        if (window.GrowGlobalApp && window.GrowGlobalApp.showToast) {
          window.GrowGlobalApp.showToast('Registration Successful! Redirecting to Sign In...', 'success');
        }

        setTimeout(() => {
          window.location.href = 'signin.html?registered=true';
        }, 1200);
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = 'Register Business Account';
        if (window.GrowGlobalApp && window.GrowGlobalApp.showToast) {
          window.GrowGlobalApp.showToast(err.message || 'Registration failed.', 'error');
        } else {
          alert(err.message);
        }
      }
    });
  }

  /**
   * Initialize Sign-Up Form Validation (signup.html)
   */
  function initSignUpForm() {
    const form = document.getElementById('signupForm');
    if (!form) return;

    const emailInput = document.getElementById('signupEmail');
    const passwordInput = document.getElementById('signupPassword');
    const confirmPasswordInput = document.getElementById('signupConfirmPassword');
    const termsCheck = document.getElementById('signupTerms');
    const submitBtn = document.getElementById('signupSubmitBtn');

    function validate() {
      const emailValid = VALIDATION_RULES.email.test(emailInput.value.trim());
      const passValid = VALIDATION_RULES.password.test(passwordInput.value);
      const confirmValid = confirmPasswordInput.value === passwordInput.value && confirmPasswordInput.value.length > 0;
      const termsValid = termsCheck ? termsCheck.checked : true;

      setFieldState(emailInput, emailValid, ERROR_MESSAGES.email);
      setFieldState(passwordInput, passValid, ERROR_MESSAGES.password);
      setFieldState(confirmPasswordInput, confirmValid, ERROR_MESSAGES.confirmPassword);

      const isValid = emailValid && passValid && confirmValid && termsValid;
      if (submitBtn) submitBtn.disabled = !isValid;
      return isValid;
    }

    emailInput?.addEventListener('input', validate);
    passwordInput?.addEventListener('input', validate);
    confirmPasswordInput?.addEventListener('input', validate);
    termsCheck?.addEventListener('change', validate);

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      if (!validate()) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Setting up...';

      try {
        const userObj = {
          fullName: 'Registered User',
          email: emailInput.value.trim(),
          password: passwordInput.value,
          division: 'General'
        };

        if (window.GrowGlobalStorage) {
          await window.GrowGlobalStorage.registerUser(userObj);
          window.GrowGlobalStorage.setSession(userObj);
        }

        if (window.GrowGlobalApp && window.GrowGlobalApp.showToast) {
          window.GrowGlobalApp.showToast('Account created! Navigating to dashboard...', 'success');
        }

        setTimeout(() => {
          window.location.href = 'home.html';
        }, 1000);
      } catch (err) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Create Free Account';
        if (window.GrowGlobalApp && window.GrowGlobalApp.showToast) {
          window.GrowGlobalApp.showToast(err.message, 'error');
        }
      }
    });
  }

  /**
   * Initialize Sign-In Form (signin.html)
   */
  function initSignInForm() {
    const form = document.getElementById('signinForm');
    if (!form) return;

    const emailInput = document.getElementById('signinEmail');
    const passwordInput = document.getElementById('signinPassword');
    const submitBtn = document.getElementById('signinSubmitBtn');

    form.addEventListener('submit', async function (e) {
      e.preventDefault();

      const email = emailInput.value.trim();
      const password = passwordInput.value;

      const emailValid = VALIDATION_RULES.email.test(email);
      const passValid = password.length >= 6;

      setFieldState(emailInput, emailValid, 'Please enter a valid email.');
      setFieldState(passwordInput, passValid, 'Password cannot be empty.');

      if (!emailValid || !passValid) return;

      submitBtn.disabled = true;
      submitBtn.textContent = 'Verifying...';

      if (window.GrowGlobalStorage) {
        const user = await window.GrowGlobalStorage.authenticateUser(email, password);
        if (user) {
          window.GrowGlobalStorage.setSession(user);
          if (window.GrowGlobalApp && window.GrowGlobalApp.showToast) {
            window.GrowGlobalApp.showToast(`Welcome back, ${user.fullName}!`, 'success');
          }
          setTimeout(() => {
            window.location.href = 'home.html';
          }, 800);
          return;
        }
      }

      // If authentication failed
      submitBtn.disabled = false;
      submitBtn.textContent = 'Sign In to Dashboard';
      setFieldState(passwordInput, false, 'Invalid email or password combination. Try demo: demo@growglobal.com / GrowGlobal@2026');
      if (window.GrowGlobalApp && window.GrowGlobalApp.showToast) {
        window.GrowGlobalApp.showToast('Authentication failed. Check credentials.', 'error');
      }
    });
  }

  /**
   * Password Visibility Toggle Helper (Show/Hide)
   */
  function setupPasswordToggles() {
    document.querySelectorAll('.password-toggle-btn').forEach((btn) => {
      btn.addEventListener('click', function () {
        const input = this.parentElement.querySelector('input');
        if (!input) return;

        const isPassword = input.type === 'password';
        input.type = isPassword ? 'text' : 'password';

        this.innerHTML = isPassword
          ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>`
          : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>`;
        this.setAttribute('title', isPassword ? 'Hide Password' : 'Show Password');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initRegistrationForm();
    initSignUpForm();
    initSignInForm();
    setupPasswordToggles();
  });

  window.GrowGlobalValidation = {
    RULES: VALIDATION_RULES,
    MESSAGES: ERROR_MESSAGES,
    setFieldState,
    evaluatePasswordStrength
  };
})();
