document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");

// javascript - client: send JSON via POST and handle non-OK responses
btn.addEventListener("click", async function () {
  try {
    const resp = await fetch("https://mt241063-10974.node.ustp.cloud/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: "grioherhg",
        email: "grioherhg",
        password: "grioherhg"
      })
    });

    const data = await resp.json().catch(() => ({}));
    output_field.textContent = resp.ok
      ? `${data.message || ""} ${data.code || ""}`
      : `${data.message || "Request failed"} ${data.code || resp.status}`;
  } catch (err) {
    output_field.textContent = "Network error";
    console.error(err);
  }
});


})
