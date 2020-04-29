let userProfile;


async function loadFriends() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await getUser(decoded);
    userProfile = j;
    document.getElementById('username-list').innerHTML = userProfile.username + "'s Friends";
    let resp = await postData("/api/friend/all", { 'array': userProfile.friends })
    console.log(resp);
    console.log(userProfile.friends);
}


async function acceptFriend() {
    let userB = await readProfile(currentUser._id);
    const data = {
        "UserA": userProfile,
        "UserB": userB,
    };
    let list = document.getElementById('friends' + id);
    let listitem = list.createElement('tr');
    listItem.innerHTML = `
    <td class="align-middle">
        <div style="width:45px;">
            <img src="../resources/avatar.png" alt="..." class="rounded-circle" style="width:50px; height:50px;" }>
        </div>
    </td>
    <td class="align-middle"><a href=">${userB.info.firstname} ${userB.info.lastname}</a></td>
    <td class="align-middle">${userB.info.email}/td>
        <td class="align-middle">
        </td>
    </tr>`;
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