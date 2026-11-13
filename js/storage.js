/**
 * GrowGlobal – LocalStorage Manager Module
 * Academic Course: 25CS208 – Web Technology
 * Implements robust client-side storage management with error handling and seed data.
 *
 * NOTE ON SECURITY:
 * This is an academic frontend application. Real production applications MUST use
 * secure server-side databases, encrypted sessions, and salted password hashing (e.g., bcrypt/Argon2).
 * Plaintext passwords are not stored in browser storage.
 */

(function () {
  'use strict';

  const STORAGE_KEYS = {
    INQUIRIES: 'growglobal_inquiries',
    PRODUCTS: 'growglobal_products',
    USERS: 'growglobal_users',
    SESSION: 'growglobal_session',
    CALC_HISTORY: 'growglobal_calc_history'
  };

  /**
   * Safe JSON parse with fallback.
   */
  function safeGet(key, defaultValue) {
    try {
      const data = localStorage.getItem(key);
      if (data === null || data === undefined) return defaultValue;
      return JSON.parse(data);
    } catch (e) {
      console.warn(`Failed reading storage key "${key}":`, e);
      return defaultValue;
    }
  }

  /**
   * Safe JSON stringify and set.
   */
  function safeSet(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error(`Failed writing storage key "${key}":`, e);
      return false;
    }
  }

  // --- Initial Seed Data ---
  const DEFAULT_PRODUCTS = [
    {
      id: 'prod-001',
      name: 'Handcrafted Blue Pottery Vase',
      category: 'Home Decor',
      price: 2499,
      status: 'Active',
      inquiriesCount: 18,
      image: '🏺'
    },
    {
      id: 'prod-002',
      name: 'Organic Wild Forest Honey (500g)',
      category: 'Food & Gourmet',
      price: 649,
      status: 'Active',
      inquiriesCount: 32,
      image: '🍯'
    },
    {
      id: 'prod-003',
      name: 'Pure Pashmina Wool Scarf',
      category: 'Apparel',
      price: 4999,
      status: 'Active',
      inquiriesCount: 27,
      image: '🧣'
    },
    {
      id: 'prod-004',
      name: 'Custom Brass Temple Bell',
      category: 'Artisanal Metalware',
      price: 1850,
      status: 'Draft',
      inquiriesCount: 6,
      image: '🔔'
    }
  ];

  const DEFAULT_INQUIRIES = [
    {
      id: 'inq-101',
      customerName: 'Marcus Vance',
      email: 'm.vance@vancetrading.co.uk',
      location: 'London, UK',
      subject: 'Bulk Wholesale for Pashmina Scarves',
      package: 'Premium Global Store',
      message: 'Looking to order 120 units for our winter boutique in London. Please share export catalog and shipping estimates.',
      date: '2026-11-10',
      status: 'New'
    },
    {
      id: 'inq-102',
      customerName: 'Amina Al-Mansoor',
      email: 'amina@dubaiartisans.ae',
      location: 'Dubai, UAE',
      subject: 'Blue Pottery Order for Interior Project',
      package: 'Standard Package',
      message: 'Need 40 ceramic pieces customized for a boutique hotel lobby. Please share dimensions.',
      date: '2026-11-08',
      status: 'In Progress'
    },
    {
      id: 'inq-103',
      customerName: 'Dr. Hiroshi Tanaka',
      email: 'tanaka.h@tokyomarket.jp',
      location: 'Tokyo, Japan',
      subject: 'Organic Forest Honey Sample Inquiry',
      package: 'Basic Package',
      message: 'Interested in retail distribution in Tokyo organic food supermarkets. Requesting certifications.',
      date: '2026-11-05',
      status: 'Replied'
    }
  ];

  // Seed default data if storage is empty
  function seedInitialData() {
    if (!localStorage.getItem(STORAGE_KEYS.PRODUCTS)) {
      safeSet(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
    }
    if (!localStorage.getItem(STORAGE_KEYS.INQUIRIES)) {
      safeSet(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
    }
  }

  // --- Public Storage Operations ---

  // Inquiries
  function getInquiries() {
    return safeGet(STORAGE_KEYS.INQUIRIES, DEFAULT_INQUIRIES);
  }

  function addInquiry(inquiry) {
    const inquiries = getInquiries();
    const newInquiry = {
      id: 'inq-' + Date.now().toString().slice(-4),
      customerName: inquiry.customerName || 'Anonymous',
      email: inquiry.email || 'N/A',
      location: inquiry.location || 'Local / Global',
      subject: inquiry.subject || 'General Inquiry',
      package: inquiry.package || 'Custom',
      message: inquiry.message || '',
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    };
    inquiries.unshift(newInquiry);
    safeSet(STORAGE_KEYS.INQUIRIES, inquiries);
    return newInquiry;
  }

  function updateInquiryStatus(id, newStatus) {
    const inquiries = getInquiries();
    const item = inquiries.find((i) => i.id === id);
    if (item) {
      item.status = newStatus;
      safeSet(STORAGE_KEYS.INQUIRIES, inquiries);
      return true;
    }
    return false;
  }

  // Products
  function getProducts() {
    return safeGet(STORAGE_KEYS.PRODUCTS, DEFAULT_PRODUCTS);
  }

  function addProduct(product) {
    const products = getProducts();
    const newProduct = {
      id: 'prod-' + Date.now().toString().slice(-4),
      name: product.name,
      category: product.category || 'General',
      price: Number(product.price) || 0,
      status: product.status || 'Active',
      inquiriesCount: 0,
      image: product.image || '📦'
    };
    products.unshift(newProduct);
    safeSet(STORAGE_KEYS.PRODUCTS, products);
    return newProduct;
  }

  function deleteProduct(id) {
    let products = getProducts();
    products = products.filter((p) => p.id !== id);
    safeSet(STORAGE_KEYS.PRODUCTS, products);
    return true;
  }

  // Users & Demo Authentication
  function getUsers() {
    return safeGet(STORAGE_KEYS.USERS, []);
  }

  /**
   * Register a user simulation.
   * Encrypts simulated password via SHA-256 hash or representation (non-plaintext).
   */
  async function registerUser(userData) {
    const users = getUsers();
    const emailLower = userData.email.toLowerCase().trim();

    if (users.some((u) => u.email === emailLower)) {
      throw new Error('A user with this email address is already registered.');
    }

    // Academic simulation: store hash representation rather than plaintext
    const passwordHash = await hashString(userData.password);

    const newUser = {
      id: 'usr-' + Date.now(),
      fullName: userData.fullName,
      employeeId: userData.employeeId || 'EMP' + Math.floor(100000 + Math.random() * 900000),
      email: emailLower,
      mobile: userData.mobile,
      division: userData.division,
      passwordHash: passwordHash,
      businessName: userData.businessName || `${userData.fullName}'s Global Brand`,
      createdAt: new Date().toISOString()
    };

    users.push(newUser);
    safeSet(STORAGE_KEYS.USERS, users);
    return newUser;
  }

  async function authenticateUser(email, password) {
    const users = getUsers();
    const emailLower = email.toLowerCase().trim();
    const user = users.find((u) => u.email === emailLower);

    if (!user) {
      // Allow fallback demo user if no users registered yet
      if (emailLower === 'demo@growglobal.com' && password === 'GrowGlobal@2026') {
        return {
          fullName: 'Demo Business Owner',
          email: 'demo@growglobal.com',
          businessName: 'Rajesh Artisan Crafts'
        };
      }
      return null;
    }

    const inputHash = await hashString(password);
    if (user.passwordHash === inputHash) {
      return {
        fullName: user.fullName,
        email: user.email,
        employeeId: user.employeeId,
        businessName: user.businessName,
        division: user.division
      };
    }
    return null;
  }

  // Active Session
  function setSession(user) {
    safeSet(STORAGE_KEYS.SESSION, {
      ...user,
      loginTimestamp: Date.now()
    });
  }

  function getSession() {
    return safeGet(STORAGE_KEYS.SESSION, {
      fullName: 'Rajesh Artisan Crafts',
      email: 'rajesh@artisancraft.in',
      businessName: 'Rajesh Artisan Crafts',
      division: 'Export Division'
    });
  }

  function clearSession() {
    try {
      localStorage.removeItem(STORAGE_KEYS.SESSION);
    } catch (e) {
      console.warn('Error clearing session:', e);
    }
  }

  // Calculator History
  function getCalcHistory() {
    return safeGet(STORAGE_KEYS.CALC_HISTORY, []);
  }

  function addCalcHistory(expression, result) {
    const history = getCalcHistory();
    history.unshift({
      id: 'calc-' + Date.now(),
      expression,
      result,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    });
    // Keep max 10 entries
    if (history.length > 10) history.pop();
    safeSet(STORAGE_KEYS.CALC_HISTORY, history);
  }

  // Simple Web Crypto SHA-256 helper for academic demonstration
  async function hashString(message) {
    if (window.crypto && window.crypto.subtle) {
      try {
        const msgBuffer = new TextEncoder().encode(message);
        const hashBuffer = await window.crypto.subtle.digest('SHA-256', msgBuffer);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
      } catch (e) {
        // Fallback for older browsers
        return 'hash_' + btoa(message);
      }
    }
    return 'simulated_hash_' + btoa(message);
  }

  // Initialize on script execution
  seedInitialData();

  window.GrowGlobalStorage = {
    getInquiries,
    addInquiry,
    updateInquiryStatus,
    getProducts,
    addProduct,
    deleteProduct,
    getUsers,
    registerUser,
    authenticateUser,
    setSession,
    getSession,
    clearSession,
    getCalcHistory,
    addCalcHistory
  };
})();
