document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");
    const url = "http://localhost:3000i"
    //https://mt241063-10974.node.ustp.cloud
    //http://localhost:3000
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im1hIiwiaWF0IjoxNzcwODE2NTI5fQ._rGT2AI9BPpdnJJpDwM4Jq2X1Yadzl7AgveFER1azDc"; // z.B. aus localStorage
// javascript - client: send JSON via POST and handle non-OK responses

btn.addEventListener("click", async function () {
 
    //REGISTER USER
    /*
    const resp = await fetch(`${url}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "mo",
        email: "mo@ui.at",
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
  const post_id = 5;
  const resp = await fetch(`${url}/interactions/posts/${post_id}/comment`, {
    method: "POST",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: JSON.stringify({
      comment: "Blubitest"
    })
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});
*/

//Get All Comments for a POST
/*
 const post_id = 3;
  const resp = await fetch(`${url}/post/3/comments`);

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});

*/
  

//Like a Post
/*
  const post_id = 5;
  const resp = await fetch(`${url}/interactions/posts/${post_id}/like`, {
    method: "POST",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});
*/

//UNLIKE A POST
/*
  const post_id = 5;
  const resp = await fetch(`${url}/interactions/posts/${post_id}/like`, {
    method: "DELETE",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});
*/

//View a post
/*
const post_id = 5;
  const resp = await fetch(`${url}/interactions/posts/${post_id}/view`, {
    method: "POST",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    },
    body: 
    JSON.stringify({
      "watch_time_seconds": 36,
      "completed": true
    })
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});
*/

//Follow User
/*
  const username = "mo";
  const resp = await fetch(`${url}/users/follow/${username}`, {
    method: "POST",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});
*/

//UNFOLLOW USER

  const username = "mo";
  const resp = await fetch(`${url}/users/follow/${username}`, {
    method: "DELETE",
    headers:
    {"Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    }
  })

  const data = await resp.json();
  output_field.textContent = JSON.stringify(data);

});




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

