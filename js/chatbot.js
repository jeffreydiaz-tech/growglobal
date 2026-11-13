/**
 * GrowGlobal – Floating Chatbot Assistant Module
 * Academic Course: 25CS208 – Web Technology
 * Implements conversational AI simulation with keyword matching, typing indicator,
 * safe DOM manipulation (textContent), FAQ chips, and persistence.
 */

(function () {
  'use strict';

  // Keyword Knowledge Base
  const FAQ_KNOWLEDGE_BASE = [
    {
      keywords: ['growglobal', 'what is', 'who are', 'about', 'platform'],
      response:
        'GrowGlobal is a digital platform designed for local shops, artisans, and small businesses. We build professional, responsive websites that showcase products globally, generate inquiries, and expand market reach.'
    },
    {
      keywords: ['service', 'services', 'offer', 'provide', 'feature'],
      response:
        'We offer responsive web design, digital product catalogs, SEO optimization, custom business inquiries management, integrated chatbots, and interactive business calculators.'
    },
    {
      keywords: ['price', 'pricing', 'cost', 'package', 'packages', 'rate', 'how much'],
      response:
        'Our packages:\n• BASIC (₹4,999): Single landing page, contact form, mobile-ready.\n• STANDARD (₹9,999): Multi-section website, product showcase, integrated chatbot.\n• PREMIUM (₹14,999): Complete store, dashboard, SEO & priority support.\n• Custom Hourly Rate: ₹800/hr.'
    },
    {
      keywords: ['standard', 'middle', 'recommended', '9999', 'popular'],
      response:
        'The STANDARD package at ₹9,999 is our most popular choice! It includes a multi-section responsive website, product showcase, contact inquiry form, and an interactive assistant chatbot.'
    },
    {
      keywords: ['basic', '4999', 'starter'],
      response:
        'The BASIC package at ₹4,999 is ideal for startups needing a sleek, single-page digital business card with contact details and full mobile responsiveness.'
    },
    {
      keywords: ['premium', '14999', 'full', 'advanced'],
      response:
        'The PREMIUM package at ₹14,999 is a comprehensive solution featuring a full product catalog, dashboard demo, technical SEO setup, custom inquiries workflow, and 12-month priority support.'
    },
    {
      keywords: ['mobile', 'responsive', 'phone', 'tablet', 'screen'],
      response:
        'Yes, 100%! All GrowGlobal websites are built mobile-first using modern CSS Flexbox and CSS Grid, ensuring seamless performance from 375px smartphones to 4K ultra-wide monitors.'
    },
    {
      keywords: ['contact', 'email', 'phone', 'reach', 'call', 'talk', 'address'],
      response:
        'You can reach our team directly via:\n• Email: hello@growglobal.in\n• Phone: +91 98765 43210\n• Office: Innovation Park, Cyber Hub, Bengaluru, India.'
    },
    {
      keywords: ['calculator', 'estimate', 'roi', 'quote'],
      response:
        'You can use our built-in Safe Calculator on the Business Dashboard to compute custom project costs at ₹800/hr or estimate your business ROI!'
    },
    {
      keywords: ['guarantee', 'profit', 'promise', 'revenue'],
      response:
        'GrowGlobal helps businesses improve their digital visibility, attract potential customers, and create more opportunities for revenue growth. We do not promise or guarantee fixed profits.'
    },
    {
      keywords: ['register', 'signup', 'account', 'login', 'signin'],
      response:
        'You can register your business by clicking "Register" in the navigation bar or test our demo portal using "Sign In".'
    },
    {
      keywords: ['tech', 'technology', 'stack', 'framework', 'html'],
      response:
        'GrowGlobal is built with vanilla HTML5, CSS3 (Grid & Flexbox), and modern ES6+ JavaScript, demonstrating core Web Technology principles without heavy framework overhead.'
    }
  ];

  const DEFAULT_FALLBACK =
    "I'm here to help you take your business global! Ask me about our services, pricing packages (Basic ₹4,999 / Standard ₹9,999 / Premium ₹14,999), mobile responsiveness, or contact details.";

  const QUICK_QUESTIONS = [
    'What is GrowGlobal?',
    'What services do you offer?',
    'What are your prices?',
    'What is included in Standard?',
    'Do you create mobile-friendly websites?',
    'How can I contact you?'
  ];

  /**
   * Find best response based on input keyword matching
   */
  function findResponse(userInput) {
    const cleanInput = userInput.toLowerCase();

    for (const item of FAQ_KNOWLEDGE_BASE) {
      const match = item.keywords.some((kw) => cleanInput.includes(kw));
      if (match) {
        return item.response;
      }
    }
    return DEFAULT_FALLBACK;
  }

  /**
   * Initialize Chatbot DOM elements and interactions
   */
  function initChatbot() {
    // Check if chatbot HTML is already injected
    if (document.getElementById('growglobalChatbotTrigger')) return;

    // Create floating trigger button
    const triggerBtn = document.createElement('button');
    triggerBtn.id = 'growglobalChatbotTrigger';
    triggerBtn.className = 'chatbot-trigger-btn';
    triggerBtn.setAttribute('aria-label', 'Open GrowGlobal Assistant Chat');
    triggerBtn.innerHTML = `
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
      </svg>
      <span class="chatbot-badge"></span>
    `;

    // Create chat panel container
    const panel = document.createElement('div');
    panel.id = 'growglobalChatbotPanel';
    panel.className = 'chatbot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Chat with GrowGlobal Assistant');

    panel.innerHTML = `
      <div class="chatbot-header">
        <div class="chatbot-title-box">
          <div class="chatbot-avatar">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 2a2 2 0 0 1 2 2v2a2 2 0 0 1-2 2 2 2 0 0 1-2-2V4a2 2 0 0 1 2-2z"></path>
              <rect x="4" y="8" width="16" height="12" rx="2"></rect>
              <line x1="9" y1="13" x2="9" y2="15"></line>
              <line x1="15" y1="13" x2="15" y2="15"></line>
            </svg>
          </div>
          <div>
            <h4>GrowGlobal Assistant</h4>
            <div class="chatbot-status">
              <span class="status-dot"></span> Online • Instant Answers
            </div>
          </div>
        </div>
        <button class="chatbot-close-btn" id="closeChatbotBtn" aria-label="Close Chat">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <div class="chatbot-body" id="chatbotMessages">
        <!-- Messages will be appended here -->
        <div class="chat-bubble bot">
          Hello! 👋 Welcome to <strong>GrowGlobal</strong>. I am your digital business assistant. How can I assist your business in reaching global customers today?
        </div>
        <div class="chatbot-suggestions" id="chatSuggestions"></div>
        <div class="chat-typing-indicator" id="chatTypingIndicator">
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
          <div class="typing-dot"></div>
        </div>
      </div>

      <form class="chatbot-footer" id="chatbotForm">
        <input 
          type="text" 
          id="chatbotInput" 
          class="chatbot-input" 
          placeholder="Ask a question..." 
          autocomplete="off" 
          aria-label="Chatbot question input"
        />
        <button type="submit" class="chatbot-send-btn" aria-label="Send message">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    `;

    document.body.appendChild(triggerBtn);
    document.body.appendChild(panel);

    const messagesContainer = document.getElementById('chatbotMessages');
    const inputField = document.getElementById('chatbotInput');
    const chatForm = document.getElementById('chatbotForm');
    const closeBtn = document.getElementById('closeChatbotBtn');
    const typingIndicator = document.getElementById('chatTypingIndicator');
    const suggestionsContainer = document.getElementById('chatSuggestions');

    // Populate quick FAQ suggestion chips
    QUICK_QUESTIONS.forEach((q) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = 'chip-btn';
      chip.textContent = q;
      chip.addEventListener('click', () => {
        handleUserMessage(q);
      });
      suggestionsContainer.appendChild(chip);
    });

    // Toggle Chatbot Panel
    function toggleChatbot(forceOpen) {
      const isOpen = panel.classList.contains('open');
      const shouldOpen = forceOpen !== undefined ? forceOpen : !isOpen;

      if (shouldOpen) {
        panel.classList.add('open');
        inputField.focus();
      } else {
        panel.classList.remove('open');
      }
    }

    triggerBtn.addEventListener('click', () => toggleChatbot());
    closeBtn.addEventListener('click', () => toggleChatbot(false));

    /**
     * Append message bubble using safe textContent
     */
    function appendMessage(text, sender = 'bot') {
      const bubble = document.createElement('div');
      bubble.className = `chat-bubble ${sender}`;

      // Support multi-line responses cleanly
      const lines = text.split('\n');
      lines.forEach((line, index) => {
        const textNode = document.createTextNode(line);
        bubble.appendChild(textNode);
        if (index < lines.length - 1) {
          bubble.appendChild(document.createElement('br'));
        }
      });

      // Insert before typing indicator
      messagesContainer.insertBefore(bubble, typingIndicator);
      messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    /**
     * Handle incoming user message and generate bot reply with simulated typing delay
     */
    function handleUserMessage(userText) {
      if (!userText || !userText.trim()) return;

      appendMessage(userText, 'user');
      inputField.value = '';

      // Show typing indicator
      typingIndicator.classList.add('active');
      messagesContainer.scrollTop = messagesContainer.scrollHeight;

      // Simulate realistic thinking delay (400ms - 800ms)
      setTimeout(() => {
        typingIndicator.classList.remove('active');
        const botReply = findResponse(userText);
        appendMessage(botReply, 'bot');
      }, 550);
    }

    chatForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleUserMessage(inputField.value);
    });
  }

  document.addEventListener('DOMContentLoaded', initChatbot);

  window.GrowGlobalChatbot = {
    open: function () {
      const panel = document.getElementById('growglobalChatbotPanel');
      if (panel) panel.classList.add('open');
    },
    close: function () {
      const panel = document.getElementById('growglobalChatbotPanel');
      if (panel) panel.classList.remove('open');
    }
  };
})();
