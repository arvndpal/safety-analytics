const template = document.createElement('template');
template.innerHTML = `

  <style>
  #table-wrapper {
    position:relative;
    
  }
  #table-scroll {
    height:250px;
    overflow:auto;  
    margin-top:20px;
  }
  
  table{
    width:100%;
  }
  table, th, td {
    border: 1px solid black;
    border-collapse: collapse;
  }
  th, td{ 
    padding: 5px 10px;
  }
	
  tr:nth-child(1) th {
    background: white;
    position: sticky;
    top: 0;
    z-index: 10; 
  }

  .table-scroll::-webkit-scrollbar {
    width: 5px;
    height: 3px;
    border-radius: 2px;
  }

  .table-scroll::-webkit-scrollbar-track {
    background: #ffffff;
  }

  .table-scroll::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 50px;
  }

  .table-scroll::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  </style> 


  <h3></h3>
  <div id="table-wrapper" >
    <div id="table-scroll" class=" table-scroll">
    </div>
  </div>
`;

class BasicTable extends HTMLElement {
  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('name');

    const rows = JSON.parse(this.getAttribute('rows'));
    const heads = JSON.parse(this.getAttribute('heads'));
    console.log(rows, heads);

    var tbl = document.createElement('table');
    var tblBody = document.createElement('tbody');

    var headRow = document.createElement('tr');
    for (let i = 0; i < heads.length; i++) {
      var cell = document.createElement('th');
      var nameCellText = document.createTextNode(heads[i].headerName);
      cell.appendChild(nameCellText);
      headRow.appendChild(cell);
    }

    tblBody.appendChild(headRow);

    for (var j = 0; j < rows.length; j++) {
      var row = document.createElement('tr');
      // row.setAttribute('id', 'row_' + j);

      for (let i = 0; i < heads.length; i++) {
        cell = document.createElement('td');
        var addressCellText = document.createTextNode(
          rows[j][heads[i].fieldName]
        );
        cell.appendChild(addressCellText);
        row.appendChild(cell);
      }
      tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    this.shadowRoot.querySelector('#table-scroll').appendChild(tbl);
    // tbl.setAttribute('border', '2');
  }
}

window.customElements.define('basic-table', BasicTable);
