

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

/* 
 // Replace with your CSV export link
const sheetUrl = "https://t5sx8gvygh.execute-api.eu-west-2.amazonaws.com/Prod/sheet";

    // Get events data 
   axios.get(sheetUrl)
  .then(response => {
    const [upcoming, recent] = response.data.valueRanges;

      // Performances
    let perfHtml = "<ul>";
    (upcoming.values || []).slice(1).forEach(([name, date, location]) => {
      perfHtml += `<li>${name} – ${date} - ${location}</li>`;
    });
    perfHtml += "</ul>";
    document.getElementById("upcoming").innerHTML = perfHtml;


    // Recent Work
    let projHtml = "<ul>";
     (recent.values || []).slice(1).forEach(([name, date, location, description]) => {
      projHtml += `<li><strong>${name}</strong> (${date}) - ${location} — ${description}</li>`;
    });
    projHtml += "</ul>";
    document.getElementById("recent-work").innerHTML = projHtml;
  })
  .catch(err => {
    document.getElementById("upcoming").innerText = err.message || err;
    document.getElementById("recent-work").innerText = err.message || err;
  });

  */

  document.addEventListener("DOMContentLoaded", () => {
  console.log("Running frontend script");

  const sheetUrl = "https://t5sx8gvygh.execute-api.eu-west-2.amazonaws.com/Prod/sheet";

  axios.get(sheetUrl)
    .then(response => {
      // valueRanges contains both tabs
      const [upcoming, recent] = response.data.valueRanges;

      // ----------------------------
      // Upcoming Performances
      // ----------------------------
      let perfHtml = "<ul>";
      if (upcoming.values && upcoming.values.length > 1) {
        upcoming.values.slice(1).forEach(([name, date, location]) => {
          perfHtml += `<li>${name} – ${date} – ${location}</li>`;
        });
      } else {
        perfHtml += "<li>No upcoming performances</li>";
      }
      perfHtml += "</ul>";
      document.getElementById("upcoming").innerHTML = perfHtml;

      // ----------------------------
      // Recent Work / Projects
      // ----------------------------
      let projHtml = "<ul>";
      if (recent.values && recent.values.length > 1) {
        recent.values.slice(1).forEach(([name, date, location, description]) => {
          projHtml += `<li><strong>${name}</strong> (${date}) – ${location} — ${description}</li>`;
        });
      } else {
        projHtml += "<li>No recent projects</li>";
      }
      projHtml += "</ul>";
      document.getElementById("recent-work").innerHTML = projHtml;

      console.log("Data loaded successfully");
    })
    .catch(err => {
      console.error("Axios error:", err);
      document.getElementById("upcoming").innerText = "Error loading data";
      document.getElementById("recent-work").innerText = "Error loading data";
    });
});
