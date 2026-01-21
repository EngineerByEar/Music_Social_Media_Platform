document.addEventListener("DOMContentLoaded", ()=>{

    const btn = document.getElementById("btn");
    const output_field = document.getElementById("output_field");

    btn.addEventListener("click", async function(){
        const request = await fetch("https://mt241063-10974.node.ustp.cloud/");
        const data = await request.json();
        output_field.textContent = data.message;
    })
})
