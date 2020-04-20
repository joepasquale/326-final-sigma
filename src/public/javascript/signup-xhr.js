const url = "http://localhost:4000";

async function registerUser() {
    let email = document.getElementById("inputEmail").value;//
    let username = document.getElementById("inputUserName").value;
    let passwordA = document.getElementById("inputPasswordA").value;
    let passwordB = document.getElementById("inputPasswordB").value;

    if((passwordA.length <= 5 )||( passwordA.length >= 21)){ //Check if password is the correct length (6-20), responds and stops if not
        document.getElementById("validateInput").style.display = 'block';
        let returnTextLength = "Password not of appropriate length (6-20 characters)";
        document.getElementById("passwordHelpBlock").className="text-danger";
        document.getElementById("passwordHelpBlock").innerHTML=returnTextLength;
        return;
    }
    else if(passwordA != passwordB){ //Check if passwords match, responds and stops if not
        document.getElementById("validateInput").style.display = 'block';
        let returnTextMatch = "Passwords do not match";
        document.getElementById("passwordHelpBlock").className="text-danger";
        document.getElementById("passwordHelpBlock").innerHTML=returnTextMatch;
        return;
    }
    const data = { "email" : email, "username": username, "password": passwordA };
        const newURL = url+"/api/login/register";
    await fetch(newURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(function (dat) { //problem for later(?) 
        console.log('Request success: ', dat.results);
    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
}