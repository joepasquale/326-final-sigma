let userProfile;


async function loadFriends() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await getUser(decoded);
    userProfile = j;
    document.getElementById('username-list').innerHTML = userProfile.username + "'s Friends";
    let resp = await postData("/api/friend/all", { 'array': userProfile.friends })
    friends = await resp.json();
    handleFriendsList(friends);
}

async function handleFriendsList(friends) {
    console.log(friends);
    for (let i = 0; i < friends.length; i++) {
        let status = friends[i].status;
        console.log(status);
        if (status === 3) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
             <td class="align-middle">
                   ${friends[i].requester.username}
                </td>
                <td class="align-middle"><a href="">${friends[i].requester.username}</a></td>
                <td class="align-middle">${friends[i].requester.username}</td>
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-circle" data-toggle="tooltip" data-placement="right" title="Remove Friend" onclick="removeFriend()">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            `;
            console.log(tr);
            console.log(tab);
            document.getElementById('main').appendChild(tr);
        } else if (status === 1) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
             <td class="align-middle">
                ${friends[i].requester.username}
                </td>
                <td class="align-middle"><a href="">${friends[i].requester.username}</a></td>
                <td class="align-middle">${friends[i].requester.username}</td>
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-success btn-circle" data-toggle="tooltip" data-placement="top" title="Accept Friend Request" onclick="addFriend()">
                        <i class="fa fa-check"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-circle" data-toggle="tooltip" data-placement="top" title="Deny Friend Request">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            `;
            document.getElementById('main').appendChild(tr);
        } else {
            //tab = document.getElementById('sent')
            let tr = document.createElement('tr');
            tr.innerHTML = `
             <td class="align-middle"><a href="${url + "/auth/profile.html?user=" + friends[i].receiver._id}">
                   ${friends[i].receiver.username}
                    </a>
                </td>
                <td class="align-middle">${friends[i].receiver.firstname} ${friends[i].receiver.lastname}</td>
                <td class="align-middle">j${friends[i].requester.email}</td>
                <td class="align-middle">
                    <small>Pending...</small>

                </td>
            `;
            let tab = document.getElementById("sent_body").appendChild(tr);
            console.log(tab);
            //tab.innerHTML="test"
        }
    }
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