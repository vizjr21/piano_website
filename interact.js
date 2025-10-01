

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

  document.addEventListener("DOMContentLoaded", () => {
  console.log("Running frontend script");

  const sheetUrl = "https://vaqfbudggg.execute-api.eu-west-2.amazonaws.com/Prod/sheet";

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

 document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      email: e.target.email.value,
      message: e.target.message.value,
    };

    try {
      await axios.post("https://vaqfbudggg.execute-api.eu-west-2.amazonaws.com/Prod/sheet", formData);
      alert("Message sent!");
    } catch (err) {
      console.error(err);
      alert("Error sending message");
    }
  });