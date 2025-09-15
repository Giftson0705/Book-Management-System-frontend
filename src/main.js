// src/main.js
import { setupLogin } from "./login.js";
import { setupSignup } from "./signup.js";
import { setupBooks } from "./books.js";
import { setupMyBooks } from "./mybooks.js";
import { setupAdminBooks } from "./admin_books.js";
import { setupAdminUsers } from "./admin_users.js";

// Read API base URL from env
export const API_BASE = import.meta.env.VITE_API_BASE_URL;

// Initialize all page modules
document.addEventListener("DOMContentLoaded", () => {
  setupLogin(document.getElementById("login"));
  setupSignup(document.getElementById("signup"));
  setupBooks(document.getElementById("books"));
  setupMyBooks(document.getElementById("mybooks"));
  setupAdminBooks(document.getElementById("admin_books"));
  setupAdminUsers(document.getElementById("admin_users"));

  // Show login section by default
  if (!localStorage.getItem("token")) {
    showSection("login");
  } else {
    showSection("books"); // or redirect based on role
  }
});

function showSection(id) {
  document.querySelectorAll(".page-section").forEach((s) => {
    s.style.display = s.id === id ? "block" : "none";
  });
  window.currentSection = id;
}

window.showSection = showSection;
