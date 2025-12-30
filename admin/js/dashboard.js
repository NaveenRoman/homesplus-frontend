/* ===============================
   CONFIG
================================ */
const API_BASE = "https://homesplus-backend1-1.onrender.com/api/admin";
const token = localStorage.getItem("homesplus_token");

/* ===============================
   AUTH CHECK
================================ */
if (!token) {
  alert("Admin not logged in");
  window.location.href = "../index.html";
}

/* ===============================
   LOGOUT
================================ */
document.getElementById("logoutBtn").addEventListener("click", () => {
  localStorage.removeItem("homesplus_token");
  window.location.href = "../index.html";
});

/* ===============================
   FETCH STATS
================================ */
async function loadStats() {
  const res = await fetch(`${API_BASE}/stats`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const data = await res.json();

  document.getElementById("totalUsers").textContent = data.totalUsers;
  document.getElementById("verifiedUsers").textContent = data.verifiedUsers;
  document.getElementById("totalInquiries").textContent = data.inquiries;
}

/* ===============================
   FETCH USERS
================================ */
async function loadUsers() {
  const res = await fetch(`${API_BASE}/users`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const users = await res.json();
  const tbody = document.getElementById("usersTable");
  tbody.innerHTML = "";

  users.forEach(u => {
    tbody.innerHTML += `
      <tr>
        <td>${u.email}</td>
        <td>${u.verified ? "✅" : "❌"}</td>
        <td>${new Date(u.createdAt).toLocaleString()}</td>
      </tr>
    `;
  });
}

/* ===============================
   FETCH INQUIRIES
================================ */
async function loadInquiries() {
  const res = await fetch(`${API_BASE}/inquiries`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  const inquiries = await res.json();
  const tbody = document.getElementById("inquiriesTable");
  tbody.innerHTML = "";

  inquiries.forEach(i => {
    tbody.innerHTML += `
      <tr>
        <td>${i.email}</td>
        <td>${i.propertyId || "-"}</td>
        <td>${i.message || "-"}</td>
        <td>${new Date(i.createdAt).toLocaleString()}</td>
      </tr>
    `;
  });
}

/* ===============================
   INITIAL LOAD
================================ */
loadStats();
loadUsers();
loadInquiries();

/* ===============================
   AUTO REFRESH (15s)
================================ */
setInterval(() => {
  loadStats();
  loadUsers();
  loadInquiries();
}, 15000);
