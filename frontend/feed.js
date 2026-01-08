// Load feed posts dynamically
async function loadFeed() {
  try {
    const res = await fetch("/feed"); // Make sure your /feed route returns JSON
    if (!res.ok) throw new Error("Failed to load feed");

    const posts = await res.json();
    const feedContainer = document.getElementById("feed");
    feedContainer.innerHTML = ""; // Clear old posts

    posts.forEach(post => {
      const card = document.createElement("div");
      card.classList.add("feed-card");

      // Build card HTML
      card.innerHTML = `
        <div class="feed-card-header">
          <div class="avatar"></div>
          <div class="username">${post.username}</div>
        </div>
        <img src="/media/${post.image_path}" alt="Post Image">
        <div class="feed-card-caption">${post.caption}</div>
      `;

      feedContainer.appendChild(card);
    });
  } catch (err) {
    console.error(err);
    const feedContainer = document.getElementById("feed");
    feedContainer.innerHTML = `<p style="color:#f55;">Failed to load feed</p>`;
  }
}

// Auto-load feed when main page is displayed
window.addEventListener("load", () => {
  if (localStorage.getItem("user")) {
    loadFeed();
  }
});
