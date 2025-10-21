

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
  const sheetUrl = "https://vaqfbudggg.execute-api.eu-west-2.amazonaws.com/Prod/sheet";

  // Load Google Sheets content
  axios.get(sheetUrl)
    .then((response) => {
      const [upcoming, recent] = response.data.valueRanges;

      // Upcoming performances
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

      // Recent work
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
    })
    .catch((err) => {
      console.error("Axios error:", err);
      document.getElementById("upcoming").innerText = "Error loading data";
      document.getElementById("recent-work").innerText = "Error loading data";
    });
});

// Form submission
document.getElementById("contact-form").addEventListener("submit", async (e) => {
  e.preventDefault();

   // 🛡️ Anti-bot honeypot check
  const honeypot = e.target.company.value;
  if (honeypot) {
    console.warn("Spam submission detected — blocked.");
    return; // Stop bots silently
  }
  
  const formData = {
    name: e.target.name.value,
    email: e.target.email.value,
    message: e.target.message.value,
  };

  try {
    await axios.post(
      "https://vaqfbudggg.execute-api.eu-west-2.amazonaws.com/Prod/contact",
      formData
    );
    alert("Message sent!");
    e.target.reset();
  } catch (err) {
    console.error(err);
    alert("Error sending message");
  }
});
