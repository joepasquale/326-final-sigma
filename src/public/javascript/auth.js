const url = "http://localhost:4000";
let currentUser = "";

async function auth() {
    let newURL = url + '/api/user/me';
    let token = sessionStorage.getItem('token');
    await postData(newURL, {}).then( async (resp) => {
        if (resp.status != 200) {
            window.location.href = url + "/login.html";
        }
        currentUser = await resp.json();
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
                'x-auth-token': sessionStorage.getItem('token'),
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
    return resp;
}

async function getUser(id) {
    let newURL = url + '/api/user/read';
    const data = { "id": id };
    const resp = await postData(newURL, data);
    if (resp.status != 200) {
        console.log("Profile Doesn't Exist");
        window.location.href = url + '/auth/search-results.html?q=';
        return;
    }
    let j = await resp.json();
    return j;
}

async function parseURL() {
    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    if (data === null) {
        return "";
    }
    return data;

}

auth();