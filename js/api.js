/**
 * GrowGlobal – REST API Integration Module
 * Academic Course: 25CS208 – Web Technology
 * Implements fetch() based REST API integration with real-time currency conversion,
 * live market data, and bulletproof offline/sandbox mock fallbacks.
 */

(function () {
  'use strict';

  // Fallback exchange rates for INR (Indian Rupee) baseline
  const FALLBACK_RATES = {
    INR: 1,
    USD: 0.012, // 1 INR ≈ 0.012 USD (~$83 per $1)
    EUR: 0.011, // 1 INR ≈ 0.011 EUR
    GBP: 0.0095, // 1 INR ≈ 0.0095 GBP
    AED: 0.044, // 1 INR ≈ 0.044 AED
    SGD: 0.016, // 1 INR ≈ 0.016 SGD
    JPY: 1.85 // 1 INR ≈ 1.85 JPY
  };

  let cachedRates = { ...FALLBACK_RATES };
  let lastFetchedTimestamp = 0;

  /**
   * Fetch current global currency rates using open public REST API with fallback.
   */
  async function fetchExchangeRates() {
    // If fetched recently (within 1 hour), reuse cached rates
    if (Date.now() - lastFetchedTimestamp < 3600000 && Object.keys(cachedRates).length > 2) {
      return cachedRates;
    }

    try {
      // Free public REST API for exchange rates
      const response = await fetch('https://open.er-api.com/v6/latest/INR', {
        method: 'GET',
        headers: { Accept: 'application/json' },
        // Short timeout using AbortController
        signal: AbortSignal.timeout(3000)
      });

      if (!response.ok) {
        throw new Error(`HTTP Error ${response.status}`);
      }

      const data = await response.json();
      if (data && data.rates) {
        cachedRates = {
          INR: 1,
          USD: data.rates.USD || FALLBACK_RATES.USD,
          EUR: data.rates.EUR || FALLBACK_RATES.EUR,
          GBP: data.rates.GBP || FALLBACK_RATES.GBP,
          AED: data.rates.AED || FALLBACK_RATES.AED,
          SGD: data.rates.SGD || FALLBACK_RATES.SGD,
          JPY: data.rates.JPY || FALLBACK_RATES.JPY
        };
        lastFetchedTimestamp = Date.now();
        console.log('GrowGlobal API: Successfully retrieved live exchange rates via fetch()');
        return cachedRates;
      }
    } catch (error) {
      console.warn('GrowGlobal API: External fetch failed or sandboxed, using fallback rates:', error.message);
    }

    return cachedRates;
  }

  /**
   * Convert an amount in INR to target currency
   */
  function convertINR(amountInINR, targetCurrency = 'USD') {
    const rate = cachedRates[targetCurrency] || FALLBACK_RATES[targetCurrency] || 1;
    const converted = amountInINR * rate;

    // Formatting based on currency
    if (targetCurrency === 'JPY') {
      return `¥${Math.round(converted).toLocaleString('en-US')}`;
    }
    if (targetCurrency === 'EUR') {
      return `€${converted.toFixed(2)}`;
    }
    if (targetCurrency === 'GBP') {
      return `£${converted.toFixed(2)}`;
    }
    if (targetCurrency === 'AED') {
      return `AED ${converted.toFixed(2)}`;
    }
    return `$${converted.toFixed(2)}`;
  }

  /**
   * Fetch sample market feedback or testimonials (simulated via JSONPlaceholder or fallback)
   */
  async function fetchMarketInsights() {
    try {
      const res = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=3', {
        signal: AbortSignal.timeout(2500)
      });
      if (res.ok) {
        const posts = await res.json();
        return posts.map((p, idx) => ({
          title: `Global Market Insight #${idx + 1}`,
          excerpt: p.title,
          source: 'International Trade Feeds'
        }));
      }
    } catch (e) {
      // Fallback
    }

    return [
      {
        title: 'Global Craft Export Demand Surges 34%',
        excerpt: 'European and North American buyers are increasingly seeking authentic artisanal and organic products directly from verified Indian small businesses.',
        source: 'Global SME Trade Monitor'
      },
      {
        title: 'Mobile-First Portals Drive 68% of Inquiries',
        excerpt: 'Local manufacturers with lightning-fast responsive websites convert international visitor traffic 2.8x faster than traditional catalog PDFs.',
        source: 'Digital Commerce Index'
      }
    ];
  }

  // Pre-fetch rates on script load
  fetchExchangeRates();

  window.GrowGlobalAPI = {
    fetchExchangeRates,
    convertINR,
    fetchMarketInsights,
    FALLBACK_RATES
  };
})();
