document.addEventListener("DOMContentLoaded", () => {
  let username = document.getElementById("username");
  let text = document.getElementById("text");
  let img = document.getElementById("img");
  let postBtn = document.getElementById("post-btn");
  let delBtn = document.getElementById("del-btn");
  let posts = document.getElementById("posts");
  let form = document.getElementById("post-form");

  form.onsubmit = (e) => {
    console.log("submitting......");

    e.preventDefault();
    const post = async () => {
      try {
        let res = await fetch(
          "https://68219a10259dad2655afc1c9.mockapi.io/post",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: username.value,
              textarea: text.value,
              img: img.value,
            }),
          }
        );
        let data = await res.json();
        let post = document.createElement("div");
        let imgPost = document.createElement("img");
        let userName = document.createElement("div");
        let postContent = document.createElement("div");
        post.classList.add("card", "post");

        userName.innerText = data.username;
        userName.classList.add("post-username");
        post.appendChild(userName);

        imgPost.src = data.img;
        post.appendChild(imgPost);
        imgPost.classList.add("img-post");
        postContent.innerText = data.textarea;
        postContent.classList.add("post-content");

        post.appendChild(postContent);

        posts.appendChild(post);
      } catch (err) {
        console.log(err);
      }
    };
    // Validate user
    if (localStorage.getItem("username") === username.value) {
      alert("thank you, you already posted");
    } else {
      if (username.value.length < 4) {
        alert("Your username has to be longer than 4 characters");
      } else {
        if (text.value.length < 6) {
          alert(
            "Please provide a longer text (text has to be longer than 6 characters"
          );
        } else {
          localStorage.setItem("username", username.value);

          post();
        }
      }
    }
  };

  delBtn.onclick = () => {
    const del = async (id) => {
      try {
        const res = await fetch(
          `https://68219a10259dad2655afc1c9.mockapi.io/post`
        );
        const data = await res.json();
        data.map(d => console.log(d.id))
        for (const p of data) {
          await fetch(
            `https://68219a10259dad2655afc1c9.mockapi.io/post/${p.id}`,
            {
              method: "DELETE",
            }
          );
        }
        let post = document.getElementsByClassName("post")[0];
        posts.remove(post);
      } catch (err) {
        console.log(err);
      }
    };
    del();
  };
});
