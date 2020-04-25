let userProfile;

async function readProfile(id) {
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

async function getProfile() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await readProfile(decoded);
    console.log(j);
    userProfile = j;
    await handleProfile(j);
}

async function acceptFriend() {
    let userB = await readProfile(currentUser._id);
    const data = {
        "UserA": userProfile,
        "UserB": userB,
    };
    const newURL = url + '/api/friends/accept';
    const resp = await postData(newURL, data);
}

async function denyFriend() {
    let userB = await readProfile(currentUser._id);
    const data = {
        "UserA": userProfile,
        "UserB": userB,
    };
    const newURL = url + '/api/friends/reject';
    const resp = await postData(newURL, data);
}

async function removeFriend() {

}