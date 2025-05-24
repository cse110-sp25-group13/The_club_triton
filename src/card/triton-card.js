/**
 * TritonCard is a custom web component representing a card with a front and back.
 */

const TYPE_COLORS = {
  'structure': '#003A70', // Dark blue
  'dining': '#FFCD00',    // Yellow
  'mascot': '#006A4E',    // Dark green
  'living': '#C0C0C0',    // Gray
  'default': '#CCCCCC'    // A default gray border in case the type does not match
};

class TritonCard extends HTMLElement {
  #card;
  /**
   * Create an empty card.
   * @param {void} none
   */
  constructor() {
    super(); // Inherit everything from HTMLElement
    this.attachShadow({ mode: "open" }); // Attach a shadowDom to this component

    const div = document.createElement("div");

    const style = document.createElement("style");

    // HTML
    div.classList.add("card");
    div.innerHTML = `
    <div class="card-inner">
      <div class="card-front">
        <div class="card-front-background">
          <img alt="front of the card">
        </div>
        <p class="name">name</p>
        <p class="rank">rank</p>
        <p class="type">type</p>
        <span class="rarity"></span> 
        <p class="description">description</p>
      </div>
      <div class="card-back">
        <div class="card-back-background">
          <img alt="back of the card">
        </div>
      </div>
    </div>
    `;

    // Style
    style.textContent = `
    .card {
      background-color: transparent;
      aspect-ratio: auto 3/4;
      width: var(--card-wdith);
      perspective: 1000px;
    }

    .card-inner {
      position: relative;
      width: 100%;
      height: 100%;
      border: 3px solid cyan;
      text-align: center;
      transition: transform 0.8s;
      transform-style: preserve-3d;
    }

    .card:hover .card-inner {
      transform: rotateY(180deg);
    }

    .card-front, .card-back {
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
    }

    .card-front-background, .card-back-background {
      position: absolute;
      top: 0;
      img {
        aspect-ratio: auto 3/4;
        width: var(--card-wdith);
        height: calc(var(--card-wdith) * 4/3);
      }
    }

    .card-front {
      color: red;
      font-size: 15px;

      .name {
        position: absolute;
        top: 1rem;
        right: 0;
      }
      .type {
        position: absolute;
        top: 0;
        left: 0;
      }
      .rank {
        position: absolute;
        top: 1rem;
        font-size: 30px;
      }
      .description {
        position: absolute;
        left: 50px;
        bottom: 0;
      }

      .rarity {
        position: absolute;
        top: 2.5rem; 
        right: 0.5rem; 
        font-size: 12px; 
        color: gold; 
        /* We can use like "★★★☆☆" or number */
      }
    }

    .card-back {
      background-color: blue;
      color: red;
      font-size: 11px;
      transform: rotateY(180deg);
    }`;

    this.shadowRoot.appendChild(style);
    this.shadowRoot.appendChild(div);
    this.#card = div;
  }

  /**
   * Set the card-front background image.
   * @param {string} src - The source URL of the image.
   * @returns {void}
   */
  set front_image(src) {
    console.log(`${src}`);
    const img = this.#card.querySelector(".card-front-background > img");
    if(img) img.src = src;
  }

  /**
   * Set the card-back background image.
   * @param {string} src - The source URL of the image.
   * @returns {void}
   */
  set back_image(src) {
    const img = this.#card.querySelector(".card-back-background > img");
    if(img) img.src = src;
  }

  /**
   * Set the name displayed on the card.
   * @param {string} name - The name to display.
   * @returns {void}
   */
  set name(name) {
    const el = this.#card.querySelector(".name");
    if(el) el.textContent = name;
  }

  /**
   * Set the rank displayed on the card.
   * @param {string} rank - The rank to display.
   * @returns {void}
   */
  set rank(rank) {
    const el = this.#card.querySelector(".rank");
    if(el) el.textContent = rank;
  }

  /**
   * Set the type displayed on the card and update border color.
   * @param {string} typeValue - The type to display.
   * @returns {void}
   */
  set type(typeValue) {
    const typeElement = this.#card.querySelector(".type");
    if (typeElement) {
      typeElement.textContent = typeValue;
    }

    const cardInner = this.#card.querySelector('.card-inner');
    if (cardInner) {
      const normalizedType = typeValue ? typeValue.toLowerCase() : 'default';
      const borderColor = TYPE_COLORS[normalizedType] || TYPE_COLORS['default'];
      cardInner.style.borderColor = borderColor;
    }
  }

  /**
   * Set the description displayed on the card.
   * @param {string} des - The description to display.
   * @returns {void}
   */
  set description(des) {
    const el = this.#card.querySelector(".description");
    if(el) el.textContent = des;
  }

  /**
   * Set the rarity displayed on the card.
   * @param {number|string} value - The rarity value (e.g., 1, 2, 3, 4, 5).
   * @returns {void}
   */
  set rarity(value) {
    const rarityElement = this.#card.querySelector(".rarity");
    if (rarityElement) {
      rarityElement.textContent = `Rarity: ${value}`;
    }
  }
}

customElements.define("triton-card", TritonCard);
