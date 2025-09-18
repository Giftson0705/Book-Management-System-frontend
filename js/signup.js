// sept 9th update
const API_BASE = "https://book-management-system-t7my.onrender.com/api/v1";
document.getElementById("signup-form").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
document.querySelector(".loader").style.display = "block";
  try {
    const res = await fetch(`${API_BASE}/auth/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email, password, role: "user" })
    });
    console.log("load")
    document.querySelector(".loader").style.display = "block";
    // Try to parse JSON, but guard bad gateways
    let data = null;
    try { data = await res.json(); } catch {}

    if (res.ok) {
      alert("Signup successful ✅ Please login.");
      window.location.href = "login.html";
    } else {
      document.querySelector(".loader").style.display = "none";
      document.getElementById("message").innerText =
        (data && (data.detail || data.message)) || `Signup failed (${res.status}) ❌`;
    }
  } catch (err) {
    document.querySelector(".loader").style.display = "none";
    document.getElementById("message").innerText = "Error connecting to server ❌";
  }
});


