async function loadUsers() {
  const res = await fetch("/search_users");
  const data = await res.json();

  const container = document.getElementById("users");
  container.innerHTML = "";

  data.users.forEach(u => {
    const div = document.createElement("div");
    div.className = "feed-card";
    div.innerHTML = `
      <div class="feed-card-caption">
        <strong>ID:</strong> ${u.user_id}<br>
        <strong>Username:</strong> ${u.username}<br>
        <strong>Password:</strong> ${u.password}<br>
        <button onclick="deleteUser(${u.user_id})">Delete User</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function loadPosts() {
  const res = await fetch("/search_posts");
  const data = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  data.posts.forEach(p => {
    const div = document.createElement("div");
    div.className = "feed-card";
    div.innerHTML = `
      <img src="/media/${p.image_path}">
      <div class="feed-card-caption">
        <strong>Post ID:</strong> ${p.post_id}<br>
        <strong>User:</strong> ${p.username} (ID ${p.user_id})<br>
        <strong>Caption:</strong> ${p.caption}<br>
        <button onclick="deletePost(${p.post_id})">Delete Post</button>
      </div>
    `;
    container.appendChild(div);
  });
}

async function deleteUser(user_id) {
  if (!confirm("Delete user and ALL posts?")) return;

  await fetch("/delete_user", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id })
  });

  loadUsers();
  loadPosts();
}

async function deletePost(post_id) {
  if (!confirm("Delete this post?")) return;

  await fetch("/delete_post", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ post_id })
  });

  loadPosts();
}

window.onload = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  // 🚨 Client-side only "protection"
  if (!user || user.role !== "admin") {
    alert("Admins only");
    window.location.href = "/";
    return;
  }

  loadUsers();
  loadPosts();
};

