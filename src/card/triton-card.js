/**
 * TritonCard is a custom web component representing a card with a front and back.
 * @const {Map<string,string>}
 */
const TYPE_COLORS = {
  'structure': '#003A70', // Dark blue
  'dining': '#FFCD00',    // Yellow
  'mascot': '#006A4E',    // Dark green
  'living': '#C0C0C0',    // Gray
  'default': '#CCCCCC'    // A default gray border in case the type does not match
};

/**
 * Key: type
 * 
 * Value: the path of the border with corresponding type
 * 
 * Current default path for our assets (but please remember to change the path when
 * the assets directory is updated for any reason) 
 * @const {Map<string,string>} TYPE_BORDER 
 */
const TYPE_BORDER ={
  'structure': "./assets/blue-card-base.png",
  'dining': "./assets/yellow-card-base.png",   
  'mascot': "./assets/green-card-base.png",    
  'living': "./assets/dark-card-base.png",    
  'default': "./assets/default-card-base.png"
}

/**
 * 
 */
class TritonCard extends HTMLElement {
  //should never use default anyway
  static default_card_border_path = "./assets/default-card-base.png"; // Update this element to have a different default border
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
        <img id = "img-card-front"  alt="Image of the card">
        <div class="card-front-background">
          <img id='img-card-border' src="default_card_border_path"  alt="Card border">
        </div>
        <p class="name">name</p>
        <p class="rank">rank</p>
        <p class="type">type</p>
        <span class="rarity"></span> 
        <p class="description">description</p>
      </div>
      <div class="card-back">
        <div class="card-back-background">
          <img id="img-card-back" alt="back of the card">
        </div>
      </div>
    </div>
    `;

    // Style
    style.textContent = `
      @import url('https://fonts.googleapis.com/css2?family=Source+Sans+3:ital,wght@0,200..900;1,200..900&display=swap');

      .card {
        font-family: "Source Sans 3", sans-serif;
        font-optical-sizing: auto;
        font-weight: 800;
        font-style: oblique;

        font-size: var(--card-font-size);
        background-color: transparent;
        aspect-ratio: auto 3/4;
        width: var(--card-width);
        perspective: 1000px; /* Remove this if you don't want the 3D effect */
      }

      /* This container is needed to position the front and back side */
      .card-inner {
        position: relative;
        width: 100%;
        height: 100%;
        border: 3px solid cyan; /* change the style of border when needed */
        text-align: center;
        transition: transform 0.8s;
        transform-style: preserve-3d;
      }

      // No more hover flip...
      // /* Do an horizontal flip when you move the mouse over the flip box container*/
      // .card:hover .card-inner {
      //   transform: rotateY(180deg);
      // }

      /* Position the front and back side */
      .card-front,
      .card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;
      }

      .card-front-background,
      .card-back-background {
        position: absolute;
        top: 0;
        img {
          aspect-ratio: auto 3/4;
          width: var(--card-width);
          height: var(--card-height);
        }
      }
      /* Style the front side (also fallback if image is missing) */
      .card-front {
        color: black;

        #img-card-front{
          width: var(--card-image-width);
          height: var(--card-image-height); 
          z-index: 0;
        }

        #img-card-border{
          z-index: -1;
        }

        .name, .rank, .type, .description {
          position: absolute;
          z-index: 2;
          /* make sure the overflow text is hidden */
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          word-wrap: break-word;
          /* make sure text isn't centered */
          text-align: left; 
          
        }

        .name {
          width: calc(var(--card-width) /2);
          height:  calc(var(--card-width) * 1/15);
          text-align: right; 
          top: 0%;
          right: 5%;
        }

        .type {
          width: calc(var(--card-width) /4);
          height:  calc(var(--card-width) * 1/15);
          top: 1.5%;
          left: 12.5%;;
        }

        .rank {
          width: calc(var(--card-width) /6);
          height:  calc(var(--card-width) * 1/6);
          bottom: 23%;
          left: 5%;
          font-size: 3.5em;
        }

        .description {

          width: calc(var(--card-width) * 260/300);
          height:  calc(var(--card-width) * 120/300) ;
          line-height: 1.2;
          left: 5%;
          bottom: 0;          

        }
      }


      /* Style the back side (same fall back)*/
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
    const img = this.#card.querySelector("#img-card-front");
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
      const border = this.#card.querySelector("#img-card-border");
      const normalizedType = typeValue ? typeValue.toLowerCase() : 'default';
      const borderColor = TYPE_COLORS[normalizedType] || TYPE_COLORS['default'];
      const borderPath = TYPE_BORDER[normalizedType] || TritonCard.default_card_border_path;
      cardInner.style.borderColor = borderColor;
      border.src = borderPath;
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
