// // sept 10th update
// const token = localStorage.getItem("token");
// if (!token) window.location.href = "login.html";

// const booksList = document.getElementById("books-list");

// async function loadBooks() {
//   await hydrateRole(); // role from /auth/me
//   const res = await fetch(`${API_BASE}/books`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const books = await res.json();
//   renderBooks(books);
// }

// function renderBooks(books) {
//   console.log('Rendering books:', books);
//   booksList.innerHTML = "";
//   const role = localStorage.getItem("role") || "user";

//   books.forEach(book => {
//     const div = document.createElement("div");
//     div.className = "card";
//     div.innerHTML = `
//       <h3>${book.title}</h3>
//       <p><strong>Author:</strong> ${book.author}</p>
//       <p><strong>Status:</strong> ${book.available ? "Available ✅" : "Borrowed ❌"}</p>
//     `;

//     const userBorrowed = JSON.parse(localStorage.getItem("borrowed_books") || "[]");

//     if (role === "user") {
//       if (book.available) {
//         console.log('Book is available for borrowing:', book);
//         div.innerHTML += `<button onclick="borrowBook('${book.id}')">Borrow</button>`;
//         console.log('Book is available for borrowing:', book.id);
//       } else if (userBorrowed.includes(book._id)) {
//         div.innerHTML += `<button onclick="returnBook('${book.id}')">Return</button>`;
//       }
//     }

//     booksList.appendChild(div);
//   });
// }

// async function borrowBook(id) {
//   console.log('Book is available for borrowing:',id);
//   const res = await fetch(`${API_BASE}/books/${id}/borrow`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Borrow failed.");
//   }
//   await loadBooks();
// }

// async function returnBook(id) {
//   const res = await fetch(`${API_BASE}/books/${id}/return`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Return failed.");
//   }
//   await loadBooks();
// }

// // Initial load
// loadBooks();

// // ✅ Logout button
// document.getElementById("logout-btn")?.addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });

// const API_BASE = import.meta.env.VITE_API_URL;
// const token = localStorage.getItem("token");
// if (!token) window.location.href = "login.html";

// const booksList = document.getElementById("books-list");

// async function loadBooks() {
//   await hydrateRole(); // role from /auth/me
//   const res = await fetch(`${API_BASE}/books`, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const books = await res.json();
//   renderBooks(books);
// }

// function renderBooks(books) {
//   console.log('Rendering books:', books);
//   booksList.innerHTML = "";
//   const role = localStorage.getItem("role") || "user";

//   books.forEach(book => {
//     const div = document.createElement("div");
//     div.className = "card";
//     div.innerHTML = `
//       <h3>${book.title}</h3>
//       <p><strong>Author:</strong> ${book.author}</p>
//       <p><strong>Status:</strong> ${book.available ? "Available ✅" : "Borrowed ❌"}</p>
//     `;

//     const userBorrowed = JSON.parse(localStorage.getItem("borrowed_books") || "[]");

//     if (role === "user") {
//       if (book.available) {
//         console.log('Book is available for borrowing:', book);
//         div.innerHTML += `<button onclick="borrowBook('${book.id}')">Borrow</button>`;
//         console.log('Book is available for borrowing:', book.id);
//       } else if (userBorrowed.includes(book._id)) {
//         div.innerHTML += `<button onclick="returnBook('${book.id}')">Return</button>`;
//       }
//     }

//     booksList.appendChild(div);
//   });
// }

// async function borrowBook(id) {
//   console.log('Book is available for borrowing:', id);
//   const res = await fetch(`${API_BASE}/books/${id}/borrow`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Borrow failed.");
//   }
//   await loadBooks();
// }

// async function returnBook(id) {
//   const res = await fetch(`${API_BASE}/books/${id}/return`, {
//     method: "POST",
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (!res.ok) {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Return failed.");
//   }
//   await loadBooks();
// }

// // Initial load
// loadBooks();

// // ✅ Logout button
// document.getElementById("logout-btn")?.addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });


import { API_BASE } from "./main.js";

export function setupBooks(container) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.showSection("login");
    return;
  }

  const booksList = container.querySelector("#books-list");
  const logoutBtn = container.querySelector("#logout-btn-books");

  async function hydrateRole() {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.ok) {
      const me = await res.json();
      localStorage.setItem("role", me.role || "user");
      localStorage.setItem("user_id", me.user_id);
      localStorage.setItem("username", me.username);
    } else {
      localStorage.clear();
      window.showSection("login");
    }
  }

  async function loadBooks() {
    await hydrateRole();
    try {
      const res = await fetch(`${API_BASE}/books`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        booksList.innerHTML = "<p>Error loading books.</p>";
        return;
      }
      const books = await res.json();
      renderBooks(books);
    } catch {
      booksList.innerHTML = "<p>Error loading books.</p>";
    }
  }

  function renderBooks(books) {
    booksList.innerHTML = "";
    const role = localStorage.getItem("role") || "user";
    books.forEach((book) => {
      const div = document.createElement("div");
      div.className = "card";
      div.innerHTML = `
        <h3>${book.title}</h3>
        <p><strong>Author:</strong> ${book.author}</p>
        <p><strong>Genre:</strong> ${book.genre || "N/A"}</p>
        <p><strong>Status:</strong> ${book.available ? "Available ✅" : "Borrowed ❌"}</p>
      `;

      if (role === "user" && book.available) {
        const borrowBtn = document.createElement("button");
        borrowBtn.textContent = "Borrow";
        borrowBtn.onclick = () => borrowBook(book._id);
        div.appendChild(borrowBtn);
      }
      booksList.appendChild(div);
    });
  }

  async function borrowBook(id) {
    try {
      const res = await fetch(`${API_BASE}/books/${id}/borrow`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        alert(data.detail || "Borrow failed.");
      }
      await loadBooks();
    } catch {
      alert("Borrow failed due to network error.");
    }
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.clear();
    window.showSection("login");
  });

  loadBooks();
}

