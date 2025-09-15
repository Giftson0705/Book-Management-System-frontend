// // sept 10th update

// // const ADMIN_USERS_API = `${API_BASE}/admin/users`;
// // const API_BASE = import.meta.env.VITE_API_URL;
// const API_BASE = "https://book-management-system-t7my.onrender.com/api/v1";
// const ADMIN_USERS_API = `${API_BASE}/admin/users`;
// const token = localStorage.getItem("token");

// if (!token) window.lsocation.href = "login.html";

// const usersList = document.getElementById("admin-users-list");

// async function fetchUsers() {
//   await hydrateRole(); // make sure role is fresh
//   const res = await fetch(ADMIN_USERS_API, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const users = await res.json();
//   renderUsers(users);
// }

// function renderUsers(users) {
//   usersList.innerHTML = "";
//   if (!users.length) {
//     usersList.innerHTML = "<p>No users found.</p>";
//     return;
//   }

//   for (const user of users) {
//     const card = document.createElement("div");
//     card.className = "card";
//     const borrowed = (user.borrowed_books || []).length
//       ? `<ul>${user.borrowed_books.map(b => `<li>${b}</li>`).join("")}</ul>`
//       : "None";

//     card.innerHTML = `
//       <h3>${user.username}</h3>
//       <p><strong>Email:</strong> ${user.email || "N/A"}</p>
//       <p><strong>Role:</strong> ${user.role}</p>
//       <p><strong>Borrowed Books:</strong> ${borrowed}</p>
//       <button onclick="changeRole('${user.user_id}', '${user.role}')">🔑 Change Role</button>
//       <button onclick="deleteUser('${user.user_id}')">🗑 Delete</button>
//     `;
//     usersList.appendChild(card);
//   }
// }

// async function changeRole(userId, currentRole) {
//   const newRole = currentRole === "admin" ? "user" : "admin";
//   const res = await fetch(`${ADMIN_USERS_API}/${userId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ new_role: newRole })
//   });
//   if (res.ok) {
//     alert(`Role updated to ${newRole}!`);
//     fetchUsers();
//   } else {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Error updating role.");
//   }
// }

// async function deleteUser(userId) {
//   if (!confirm("Are you sure you want to delete this user?")) return;
//   const res = await fetch(`${ADMIN_USERS_API}/${userId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (res.ok) {
//     alert("User deleted!");
//     fetchUsers();
//   } else {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Error deleting user.");
//   }
// }

// document.getElementById("logout-btn")?.addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });

// fetchUsers();

// const API_BASE = import.meta.env.VITE_API_URL;
// const ADMIN_USERS_API = `${API_BASE}/admin/users`;
// const token = localStorage.getItem("token");

// if (!token) window.location.href = "login.html";

// const usersList = document.getElementById("admin-users-list");

// async function fetchUsers() {
//   await hydrateRole(); // make sure role is fresh
//   const res = await fetch(ADMIN_USERS_API, {
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   const users = await res.json();
//   renderUsers(users);
// }

// function renderUsers(users) {
//   usersList.innerHTML = "";
//   if (!users.length) {
//     usersList.innerHTML = "<p>No users found.</p>";
//     return;
//   }

//   for (const user of users) {
//     const card = document.createElement("div");
//     card.className = "card";
//     const borrowed = (user.borrowed_books || []).length
//       ? `<ul>${user.borrowed_books.map(b => `<li>${b}</li>`).join("")}</ul>`
//       : "None";

//     card.innerHTML = `
//       <h3>${user.username}</h3>
//       <p><strong>Email:</strong> ${user.email || "N/A"}</p>
//       <p><strong>Role:</strong> ${user.role}</p>
//       <p><strong>Borrowed Books:</strong> ${borrowed}</p>
//       <button onclick="changeRole('${user.user_id}', '${user.role}')">🔑 Change Role</button>
//       <button onclick="deleteUser('${user.user_id}')">🗑 Delete</button>
//     `;
//     usersList.appendChild(card);
//   }
// }

