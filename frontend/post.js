async function createPost() {
  const user = JSON.parse(localStorage.getItem("user"));
  if (!user) {
    alert("You must be logged in to post!");
    return;
  }

  const caption = document.getElementById("caption").value;
  const image = document.getElementById("image").files[0];

  if (!image) {
    alert("Please select an image!");
    return;
  }

  const form = new FormData();
  form.append("user_id", user.id);
  form.append("content", caption);
  form.append("image", image);

  try {
    const res = await fetch("/post", { method: "POST", body: form });
    const data = await res.json();
    if (data.success) {
      alert("Post created!");
      loadFeed();
      document.getElementById("caption").value = "";
      document.getElementById("image").value = "";
    } else {
      alert("failed to post: not proper SQL syntax");
    }
  } catch (err) {
    if (err.toString().includes("SQL syntax")) {
      alert("failed to post: not proper SQL syntax");
    } else {
      alert(err);
    }
  }
}

