
/**
 * 
 */
class TritonCard extends HTMLElement{
	#card;
	/**
	 * Create an empty card. 
	 * @param none
	 */
	constructor() {
		super(); // Inherit everything from HTMLElement
		this.attachShadow( { mode: "open" } );  // Attach a shadowDom to this component

		const div = document.createElement("div")
		
		const style = document.createElement("style");
		
		// HTML
		div.classList.add("card");
		div.innerHTML= `
		<div class="card-inner">
      <div class="card-front">
        <div class="card-front-background">
          <img alt="front of the card">
        </div>
        <p class="name">name</p>
        <p class="rank">rank</p>
        <p class="type">type</p>
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

    .card-inner{
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

    .card-front, .card-back{
      position: absolute;
      width: 100%;
      height: 100%;
      -webkit-backface-visibility: hidden; 
      backface-visibility: hidden;

    }

    .card-front-background, .card-back-background{
      position: absolute;
      top: 0;
      img{
        aspect-ratio: auto 3/4;
        width: var(--card-wdith); 
        height: calc(var(--card-wdith) * 4/3);
      }
    }
    .card-front {
      color: red;
      font-size : 15px;
      
      .name {
        position: absolute;
        top: 1rem;
        right: 0;
      }
      .type{
        position: absolute;
        top: 0;
        left: 0;
      }
      .rank {
        position: absolute;
        top: 1rem;
        font-size: 30px;
      }
      .description{
        position: absolute;
        left: 50px;
        bottom: 0;
      }
    }

    .card-back{
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
	 * set the card-front background image
	 * @returns none
	 */
	set front_image(src){
		console.log(`${src}`);
		const img = this.#card.querySelector(".card-front-background > img");
		img.src = src;
	}

	/**
	 * set the card-back background image
	 * @returns none
	 */
	set back_image(src){
		const img = this.#card.querySelector(".card-back-background > img");
		img.src = src;
	}

	set name(name){
		this.#card.querySelector(".name").textContent = name;
	}

	set rank(rank){
		this.#card.querySelector(".rank").textContent = rank;
	}

	set type(type){
		this.#card.querySelector(".type").textContent = type;
	}

	set description(des){
		this.#card.querySelector(".description").textContent = des;
	}

};

customElements.define('triton-card', TritonCard);
