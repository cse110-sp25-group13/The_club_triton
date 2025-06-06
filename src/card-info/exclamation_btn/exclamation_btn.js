import { styles } from "./exclamation-btn-styles.js";
class ExclamationCircleBtn extends HTMLElement {
  static get observedAttributes() {
    return ['href', 'card-id', 'size', 'color-bg', 'color-icon'];
  }

  constructor() {
    
    super();
    this.attachShadow({ mode: 'open' });
    
    // Initial render
    this.shadowRoot.innerHTML = `
      <style>
      ${styles}
      </style>
      <a part="link"></a>
    `;
    this.linkEl = this.shadowRoot.querySelector('a');
    this._updateHref();
    this.addEventListener('click', this._onClick.bind(this));
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'size') {
      this.style.setProperty('--circle-size', newValue);
    } else if (name === 'color-bg') {
      this.style.setProperty('--color-bg', newValue);
    } else if (name === 'color-icon') {
      this.style.setProperty('--color-icon', newValue);
    }else if (name === 'href') {
      this._updateHref();
    }
    console.log(`Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    // card-id: no style change needed
  }

  // Update the link inside <a>
  _updateHref() {
    if (this.linkEl) {
      this.linkEl.href = this.getAttribute('href') || '#';
      console.log(`update href successful: to ${this.linkEl.href}`)
    }
  }

  _onClick(e) {
    const cardId = this.getAttribute('card-id');
    this.dispatchEvent(new CustomEvent('card-info-request', {
      detail: { cardId },
      bubbles: true,
      composed: true // important: allow event to cross shadow DOM boundary
    }));
    
  }
}

// Define the element
customElements.define('exclamation-circle-btn', ExclamationCircleBtn);
