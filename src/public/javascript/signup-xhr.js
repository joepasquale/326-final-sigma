const url = "http://localhost:4000";

async function registerUser() {
    let email = document.getElementById("inputEmail").value;//
    let username = document.getElementById("inputUsername").value;
    let passwordA = document.getElementById("inputPassword").value;
    let passwordB = document.getElementById("confirmPassword").value;
    if(passwordA !== passwordB){ //Check if passwords match ******COME BACK TO THIS LATER******** -Dan

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