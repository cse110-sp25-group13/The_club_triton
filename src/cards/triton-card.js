// triton_card.js

/**
 * Custom element representing a game card in the Club Triton application.
 * Displays card information including name, type, ranking, rarity, description,
 * and an image with a colored border based on card type.
 */
class TritonCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    const template = document.createElement('template');
    template.innerHTML = `
      <link rel="stylesheet" href="./card-style.css">
      <div class="card">
        <div class="header">
          <div class="name-type">
            <div class="name" id="card-name">Card Name</div>
            <div class="type" id="card-type">Type</div>
          </div>
          <div class="ranking" id="card-ranking">Rank: </div>
        </div>
        <div class="image-container">
          <img id="card-image" src="ucsd-logo.png" alt="Card Image" />
        </div>
        <div class="rarity" id="card-rarity">Rarity: </div>
        <div class="description" id="card-description">Description</div>
      </div>
    `;

    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  /**
   * Lifecycle method called when the element is inserted into the DOM.
   * Initializes the card with default values if needed.
   */
  connectedCallback() {
    // Check if we have any attributes to initialize the card with
    if (this.hasAttribute('data-card')) {
      try {
        const cardData = JSON.parse(this.getAttribute('data-card'));
        this.cardData = cardData;
      } catch (e) {
        console.error('Invalid card data attribute:', e);
      }
    }
    
    console.log('Triton card element added to the DOM');
  }

  /**
   * Sets the card data and updates the shadow DOM accordingly.
   * @param {Object} data - Card data object with the following properties:
   * @param {string} data.name - The name of the card
   * @param {string} data.type - The type of card (e.g., "Structure", "Dining")
   * @param {number} data.ranking - The card ranking (1-5)
   * @param {number} data.rarity - The card rarity (1-5 stars)
   * @param {string} data.description - The card description text
   * @param {string} data.front_image_placeholder - URL for the front image
   * @param {string} data.border_color_code - CSS color value for the card border
   */
  set cardData(data) {
    const card = this.shadowRoot.querySelector('.card');
    this.shadowRoot.getElementById('card-name').textContent = data.name;
    this.shadowRoot.getElementById('card-type').textContent = data.type;
    this.shadowRoot.getElementById('card-ranking').textContent = `Rank: ${data.ranking}`;
    this.shadowRoot.getElementById('card-rarity').textContent = `Rarity: ${'★'.repeat(data.rarity)}`;
    this.shadowRoot.getElementById('card-description').textContent = data.description || '';
    
    // Set image (using front image only)
    this.shadowRoot.getElementById('card-image').src = data.front_image_placeholder || 'ucsd-logo.png';
    
    // Set border color based on type
    card.style.borderColor = data.border_color_code || 'grey'; // Defaults to grey if no color is provided
    
    // Set card type attribute for styling
    card.setAttribute('data-card-type', data.type.toLowerCase());
  }
}

customElements.define('triton-card', TritonCard);
