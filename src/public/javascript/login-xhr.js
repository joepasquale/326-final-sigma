const url = "http://localhost:4000";

async function authUser() {
        let username = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;
    const data = { "username": username, "password": password };
        const newURL = url + "/api/login";
    const resp = await fetch(newURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
    if (resp.status != 200) {
        console.log("invalid email or password");
    } else {
        console.log(await resp.text());
        window.location.href = url+"/files/html/homefeed.html";
    }
    
}