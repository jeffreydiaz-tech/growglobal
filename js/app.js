/**
 * GrowGlobal – Main Application Controller
 * Academic Course: 25CS208 – Web Technology
 * Coordinates UI navigation, mobile drawer, accordions, modals, toast system,
 * currency converter, contact form, and dashboard interactions.
 */

(function () {
  'use strict';

  /**
   * 1. Toast Notification System
   */
  function showToast(message, type = 'info', title = '') {
    let container = document.querySelector('.toast-container');
    if (!container) {
      container = document.createElement('div');
      container.className = 'toast-container';
      document.body.appendChild(container);
    }

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;

    let iconSvg = '';
    let defaultTitle = 'Notification';

    if (type === 'success') {
      defaultTitle = 'Success';
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
    } else if (type === 'error') {
      defaultTitle = 'Error';
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-danger)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>`;
    } else {
      iconSvg = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--color-info)" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>`;
    }

    toast.innerHTML = `
      <div class="toast-icon">${iconSvg}</div>
      <div class="toast-content">
        <div class="toast-title">${title || defaultTitle}</div>
        <div class="toast-message">${escapeHtml(message)}</div>
      </div>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateX(100%)';
      setTimeout(() => toast.remove(), 300);
    }, 4500);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  /**
   * 2. Mobile Hamburger Navigation
   */
  function initMobileNav() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const mobileDrawer = document.getElementById('mobileNavDrawer');
    if (!hamburgerBtn || !mobileDrawer) return;

    hamburgerBtn.addEventListener('click', function () {
      const isOpen = hamburgerBtn.classList.toggle('active');
      mobileDrawer.classList.toggle('open', isOpen);
      hamburgerBtn.setAttribute('aria-expanded', isOpen);
    });

    // Close drawer when clicking any link
    mobileDrawer.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        hamburgerBtn.classList.remove('active');
        mobileDrawer.classList.remove('open');
        hamburgerBtn.setAttribute('aria-expanded', false);
      });
    });
  }

  /**
   * 3. FAQ Accordion
   */
  function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach((btn) => {
      btn.addEventListener('click', function () {
        const item = this.closest('.accordion-item');
        const isActive = item.classList.contains('active');

        // Close peer accordions in the same list
        const parent = item.parentElement;
        if (parent) {
          parent.querySelectorAll('.accordion-item').forEach((other) => {
            other.classList.remove('active');
          });
        }

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }

  /**
   * 4. Modal System (Custom Bundle Modal, Calculator Modal, Add Product Modal)
   */
  function initModals() {
    // Open buttons
    document.querySelectorAll('[data-open-modal]').forEach((btn) => {
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const modalId = this.getAttribute('data-open-modal');
        const modalBackdrop = document.getElementById(modalId);
        if (modalBackdrop) {
          modalBackdrop.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close buttons & Backdrop clicks
    document.querySelectorAll('.modal-backdrop').forEach((backdrop) => {
      backdrop.addEventListener('click', function (e) {
        if (e.target === this || e.target.closest('[data-close-modal]')) {
          this.classList.remove('open');
          document.body.style.overflow = '';
        }
      });
    });

    // Close on Escape key
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop.open').forEach((backdrop) => {
          backdrop.classList.remove('open');
          document.body.style.overflow = '';
        });
      }
    });
  }

  /**
   * 5. Contact Form Handler (index.html)
   */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      const nameInput = document.getElementById('contactName');
      const emailInput = document.getElementById('contactEmail');
      const serviceSelect = document.getElementById('contactService');
      const messageInput = document.getElementById('contactMessage');
      const submitBtn = document.getElementById('contactSubmitBtn');

      // Validation
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!nameInput.value.trim() || nameInput.value.trim().length < 2) {
        showToast('Please enter your full name.', 'error');
        nameInput.focus();
        return;
      }
      if (!emailRegex.test(emailInput.value.trim())) {
        showToast('Please enter a valid email address.', 'error');
        emailInput.focus();
        return;
      }
      if (!messageInput.value.trim() || messageInput.value.trim().length < 5) {
        showToast('Please enter a descriptive message (min 5 chars).', 'error');
        messageInput.focus();
        return;
      }

      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Sending Inquiry...';
      }

      const inquiryData = {
        customerName: nameInput.value.trim(),
        email: emailInput.value.trim(),
        subject: serviceSelect ? serviceSelect.value : 'General Inquiry',
        package: serviceSelect ? serviceSelect.value : 'Website Consultation',
        message: messageInput.value.trim(),
        location: 'Direct Website Contact'
      };

      if (window.GrowGlobalStorage) {
        window.GrowGlobalStorage.addInquiry(inquiryData);
      }

      setTimeout(() => {
        showToast('Your inquiry has been submitted successfully! Our team will reach out within 24 hours.', 'success');
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Send Inquiry';
        }
      }, 700);
    });
  }

  /**
   * 6. Custom Bundle Inquiry Modal Form
   */
  function initBundleForm() {
    const form = document.getElementById('bundleQuoteForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('bundleName')?.value.trim();
      const email = document.getElementById('bundleEmail')?.value.trim();
      const hours = document.getElementById('bundleHours')?.value || '10';
      const notes = document.getElementById('bundleNotes')?.value.trim() || 'Custom features request';

      const estCost = 9999 + Number(hours) * 800;

      if (window.GrowGlobalStorage) {
        window.GrowGlobalStorage.addInquiry({
          customerName: name,
          email: email,
          subject: `Custom Bundle (${hours} hrs dev addon)`,
          package: `Custom Bundle (Est. ₹${estCost.toLocaleString('en-IN')})`,
          message: notes,
          location: 'Custom Bundle Modal'
        });
      }

      showToast(`Custom quote inquiry submitted! Estimated proposal: ₹${estCost.toLocaleString('en-IN')}`, 'success');

      // Close modal
      const modal = document.getElementById('customBundleModal');
      if (modal) modal.classList.remove('open');
      document.body.style.overflow = '';
      form.reset();
    });
  }

  /**
   * 7. Multi-Currency Selector on Pricing Cards
   */
  function initCurrencySwitcher() {
    const currencySelect = document.getElementById('pricingCurrencySelect');
    if (!currencySelect || !window.GrowGlobalAPI) return;

    currencySelect.addEventListener('change', function () {
      const selectedCurrency = this.value;
      const prices = [
        { id: 'priceBasic', inr: 4999 },
        { id: 'priceStandard', inr: 9999 },
        { id: 'pricePremium', inr: 14999 }
      ];

      prices.forEach((item) => {
        const el = document.getElementById(item.id);
        if (el) {
          if (selectedCurrency === 'INR') {
            el.innerHTML = `₹${item.inr.toLocaleString('en-IN')} <span>/ project</span>`;
          } else {
            const converted = window.GrowGlobalAPI.convertINR(item.inr, selectedCurrency);
            el.innerHTML = `${converted} <span>/ project</span>`;
          }
        }
      });
    });
  }

  /**
   * 8. Business Dashboard Controller (home.html)
   */
  function initDashboard() {
    const isDashboard = document.querySelector('.dashboard-layout');
    if (!isDashboard || !window.GrowGlobalStorage) return;

    // Load active session
    const session = window.GrowGlobalStorage.getSession();
    const userDisplay = document.getElementById('dashUserName');
    const businessDisplay = document.getElementById('dashBusinessName');

    if (userDisplay && session) {
      userDisplay.textContent = session.fullName || 'Business Owner';
    }
    if (businessDisplay && session) {
      businessDisplay.textContent = session.businessName || 'Local Business Brand';
    }

    // Mobile sidebar drawer toggle
    const toggleSidebarBtn = document.getElementById('dashSidebarToggle');
    const sidebar = document.querySelector('.dashboard-sidebar');
    const backdrop = document.querySelector('.dashboard-sidebar-backdrop');

    if (toggleSidebarBtn && sidebar && backdrop) {
      toggleSidebarBtn.addEventListener('click', () => {
        sidebar.classList.add('open');
        backdrop.classList.add('open');
      });

      backdrop.addEventListener('click', () => {
        sidebar.classList.remove('open');
        backdrop.classList.remove('open');
      });
    }

    // Render Products Table
    function renderProducts() {
      const tableBody = document.getElementById('dashProductsTableBody');
      const countDisplay = document.getElementById('dashProductsCount');
      if (!tableBody) return;

      const products = window.GrowGlobalStorage.getProducts();
      if (countDisplay) countDisplay.textContent = products.length;

      if (products.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding: 2rem;">No products added yet. Click "Add Product" to create one.</td></tr>`;
        return;
      }

      tableBody.innerHTML = '';
      products.forEach((prod) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td><strong>${escapeHtml(prod.image || '📦')} ${escapeHtml(prod.name)}</strong></td>
          <td>${escapeHtml(prod.category)}</td>
          <td>₹${Number(prod.price).toLocaleString('en-IN')}</td>
          <td><span class="badge ${prod.status === 'Active' ? 'badge-success' : 'badge-warning'}">${escapeHtml(prod.status)}</span></td>
          <td>
            <button class="btn btn-ghost btn-sm delete-prod-btn" data-id="${prod.id}" title="Remove Product" style="color: var(--color-danger);">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      // Bind delete buttons
      tableBody.querySelectorAll('.delete-prod-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
          const id = this.getAttribute('data-id');
          if (confirm('Are you sure you want to delete this product?')) {
            window.GrowGlobalStorage.deleteProduct(id);
            renderProducts();
            showToast('Product removed successfully.', 'info');
          }
        });
      });
    }

    // Render Inquiries Table
    function renderInquiries() {
      const tableBody = document.getElementById('dashInquiriesTableBody');
      const countDisplay = document.getElementById('dashInquiriesCount');
      if (!tableBody) return;

      const inquiries = window.GrowGlobalStorage.getInquiries();
      if (countDisplay) countDisplay.textContent = inquiries.length;

      if (inquiries.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="5" class="text-center text-muted" style="padding: 2rem;">No inquiries received yet.</td></tr>`;
        return;
      }

      tableBody.innerHTML = '';
      inquiries.forEach((inq) => {
        const row = document.createElement('tr');
        row.innerHTML = `
          <td>
            <div class="font-semibold">${escapeHtml(inq.customerName)}</div>
            <div class="text-xs text-muted">${escapeHtml(inq.email)}</div>
          </td>
          <td>${escapeHtml(inq.location || 'Global')}</td>
          <td>${escapeHtml(inq.package || inq.subject)}</td>
          <td>
            <span class="badge ${inq.status === 'New' ? 'badge-warning' : inq.status === 'Replied' ? 'badge-success' : 'badge-primary'}">
              ${escapeHtml(inq.status)}
            </span>
          </td>
          <td>
            <button class="btn btn-secondary btn-sm view-inq-btn" data-inq='${JSON.stringify(inq)}'>
              View Details
            </button>
          </td>
        `;
        tableBody.appendChild(row);
      });

      // Bind view inquiry modal
      tableBody.querySelectorAll('.view-inq-btn').forEach((btn) => {
        btn.addEventListener('click', function () {
          try {
            const data = JSON.parse(this.getAttribute('data-inq'));
            alert(`Customer: ${data.customerName}\nEmail: ${data.email}\nLocation: ${data.location}\nPackage/Subject: ${data.subject}\n\nMessage:\n${data.message}`);
          } catch (e) {
            console.error(e);
          }
        });
      });
    }

    // Add Product Modal Handler
    const addProductForm = document.getElementById('addProductForm');
    if (addProductForm) {
      addProductForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const name = document.getElementById('prodName')?.value.trim();
        const category = document.getElementById('prodCategory')?.value || 'General';
        const price = document.getElementById('prodPrice')?.value || '0';
        const status = document.getElementById('prodStatus')?.value || 'Active';
        const icon = document.getElementById('prodIcon')?.value || '📦';

        if (!name) {
          showToast('Product name is required.', 'error');
          return;
        }

        window.GrowGlobalStorage.addProduct({
          name,
          category,
          price,
          status,
          image: icon
        });

        showToast(`Product "${name}" added to showcase!`, 'success');
        addProductForm.reset();

        const modal = document.getElementById('addProductModal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';

        renderProducts();
      });
    }

    // Logout Handler
    const logoutBtn = document.getElementById('dashLogoutBtn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (confirm('Are you sure you want to sign out of the dashboard?')) {
          window.GrowGlobalStorage.clearSession();
          showToast('Signed out successfully.', 'info');
          setTimeout(() => {
            window.location.href = 'signin.html';
          }, 500);
        }
      });
    }

    // Initial render
    renderProducts();
    renderInquiries();
  }

  // Initialize all components when DOM is ready
  document.addEventListener('DOMContentLoaded', function () {
    initMobileNav();
    initAccordions();
    initModals();
    initContactForm();
    initBundleForm();
    initCurrencySwitcher();
    initDashboard();
  });

  window.GrowGlobalApp = {
    showToast,
    escapeHtml
  };
})();
