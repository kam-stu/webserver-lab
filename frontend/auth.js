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
    if (err.toString().includes("SQL syntax")) {
      alert("failed to create user: not proper SQL syntax");
    } else {
      alert(err);
    }
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
    if (err.toString().includes("SQL syntax")) {
      alert("failed to login: not proper SQL syntax");
    } else {
      alert(err);
    }
  }
}

function logout() {
  localStorage.removeItem("user");
  document.getElementById("auth-container").style.display = "block";
  document.getElementById("main-container").style.display = "none";
}

function showMain() {
  document.getElementById("auth-container").style.display = "none";
  document.getElementById("main-container").style.display = "block";
  loadFeed();
}

window.onload = () => {
  if (localStorage.getItem("user")) {
    showMain();
  }
};

