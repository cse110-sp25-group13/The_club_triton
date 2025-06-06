import { template } from "./overlay-box-template.js";
import { styles } from "./overlay-box-syles.js";

/**
 * Set the attribute id, so it can use <a href="#id"></a> to open the overlay  
 * TODO: add event listerner to add cards and remove cards to the display.
 */
class OverlayBox extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
      <style>${styles}</style>
      <section class="overlay">${template}</section>
    `;

    this._section = this.shadowRoot.querySelector('section');
    this._box = this.shadowRoot.querySelector(".box");
  }

  /** HTML Functions*/
  connectedCallback() {
    // disgusting fix to do call by id
    window.addEventListener('hashchange', this._onHashChange.bind(this));
    // Initial sync if id is already set
    if (!this.hasAttribute('id')) {
      console.warn('<overlay-box> is missing an id! It must have an id for :target to work.');
    }
  }

  /** HTML Functions*/
  disconnectedCallback() {
    window.removeEventListener('hashchange', this._onHashChange.bind(this));
  }

  /**
   * Open the Overlay Box (make it visible)
   * @returns {void}  None
   */
  open() {
    this.shadowRoot.querySelector('section').style.visibility = 'visible';
    this.shadowRoot.querySelector('section').style.opacity = '1';
  }
  /**
   * Open the Overlay Box (make it hidden)
   * @returns {void}  None
   */
  close() {
    this.shadowRoot.querySelector('section').style.visibility = 'hidden';
    this.shadowRoot.querySelector('section').style.opacity = '0';
  }

  /**
   * Open or close the overlay box when
   * @returns {void}  None
   */
  _onHashChange() {
    const hash = window.location.hash;
    if (hash === `#${this.id}`) {
      console.log(`Opening Overlay Box: id=${hash}`);
      this.open();
    } else {
      this.close();
    }
  }

}

customElements.define('overlay-box', OverlayBox);

