/**
 * GrowGlobal – Interactive Calculator Module
 * Academic Course: 25CS208 – Web Technology
 * Implements a safe, zero-eval arithmetic calculator engine with error handling,
 * decimal operations, division-by-zero protection, and package estimation.
 */

(function () {
  'use strict';

  /**
   * Calculator State Manager
   */
  class SafeCalculator {
    constructor() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
      this.shouldResetScreen = false;
      this.history = [];
    }

    clear() {
      this.currentOperand = '0';
      this.previousOperand = '';
      this.operation = undefined;
      this.shouldResetScreen = false;
    }

    delete() {
      if (this.currentOperand === '0' || this.currentOperand.includes('Error')) {
        this.clear();
        return;
      }
      if (this.currentOperand.length === 1) {
        this.currentOperand = '0';
      } else {
        this.currentOperand = this.currentOperand.slice(0, -1);
      }
    }

    appendNumber(number) {
      if (this.currentOperand.includes('Error') || this.shouldResetScreen) {
        this.currentOperand = '';
        this.shouldResetScreen = false;
      }

      if (number === '.' && this.currentOperand.includes('.')) return;
      if (this.currentOperand === '0' && number !== '.') {
        this.currentOperand = number.toString();
      } else {
        this.currentOperand = (this.currentOperand || '') + number.toString();
      }
    }

    chooseOperation(operation) {
      if (this.currentOperand.includes('Error')) return;
      if (this.currentOperand === '' && this.previousOperand !== '') {
        this.operation = operation;
        return;
      }
      if (this.previousOperand !== '') {
        this.compute();
      }
      this.operation = operation;
      this.previousOperand = this.currentOperand;
      this.currentOperand = '';
    }

    /**
     * Safe arithmetic computation without using eval()
     */
    compute() {
      if (this.operation === undefined || this.previousOperand === '' || this.currentOperand === '') {
        return;
      }

      const prev = parseFloat(this.previousOperand);
      const current = parseFloat(this.currentOperand);

      if (isNaN(prev) || isNaN(current)) {
        this.currentOperand = 'Error: Invalid Input';
        this.operation = undefined;
        this.previousOperand = '';
        return;
      }

      let computation;

      switch (this.operation) {
        case '+':
          computation = prev + current;
          break;
        case '-':
          computation = prev - current;
          break;
        case '×':
        case '*':
          computation = prev * current;
          break;
        case '÷':
        case '/':
          if (current === 0) {
            this.currentOperand = 'Error: Division by zero';
            this.previousOperand = '';
            this.operation = undefined;
            this.shouldResetScreen = true;
            return;
          }
          computation = prev / current;
          break;
        default:
          return;
      }

      // Format decimals cleanly
      const formattedResult = Math.round(computation * 100000000) / 100000000;
      const expressionStr = `${prev} ${this.operation} ${current}`;

      // Save to history
      if (window.GrowGlobalStorage && window.GrowGlobalStorage.addCalcHistory) {
        window.GrowGlobalStorage.addCalcHistory(expressionStr, formattedResult);
      }

      this.currentOperand = formattedResult.toString();
      this.operation = undefined;
      this.previousOperand = '';
      this.shouldResetScreen = true;
    }

    getDisplayNumber(numberStr) {
      if (!numberStr) return '';
      if (numberStr.includes('Error')) return numberStr;

      const stringNumber = numberStr.toString();
      const integerDigits = parseFloat(stringNumber.split('.')[0]);
      const decimalDigits = stringNumber.split('.')[1];

      let integerDisplay;
      if (isNaN(integerDigits)) {
        integerDisplay = '';
      } else {
        integerDisplay = integerDigits.toLocaleString('en-IN', {
          maximumFractionDigits: 0
        });
      }

      if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`;
      } else {
        return integerDisplay;
      }
    }
  }

  /**
   * Bind Calculator UI buttons to the calculator engine
   */
  function setupCalculator(container) {
    if (!container) return;

    const calc = new SafeCalculator();
    const prevOperandText = container.querySelector('.calc-prev-operand');
    const currOperandText = container.querySelector('.calc-curr-operand');

    function updateDisplay() {
      if (currOperandText) {
        if (calc.currentOperand.includes('Error')) {
          currOperandText.textContent = calc.currentOperand;
          currOperandText.style.fontSize = '0.95rem';
          currOperandText.style.color = 'var(--color-danger)';
        } else {
          currOperandText.textContent = calc.getDisplayNumber(calc.currentOperand) || '0';
          currOperandText.style.fontSize = '1.75rem';
          currOperandText.style.color = 'var(--text-primary)';
        }
      }

      if (prevOperandText) {
        if (calc.operation != null) {
          prevOperandText.textContent = `${calc.getDisplayNumber(calc.previousOperand)} ${calc.operation}`;
        } else {
          prevOperandText.textContent = '';
        }
      }
    }

    // Number keys
    container.querySelectorAll('[data-number]').forEach((btn) => {
      btn.addEventListener('click', () => {
        calc.appendNumber(btn.getAttribute('data-number'));
        updateDisplay();
      });
    });

    // Operation keys
    container.querySelectorAll('[data-operation]').forEach((btn) => {
      btn.addEventListener('click', () => {
        calc.chooseOperation(btn.getAttribute('data-operation'));
        updateDisplay();
      });
    });

    // Equals key
    const equalsBtn = container.querySelector('[data-equals]');
    if (equalsBtn) {
      equalsBtn.addEventListener('click', () => {
        calc.compute();
        updateDisplay();
      });
    }

    // Clear key
    const clearBtn = container.querySelector('[data-clear]');
    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        calc.clear();
        updateDisplay();
      });
    }

    // Delete key
    const deleteBtn = container.querySelector('[data-delete]');
    if (deleteBtn) {
      deleteBtn.addEventListener('click', () => {
        calc.delete();
        updateDisplay();
      });
    }

    updateDisplay();
    return calc;
  }

  /**
   * Website Project Cost & ROI Estimator
   * Base prices:
   * Basic: ₹4,999
   * Standard: ₹9,999
   * Premium: ₹14,999
   * Custom hourly development: ₹800/hr
   */
  function estimateProjectCost(tier = 'standard', extraHours = 0, addChatbot = false, addSeo = false) {
    let basePrice = 9999;
    if (tier === 'basic') basePrice = 4999;
    if (tier === 'premium') basePrice = 14999;

    const hourlyRate = 800;
    const developmentAddon = Number(extraHours) * hourlyRate;
    const chatbotAddon = addChatbot ? 2500 : 0;
    const seoAddon = addSeo ? 3500 : 0;

    const subtotal = basePrice + developmentAddon + chatbotAddon + seoAddon;
    const gstEstimate = Math.round(subtotal * 0.18);
    const total = subtotal + gstEstimate;

    return {
      basePrice,
      developmentAddon,
      chatbotAddon,
      seoAddon,
      subtotal,
      gstEstimate,
      total
    };
  }

  document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.calculator-box').forEach((box) => {
      setupCalculator(box);
    });
  });

  window.GrowGlobalCalc = {
    SafeCalculator,
    setupCalculator,
    estimateProjectCost
  };
})();
