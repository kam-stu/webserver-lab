async function createPost() {
  const user_id = document.getElementById("userId").value;
  const caption = document.getElementById("caption").value;
  const image = document.getElementById("image").files[0];

  const form = new FormData();
  form.append("user_id", user_id);
  form.append("content", caption);
  form.append("image", image);

  const res = await fetch("/post", {
    method: "POST",
    body: form
  });

  const text = await res.text();
  alert(text);
}

