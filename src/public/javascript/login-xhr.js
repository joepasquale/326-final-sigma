const url = "https://localhost:4000";

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
        window.sessionStorage.clear();
    } else {
        let token = await resp.text();
        sessionStorage.setItem('token', token);
        window.location.href = url + "/auth/homefeed.html"
    }
}


/*TODO:
 * need to validiate all info from input
Username: no spaces, numbers, letters, symbols, between 3-30 characters
Password: no spaces, numbers, letters, symbols, between 6-20 characters, passwords must match
email: must be an email, no spaces, numbers, letters, symbols, 5-50 characters
firstname: no spaces, 2-15 characters, only letters, hyphen,
lastname: 2-25 characters, no spaces, hypen,
*/

async function registerUser() {
    let isErroring = false;
    document.getElementById("validateInput").innerHTML = "";
    let email = document.getElementById("inputEmail").value;
    let username = document.getElementById("inputUserName").value;
    let passwordA = document.getElementById("inputPasswordA").value;
    let passwordB = document.getElementById("inputPasswordB").value;
    let firstname = document.getElementById("inputFirstName").value;
    let lastname = document.getElementById("inputLastName").value;
    if ((passwordA.length < 6) || (passwordA.length > 20)) { //Check if password is the correct length (6-20), responds and stops if not
        let errorElem = document.getElementById("validateInput")
        let p = document.createElement("P");
        p.innerHTML = "Password not of appropriate length (6-20 characters)\n";
        errorElem.appendChild(p);
        errorElem.style.display = 'block';
        isErroring == true;
    }
    if (passwordA != passwordB) { //Check if passwords match, responds and stops if not
        let errorElem = document.getElementById("validateInput");
        let p = document.createElement("P");
        p.innerHTML = "Passwords Do Not Match";
        errorElem.appendChild(p);
        errorElem.style.display = 'block';
        isErroring = true;
    }
   /* if (username) {
        let errorElem = document.getElementById("validateInput").style.display = 'block';
        errorElem.innerHTML += "Passwords do not match";
        document.getElementById("passwordHelpBlock").className = "text-danger";
        isErroring = true;
    }
    if (email) { //Check if passwords match, responds and stops if not
        let errorElem = document.getElementById("validateInput").style.display = 'block';
        errorElem.innerHTML += "Passwords do not match";
        document.getElementById("passwordHelpBlock").className = "text-danger";
        isErroring = true;
    }*/
    if (isErroring === true) {
        return;
    }
    const data = { "email": email, "username": username, "password": passwordA, "firstname":firstname, "lastname":lastname };
    const newURL = url + "/api/login/register";
    const resp = await postData(newURL, data);
    if (resp.status != 200) {
        let error = await resp.text()
        let errorElem = document.getElementById("validateInput")
        errorElem.innerHTML = error;
        errorElem.style.display = 'block';
        window.sessionStorage.clear();
    } else {
        let token = await resp.text();
        sessionStorage.setItem('token', token);
        window.location.href = url + "/auth/homefeed.html"
    }
}