console.log('running JS');

function hamburger() {
    const nav = document.querySelector('nav');
    nav.classList.toggle('expand');


}

function checkWidth() {
    const width = window.outerWidth || 0;
    const navCheck = document.querySelector('nav');
    
    if (width > 600) {
        navCheck.classList = "";
    }

}

 // Replace with your CSV export link
const sheetUrl = "https://t5sx8gvygh.execute-api.eu-west-2.amazonaws.com/Prod/sheet";

    // Get events data 
   axios.get(sheetUrl)
  .then(response => {
    const values = response.data.values; // Array of rows
    let html = "<ul>";
    values.slice(1).forEach(row => { // skip headers
      const [name, date, location] = row;
      html += `<li>${name} – ${date} - ${location}</li>`;
    });
    html += "</ul>";
    document.getElementById("data").innerHTML = html;
    console.log('running');
  })
  .catch(err => {
    document.getElementById("data").innerText = err.message || err;
    console.log(err.message);
  });
