

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
    const [upcoming, recent] = response.data.valueRanges;

      // Performances
    let perfHtml = "<ul>";
    performances.values.slice(1).forEach(([name, date, location,]) => {
      perfHtml += `<li>${name} – ${date} - ${location}</li>`;
    });
    perfHtml += "</ul>";
    document.getElementById("upcoming").innerHTML = perfHtml;


    // Recent Work
    let projHtml = "<ul>";
    projects.values.slice(1).forEach(([name, date, location, description]) => {
      projHtml += `<li><strong>${name}</strong> (${date}) - ${location} — ${description}</li>`;
    });
    projHtml += "</ul>";
    document.getElementById("recent-work").innerHTML = projHtml;
  })
  .catch(err => {
    document.getElementById("upcoming").innerText = err.message || err;
    document.getElementById("recent-work").innerText = err.message || err;
  });
