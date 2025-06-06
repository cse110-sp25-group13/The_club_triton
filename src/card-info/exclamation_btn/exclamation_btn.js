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
    this._cardId = null;
    this._linkEl = this.shadowRoot.querySelector('a');
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
    // console.log(`Exe-Btn: Attribute ${name} has changed from ${oldValue} to ${newValue}.`);
    // card-id: no style change needed
  }

  // Update the link inside <a>
  _updateHref() {
    if (this._linkEl) {
      this._linkEl.href = this.getAttribute('href') || '#';
      console.log(`Exe-Btn: update href successful: to ${this._linkEl.href}`)
    }
  }

  _onClick(e) {
    const cardId = this.cardId;
    // maybe someone would make a new card when this request is sent
    this.dispatchEvent(new CustomEvent('card-info-request', {
      detail: { cardId },
      bubbles: true,
      composed: true // important: allow event to cross shadow DOM boundary
    }));

    console.log(`Opening: ${this._linkEl.href}`)
  }


  set size(newValue){
    this.style.setProperty('--circle-size', newValue);
  }

  get size(){
    return this.style.getPropertyValue('--circle-size');
  }

  set color_bg(newValue){
    this.style.setProperty('--color-bg', newValue);
  }

  get color_bg(){
    return this.style.getPropertyValue("--color-bg");
  }
  
  set color_icon(newValue){
    this.style.setProperty('--color-icon', newValue);
  } 

  get color_icon(){
    return this.style.getPropertyValue("--color-icon");
  } 

  set href(newValue){
    this.setAttribute('href', newValue);
    this._updateHref();
  }
  get href(){
    return this.getAttribute('href');
  }

  set cardId(newId){
    this._cardId = newId;
  }
  get cardId(){
    return this._cardId;
  }
}

// Define the element
customElements.define('exclamation-circle-btn', ExclamationCircleBtn);
