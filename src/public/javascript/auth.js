const url = "http://localhost:4000";
let currentUser = "";

async function auth() {
    let newURL = url + '/api/user/me';
    let token = sessionStorage.getItem('token');
    console.log(token);
    await fetch(newURL, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'x-auth-token': token,
            'Content-Type': 'application/json'
            },
        redirect: 'follow'
    }).then( async (resp) => {
        if (resp.status != 200) {
            window.location.href = url + "/login.html";
        }
        currentUser = await resp.json();
        console.log(currentUser);
        })
        .catch(async (err) => {
            console.log("failed");
            window.location.href = url + "/login.html";
        });

}

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



auth();