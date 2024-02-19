const template = document.createElement('template');
template.innerHTML = `
  <style>
    .main{
        width: 100%; --tw-bg-opacity: 1;
        background-color: #333360;
        color: white;
        padding:15px
    }
    .heading{
        font-weight: bold;
        font-size:13px;
    }
    .sub-container{
        display: flex;
        justify-content: center;
        vertical-align: middle;
        margin-top: 10px;
    }
    .metric-container{
        display: flex; 
        width: 100%;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .metric-text{
        --tw-text-opacity: 1;
        color: rgb(156 163 175 / var(--tw-text-opacity));
        font-size: 12px;
    }
    .metric-value{
        font-weight: bold;
        font-size: 20px;
    }

    .divider{
        border-right: 2px solid #aaa;
      }
  </style>
  <div class='main'>
      <div class='heading'></div>
      <div class='sub-container '>
        <div class='metric-container divider' id="mc1">
          <div class='metric-text' id="text1"></div>
          <div class='metric-value' style="color:red" id="value1"></div>
        </div>
        <div class='metric-container divider ' id="mc2">
          <div class='metric-text' id="text2"> </div>
          <div class='metric-value' id="value2"></div>
        </div>
        <div class='metric-container ' id="mc3">
          <div class='metric-text' id="text3"> </div>
          <div class='metric-value ' id="value3"></div>
        </div>
      </div>
    </div>
`;

class MetricCards extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.heading').innerText =
      this.getAttribute('heading');
    // Div1
    this.shadowRoot.querySelector('#text1').innerText =
      this.getAttribute('text1');
    const value1 = this.getAttribute('value1') || '';
    this.shadowRoot.querySelector('#value1').innerText = value1;
    this.shadowRoot.querySelector('#value1').style.color =
      this.getAttribute('value1Color') || '';
    if (!value1.trim()) {
      this.shadowRoot.querySelector('#mc1').style.display = 'none';
    }

    //Div2
    this.shadowRoot.querySelector('#text2').innerText =
      this.getAttribute('text2');
    const value2 = this.getAttribute('value2') || '';
    this.shadowRoot.querySelector('#value2').innerText = value2;
    this.shadowRoot.querySelector('#value2').style.color =
      this.getAttribute('value2Color') || '';
    if (!value2.trim()) {
      this.shadowRoot.querySelector('#mc2').style.display = 'none';

      this.shadowRoot.querySelector('#mc1').style.borderRight = 'none';
    }

    // Div3
    this.shadowRoot.querySelector('#text3').innerText =
      this.getAttribute('text3');
    const value3 = this.getAttribute('value3') || '';
    this.shadowRoot.querySelector('#value3').innerText = value3;
    this.shadowRoot.querySelector('#value3').style.color =
      this.getAttribute('value3Color') || '';
    if (!value3.trim()) {
      this.shadowRoot.querySelector('#mc3').style.display = 'none';
      this.shadowRoot.querySelector('#mc2').style.borderRight = 'none';
    }
  }
}

window.customElements.define('metric-card', MetricCards);
