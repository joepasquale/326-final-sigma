const url = "http://localhost:4000";

async function postData(url, data) {
    const resp = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
    return resp;
}

async function authUser() {
        let username = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;
    const data = { "username": username, "password": password };
        const newURL = url + "/api/login";
    const resp = await postData(newURL, data);
    if (resp.status != 200) {
        document.getElementById("validateInput").style.display = 'block';
        window.sessionStorage.setItem('token', "");
    } else {
        let token = await resp.text();
        window.sessionStorage.setItem('token', token);
        window.location.href = url + "/auth/homefeed.html"
    }
}

async function registerUser() {
    let email = document.getElementById("inputEmail").value;//
    let username = document.getElementById("inputUserName").value;
    let passwordA = document.getElementById("inputPasswordA").value;
    let passwordB = document.getElementById("inputPasswordB").value;
    if ((passwordA.length <= 5) || (passwordA.length >= 21)) { //Check if password is the correct length (6-20), responds and stops if not
        document.getElementById("validateInput").style.display = 'block';
        let returnTextLength = "Password not of appropriate length (6-20 characters)";
        document.getElementById("passwordHelpBlock").className = "text-danger";
        document.getElementById("passwordHelpBlock").innerHTML = returnTextLength;
        return;
    }
    else if (passwordA != passwordB) { //Check if passwords match, responds and stops if not
        document.getElementById("validateInput").style.display = 'block';
        let returnTextMatch = "Passwords do not match";
        document.getElementById("passwordHelpBlock").className = "text-danger";
        document.getElementById("passwordHelpBlock").innerHTML = returnTextMatch;
        return;
    }
    const data = { "email": email, "username": username, "password": passwordA };
    const newURL = url + "/api/login/register";
    const resp = await postData(newURL, data);
    if (resp.status != 200) {
      
    } else {
      
    }
}