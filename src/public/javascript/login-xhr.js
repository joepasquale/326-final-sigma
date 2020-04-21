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
    });
    if (resp.status != 200) {
        document.getElementById("validateInput").style.display = 'block';
        window.sessionStorage.setItem('token', "");
    } else {
        let token = await resp.text();
        window.sessionStorage.setItem('token', token);
        window.location.href = url + "/auth/homefeed.html"
    }
}