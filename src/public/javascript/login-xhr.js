const url = "http://localhost:4000";

async function authUser() {
        let username = document.getElementById("inputUser").value;
    let password = document.getElementById("inputPassword").value;
    const data = { "username": username, "password": password };
        const newURL = "http://localhost:4000/api/login";
    await fetch(newURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(function (dat) {
        console.log('Request success: ', dat.results);
    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
}