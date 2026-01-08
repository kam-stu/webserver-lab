// New storage key so you don't keep the old seeded demo post
const STORAGE_KEY = "umagram_posts_v1";

let posts = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];

const feed = document.getElementById("feed");
const imageInput = document.getElementById("imageFile");
const preview = document.getElementById("preview");

function savePosts() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

/* =======================
   FEED
======================= */
function renderFeed() {
  if (!feed) return;

  if (posts.length === 0) {
    feed.innerHTML = `
      <div class="empty-state">
        <div style="font-weight:700; margin-bottom:6px;">No posts yet</div>
        <div>Add your first post with the “+ Add Post” button.</div>
      </div>
    `;
    return;
  }

  feed.innerHTML = "";
  posts.forEach((post, index) => {
    feed.innerHTML += `
      <div class="post">
        <img src="${post.image}" alt="post image">
        <div class="post-content">
          <div class="like-section">
            <button class="like-btn" onclick="likePost(${index})">❤️</button>
            <span>${post.likes} likes</span>
          </div>
          <div>${escapeHtml(post.caption)}</div>
        </div>
      </div>
    `;
  });
}

function likePost(index) {
  posts[index].likes++;
  savePosts();
  renderFeed();
}

/* =======================
   IMAGE PREVIEW
======================= */
if (imageInput) {
  imageInput.addEventListener("change", () => {
    const file = imageInput.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      preview.src = reader.result;
      preview.style.display = "block";
    };
    reader.readAsDataURL(file);
  });
}

/* =======================
   ADD POST
======================= */
function addPost() {
  const captionEl = document.getElementById("caption");
  const caption = captionEl ? captionEl.value.trim() : "";
  const file = imageInput ? imageInput.files[0] : null;

  if (!file || !caption) {
    alert("Please select an image and add a caption.");
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    posts.unshift({
      image: reader.result,   // Base64 data URL
      caption,
      likes: 0
    });

    savePosts();
    window.location.href = "index.html";
  };

  reader.readAsDataURL(file);
}

function cancelPost() {
  window.location.href = "index.html";
}

/* =======================
   BASIC SAFETY (caption)
======================= */
function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (ch) => {
    const map = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      "\"": "&quot;",
      "'": "&#39;"
    };
    return map[ch];
  });
}

renderFeed();
