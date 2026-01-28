document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");
    const url = "https://mt241063-10974.node.ustp.cloud"
    //https://mt241063-10974.node.ustp.cloud
    //http://localhost:3000

// javascript - client: send JSON via POST and handle non-OK responses

btn.addEventListener("click", async function () {
 
    //REGISTER USER
   /*
    const resp = await fetch(`${url}/auth/register`, {
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
  */

  //LOGIN USER
  /*
  const resp = await fetch(`${url}/auth/login`, {
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
  

  const res = await fetch(`${url}/posts`, {
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
  
*/
  //Get POST
  const resp = await fetch(`${url}/posts/4`, {
      method: "GET",
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
    console.log("####");
    console.log(data);
});


const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1lIiwiaWF0IjoxNzY5NTk5MzQ0fQ.VmGgw-wxdgaMQcJCX6kYYx8Pg8YajZt-JjmqSo4UpLo"; // z.B. aus localStorage

document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch(`${url}/posts`, {
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
