async function createUser() {
  const username = document.getElementById("newUser").value;
  const password = document.getElementById("newPass").value;

  try {
    const res = await fetch("/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      showMain();
    } else {
      alert("Error creating user");
    }
  } catch (err) {
    alert(err);
  }
}

async function login() {
  const username = document.getElementById("loginUser").value;
  const password = document.getElementById("loginPass").value;

  try {
    const res = await fetch("/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (data.success) {
      localStorage.setItem("user", JSON.stringify(data.user));
      showMain();
    } else {
      alert("Invalid credentials");
    }
  } catch (err) {
    alert(err);
  }
}

/* ===========================
   LOGOUT (FIXES ADMIN LEAK)
   =========================== */
function logout() {
  localStorage.removeItem("user");

  // Hide main UI, show auth UI
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("main-container").style.display = "none";

  // 🔥 REMOVE ADMIN BUTTON IF PRESENT
  const adminBtn = document.getElementById("admin-btn");
  if (adminBtn) adminBtn.remove();
}

/* ===========================
   MAIN PAGE LOADER
   =========================== */
function showMain() {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("main-container").style.display = "block";

  loadFeed();
  addAdminButtonIfNeeded();
}

/* ===========================
   ADMIN BUTTON LOGIC (FIXED)
   =========================== */
function addAdminButtonIfNeeded() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user || user.role !== "admin") return;

  const header = document.querySelector("header");
  if (!header) return;

  // Prevent duplicates
  const existing = document.getElementById("admin-btn");
  if (existing) existing.remove();

  const adminBtn = document.createElement("button");
  adminBtn.id = "admin-btn";
  adminBtn.textContent = "Admin Panel";
  adminBtn.onclick = () => {
    window.location.href = "/admin.html";
  };

  header.appendChild(adminBtn);
}

/* ===========================
   AUTO LOGIN ON PAGE LOAD
   =========================== */
window.onload = () => {
  if (localStorage.getItem("user")) {
    showMain();
  }
};

