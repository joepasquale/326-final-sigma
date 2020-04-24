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


async function getProfile() {
    let urlData = await parseURL();
    let newURL = url + '/api/user/read';
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    const data = { 'id': decoded };
    let resp = await postData(newURL, data);
    if (resp.status != 200) {
        console.log("Profile Doesn't Exist");
        window.location.href = url + '/auth/search-results.html?q=';
        return;
    }
    let j = await resp.json();
    await handleProfile(j);
}

async function handleProfile(profileData) {
    console.log(profileData);
    document.title = 'Shelf - ' + profileData.username;
    document.getElementById('username').innerHTML = profileData.username;
 
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

async function redirectFriendsList() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    window.location.href = url + '/auth/friendlist.html?user=' + decoded;

}

async function redirectReadingList() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    window.location.href = url + '/auth/booklist.html?user=' + decoded;

}
