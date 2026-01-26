document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");

// javascript - client: send JSON via POST and handle non-OK responses
btn.addEventListener("click", async function () {
 
    //REGISTER USER
    /*
    const resp = await fetch("https://mt241063-10974.node.ustp.cloud/auth/register", {
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
  const resp = await fetch("https://mt241063-10974.node.ustp.cloud/auth/login", {
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
})
