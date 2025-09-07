const API_URL = "http://localhost:5000/api";

// Auto-fill location
async function autoFillLocation() {
    try {
        let res = await fetch("https://ipinfo.io/json?token=YOUR_TOKEN");
        let data = await res.json();
        if (data.loc) {
            let [lat, lon] = data.loc.split(",");
            document.getElementById("lat").value = lat;
            document.getElementById("lon").value = lon;
        }
    } catch (err) { console.error(err); }
}
autoFillLocation();

document.getElementById("reportForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const type = document.getElementById("type").value;
    const description = document.getElementById("description").value;
    const lat = document.getElementById("lat").value;
    const lon = document.getElementById("lon").value;
    const photoFile = document.getElementById("photo").files[0];

    try {
        // Create user
        let userRes = await fetch(`${API_URL}/users`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });
        if (!userRes.ok) throw new Error("Failed to create user");
        let user = await userRes.json();

        // Upload photo if exists
        let photoUrl = "";
        if (photoFile) {
            photoUrl = await toBase64(photoFile);
            await fetch(`${API_URL}/photos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: photoUrl }),
            });
        }

        // Submit report
        let reportRes = await fetch(`${API_URL}/reports`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                user: user._id,
                type,
                description,
                photo: photoUrl,
                location: { lat, lon },
                validated: false
            }),
        });

        if (!reportRes.ok) throw new Error("Failed to submit report");
        let data = await reportRes.json();

        console.log("Report submitted:", data.report);
        console.log("User summary:", data.user_summary);

        // Show alert + update HTML gamification
        alert(`Report submitted! Points: ${data.user_summary.points}, Badges: ${data.user_summary.badges.join(", ")}`);
        document.getElementById("points").innerText = data.user_summary.points;
        document.getElementById("badges").innerText = data.user_summary.badges.join(", ") || "None";

        loadReports();
    } catch (err) {
        console.error(err);
        alert("❌ Failed to submit report");
    }
});

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = err => reject(err);
    });
}

async function loadReports() {
    let res = await fetch(`${API_URL}/reports`);
    let reports = await res.json();

    let reportsDiv = document.getElementById("reports");
    reportsDiv.innerHTML = "";

    reports.forEach(r => {
        let card = document.createElement("div");
        card.className = "report-card";
        card.innerHTML = `
            <b>Type:</b> ${r.type}<br>
            <b>Description:</b> ${r.description}<br>
            <b>Location:</b> ${r.location?.lat}, ${r.location?.lon}<br>
            <b>Status:</b> ${r.status}<br>
            ${r.photo ? `<img src="${r.photo}" width="200"/>` : ""}
        `;
        reportsDiv.appendChild(card);
    });
}

loadReports();
