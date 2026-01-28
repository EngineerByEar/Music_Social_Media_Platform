document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");

// javascript - client: send JSON via POST and handle non-OK responses
btn.addEventListener("click", async function () {
 
    //REGISTER USER
    
    const resp = await fetch("http://localhost:3000/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "me",
        email: "me@ui.at",
        password: "me"
      })
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
  });
  

  //LOGIN USER
  /*
  const resp = await fetch("http://localhost:3000/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "me",
        email: "me@ui.at",
        password: "me"
      })
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
    console.log(data.token)
  

  const res = await fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${data.token}`
    },
    body: JSON.stringify({
      post: "post :3"
    })
  })

  console.log(JSON.stringify(await res.json()))
  
});
*/

const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lIiwiaWF0IjoxNzY5NTk4MTEwfQ.NjNTVi-ldfGcIF-NnuBf2y24LnjCz3MjGqnOcBPBxvA"; // z.B. aus localStorage

document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch("http://localhost:3000/posts", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${token}`
        },
        body: formData
    });

    const data = await res.json();
    console.log(data);
});



})
