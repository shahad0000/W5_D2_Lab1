document.addEventListener("DOMContentLoaded", () => {
  let username = document.getElementById("username");
  let text = document.getElementById("text");
  let img = document.getElementById("img");
  let postBtn = document.getElementById("post-btn");
  let delBtn = document.getElementById("del-btn");
  let posts = document.getElementById("posts");


  postBtn.onclick = () => {
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
              img: img.value
            }),
          }
        );
        let data = await res.json()
        console.log(data)
        let post = document.createElement("div");
        let imgPost = document.createElement("img");
        let userName = document.createElement("div");
        let postContent = document.createElement("div");
        post.classList.add("card", "post");
       
        userName.innerText = data.username;
        post.appendChild(userName);

        imgPost.src = data.img;
        post.appendChild(imgPost)
        imgPost.classList.add("img-post")
        postContent.innerText = data.textarea;
        post.appendChild(postContent);

        posts.appendChild(post)

      } catch (err) {
        console.log(err);
      }
    };
    post();
  };


  delBtn.onclick = () => {
    const del = async () => {
      try {
        const res = await fetch(
          "https://68219a10259dad2655afc1c9.mockapi.io/post/1",
          {
            method: "DELETE",
          }
        );
        let post = document.getElementsByClassName("post")[0];
        posts.remove(post)
      } catch (err) {
        console.log(err);
      }
    };
    del()
  };
});