// async function changeRole(userId, currentRole) {
//   const newRole = currentRole === "admin" ? "user" : "admin";
//   const res = await fetch(`${ADMIN_USERS_API}/${userId}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`
//     },
//     body: JSON.stringify({ new_role: newRole })
//   });
//   if (res.ok) {
//     alert(`Role updated to ${newRole}!`);
//     fetchUsers();
//   } else {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Error updating role.");
//   }
// }

// async function deleteUser(userId) {
//   if (!confirm("Are you sure you want to delete this user?")) return;
//   const res = await fetch(`${ADMIN_USERS_API}/${userId}`, {
//     method: "DELETE",
//     headers: { Authorization: `Bearer ${token}` }
//   });
//   if (res.ok) {
//     alert("User deleted!");
//     fetchUsers();
//   } else {
//     const data = await res.json().catch(() => ({}));
//     alert(data.detail || "Error deleting user.");
//   }
// }

// document.getElementById("logout-btn")?.addEventListener("click", () => {
//   localStorage.clear();
//   window.location.href = "login.html";
// });

// fetchUsers();


import { API_BASE } from "./main.js";

export function setupAdminUsers(container) {
  const token = localStorage.getItem("token");
  if (!token) {
    window.showSection("login");
    return;
  }

  const usersList = container.querySelector("#admin-users-list");
  const logoutBtn = container.querySelector("#logout-btn-adminusers");

  async function fetchUsers() {
    try {
      const res = await fetch(`${API_BASE}/admin/users`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        usersList.innerHTML = "<p>Error loading users.</p>";
        return;
      }
      const users = await res.json();
      renderUsers(users);
    } catch {
      usersList.innerHTML = "<p>Error loading users.</p>";
    }
  }

  function renderUsers(users) {
    usersList.innerHTML = "";
    if (!users.length) {
      usersList.innerHTML = "<p>No users found.</p>";
      return;
    }
    users.forEach((user) => {
      const card = document.createElement("div");
      card.className = "card";

      const borrowed = (user.borrowed_books || []).length
        ? `<p><strong>Borrowed Books:</strong> ${user.borrowed_books.length}</p>`
        : "";

      card.innerHTML = `
        <h3>${user.username || "No Username"}</h3>
        <p><strong>Email:</strong> ${user.email || "N/A"}</p>
        <p><strong>Role:</strong> ${user.role}</p>
        ${borrowed}
      `;

      const changeRoleBtn = document.createElement("button");
      changeRoleBtn.textContent =
        user.role === "admin" ? "Change to User" : "Change to Admin";
      changeRoleBtn.onclick = () => changeRole(user._id, user.role);

      const deleteUserBtn = document.createElement("button");
      deleteUserBtn.textContent = "Delete User";
      deleteUserBtn.onclick = () => deleteUser(user._id);

      card.appendChild(changeRoleBtn);
      card.appendChild(deleteUserBtn);

      usersList.appendChild(card);
    });
  }

  async function changeRole(userId, currentRole) {
    const newRole = currentRole === "admin" ? "user" : "admin";
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ new_role: newRole }),
      });
      if (res.ok) {
        alert(`Role updated to ${newRole}!`);
        fetchUsers();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.detail || "Error updating role.");
      }
    } catch {
      alert("Error updating role.");
    }
  }

  async function deleteUser(userId) {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const res = await fetch(`${API_BASE}/admin/users/${userId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        alert("User deleted!");
        fetchUsers();
      } else {
        const data = await res.json().catch(() => ({}));
        alert(data.detail || "Error deleting user.");
      }
    } catch {
      alert("Error deleting user.");
    }
  }

  logoutBtn?.addEventListener("click", () => {
    localStorage.clear();
    window.showSection("login");
  });

  fetchUsers();
}
