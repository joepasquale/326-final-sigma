const url = "http://localhost:4000";

async function registerUser() {
    let email = document.getElementById("inputEmail").value;//
    let username = document.getElementById("inputUsername").value;
    let passwordA = document.getElementById("inputPassword").value;
    let passwordB = document.getElementById("confirmPassword").value;

    if((passWordA.length <= 5 )||( passWordA.length >= 21)){ //Check if password is the correct length (6-20), responds and stops if not
        let returnTextLength = "Password not of appropriate length (6-20 characters)";
        returnTextLength.innerHTML = passwordHelpBlock;
        return;
    }
    else if(passwordA != passwordB){ //Check if passwords match, responds and stops if not
        let returnTextMatch = "Password do not match";
        returnTextMatch.innerHTML = passwordHelpBlock;
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