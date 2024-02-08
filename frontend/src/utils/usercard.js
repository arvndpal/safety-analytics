const template = document.createElement('template');
template.innerHTML = `
  <style>
  .user-card {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 300px;
		display: grid;
		grid-template-columns: 1fr 2fr;
		grid-gap: 10px;
		margin-bottom: 15px;
		border-bottom: coral 5px solid;
	}

	.user-card img {
		width: 100%;
    border-radius: 50%;
    padding:5px
	}

  img {
    transition: all .7s ease-in-out;
  }
  img:hover {
    transform: rotate(360deg);
    border-radius: 0
  }

	.user-card button {
		cursor: pointer;
		background: coral;
		color: #fff;
		border: 0;
		border-radius: 12px;
		padding: 5px 10px;
    margin-bottom: 5px;
	}
    h3{
        color:coral
    }

    .info{
      margin-top: -20px;
      margin-bottom: 15px;
      font-size: 12px;
    }
  </style>
  <div class="user-card">
    <img id="image"/>
    <div>
      <h3></h3>
      <div class="info">
        <div><slot name="email" /></div>
        <div><slot name="phone" /></div>
        <div><slot name="address" /></div>
      </div>
      <button id="toggle-info">Hide Info</button>
    </div>
  </div>
`;

class UserCard extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  toggleInfo() {
    this.showInfo = !this.showInfo;

    const info = this.shadowRoot.querySelector('.info');
    const image = this.shadowRoot.querySelector('#image');
    const toggleBtn = this.shadowRoot.querySelector('#toggle-info');

    if (this.showInfo) {
      info.style.display = 'block';
      toggleBtn.innerText = 'Hide Info';
      delete image.removeAttribute('style');
    } else {
      info.style.display = 'none';
      toggleBtn.innerText = 'Show Info';
      image.style.borderRadius = 0;
    }
  }

  connectedCallback() {
    this.showInfo = true;
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');
    this.shadowRoot.querySelector('img').src = this.getAttribute('avatar');

    this.shadowRoot
      .querySelector('#toggle-info')
      .addEventListener('click', () => this.toggleInfo());
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('#toggle-info').removeEventListener();
  }
}

window.customElements.define('user-card', UserCard);
