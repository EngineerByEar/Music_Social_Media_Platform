document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");
    const url = "http://localhost:3000"
    //https://mt241063-10974.node.ustp.cloud
    //http://localhost:3000
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hIiwiaWF0IjoxNzcwODAxOTU4fQ.BinhRk1mnSZd_FUOLpQEnZHNdgGjNxO4avFD6ENLYw4"; // z.B. aus localStorage
// javascript - client: send JSON via POST and handle non-OK responses

btn.addEventListener("click", async function () {
 
    //REGISTER USER
    /*
    const resp = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "ma",
        email: "ma@ui.at",
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
        username: "ma",
        email: "ma@ui.at",
        password: "me"
      })
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
    console.log(data.token)

  });
  */

  /*

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
  /*
  const resp = await fetch(`${url}/posts/4`, {
      method: "GET",
    });
  */
 /*
 //GET RECOMMENDATION

    const resp = await fetch(`${url}/guest/recommendations`, {
      method: "GET",
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
    console.log("####");
    console.log(data);

});
*/

//UPDATE CONTENT PREFERENCES
/*
const resp = await fetch(`${url}/users/self/content_preferences`, {
      method: "PATCH",
      headers: 
      { "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1xIiwiaWF0IjoxNzcwMDMxNjk0fQ.4uPvNNYdv8D-RDlMvlocgY5Et0o9r8DDT4ZPKqkxozs"
      },
      body: JSON.stringify({
        content_language: "de",
        preferred_genres: ["Rock", "Georg"],
        recommendation_algorithm: "content_based",
        autoplay: true
      })
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
  });
  */

  //UPDATE UI SETTINGS
  /*
  const resp = await fetch(`${url}/users/self/ui_settings`, {
      method: "PATCH",
      headers: 
      { "Content-Type": "application/json",
        "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1xIiwiaWF0IjoxNzcwMDMxNjk0fQ.4uPvNNYdv8D-RDlMvlocgY5Et0o9r8DDT4ZPKqkxozs"
      },
      body: JSON.stringify({
        ui_language: "de",
        theme: "light"
      })
    });

    const data = await resp.json();
    output_field.textContent = JSON.stringify(data);
  });
  */

  //Create Comment
  /*
  const post_id = 3;
  const resp = await fetch(`${url}/interactions/posts/${post_id}/comment`, {
    method: "POST",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      comment: "Testtesttest"
    })
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});
  */

//Get All Comments for a POST

 const post_id = 3;
  const resp = await fetch(`${url}/post/3/comments`);

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});


  
 token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hIiwiaWF0IjoxNzcwODAxOTU4fQ.BinhRk1mnSZd_FUOLpQEnZHNdgGjNxO4avFD6ENLYw4"; // z.B. aus localStorage

document.getElementById("postForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    const res = await fetch(`${url}/post`, {
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

