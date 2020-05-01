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
                 <a href="${url + "/auth/profile.html?user=" + friends[i].receiver._id}">${friends[i].receiver.username}</a>
                </td>
                <td class="align-middle">${friends[i].receiver.info.firstname} ${friends[i].receiver.info.lastname}</td>
                <td class="align-middle">${friends[i].receiver.email}</td>
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-danger btn-circle" data-toggle="tooltip" data-placement="right" value="${friends[i].receiver._id}" title="Remove Friend" onclick="rejectFriend(this)">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            `;
            document.getElementById('friends_body').appendChild(tr);
        } else if (status === 1) {
            let tr = document.createElement('tr');
            tr.innerHTML = `
             <td class="align-middle">
                <a href=""${url + "/auth/profile.html?user=" + friends[i].receiver._id}">${friends[i].receiver.username}</a>
                </td>
                <td class="align-middle">${friends[i].receiver.info.firstname} ${friends[i].receiver.info.lastname}</td>
                <td class="align-middle">${friends[i].receiver.email}</td>
                <td class="align-middle">
                    <button type="button" class="btn btn-outline-success btn-circle" data-toggle="tooltip" data-placement="top" value="${friends[i].receiver._id}" title="Accept Friend Request" onclick="acceptFriend(this)">
                        <i class="fa fa-check"></i>
                    </button>
                    <button type="button" class="btn btn-outline-danger btn-circle" data-toggle="tooltip" data-placement="top" value="${friends[i].receiver._id}" title="Deny Friend Request" onclick="rejectFriend(this)">
                        <i class="fa fa-times"></i>
                    </button>
                </td>
            `;
            document.getElementById('requests_body').appendChild(tr);
        } else {
            let tr = document.createElement('tr');
            tr.innerHTML = `
             <td class="align-middle"><a href="${url + "/auth/profile.html?user=" + friends[i].receiver._id}">
                   ${friends[i].receiver.username}
                    </a>
                </td>
                <td class="align-middle">${friends[i].receiver.info.firstname} ${friends[i].receiver.info.lastname}</td>
                <td class="align-middle">j${friends[i].receiver.email}</td>
                <td class="align-middle">
                    <small>Pending...</small>

                </td>
            `;
            let tab = document.getElementById("sent_body").appendChild(tr);
        }
    }
}






async function acceptFriend(idElem) {
    let id = idElem.value;
    console.log(id);
    const data = {
        "UserA": id,
        "UserB": currentUser._id,
    };
    const newURL = url + '/api/friend/accept';
    const resp = await postData(newURL, data);
    window.location.href = window.location.href;
}

async function rejectFriend(idElem) {
    let id = idElem.value;
    console.log(id);
    const data = {
        "UserA": id,
        "UserB": currentUser._id,
    };
    const newURL = url + '/api/friend/reject';
    const resp = await postData(newURL, data);
    window.location.href = window.location.href;
}