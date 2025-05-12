document.addEventListener("DOMContentLoaded", () => {
  let username = document.getElementById("username");
  let text = document.getElementById("text");
  let img = document.getElementById("img");
  let postBtn = document.getElementById("post-btn");
  let delBtn = document.getElementById("del-btn");

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
      } catch (err) {
        console.log(err);
      }
    };
    del();
  };
});
