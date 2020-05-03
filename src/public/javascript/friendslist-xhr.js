let userProfile;


async function loadFriends() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await getUser(decoded);
    userProfile = j;
    document.getElementById('username-list').innerHTML = `<a href=${url + "/auth/profile.html?user="+ userProfile._id}>${userProfile.username}'s</a> Friends`;
    let resp = await postData("/api/friend/all", { 'array': userProfile.friends })
    friends = await resp.json();
    if (userProfile._id === currentUser._id) {
        await handleFriendsList(friends);
    } else {
        await handleOtherUser(friends);
    }
}


async function handleOtherUser(friends){
    console.log(friends);
    let friendsCount = 0;
    for (let i = 0; i < friends.length; i++) {
        let status = friends[i].status;
        
        if (status === 3) {
            friendsCount++;
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <th class="align-middle" scope="row">${i+1}</th>
             <td class="align-middle">
                 <a href="${url + "/auth/profile.html?user=" + friends[i].receiver._id}">${friends[i].receiver.username}</a>
                </td>
                <td class="align-middle">${friends[i].receiver.info.firstname} ${friends[i].receiver.info.lastname}</td>
                <td class="align-middle">${friends[i].receiver.email}</td>
            `;
            document.getElementById('friends_body').appendChild(tr);
        }
    }
    if(friendsCount === 0){
       console.log('test');
        await noResults("No Friends", "friends_body", "friends_table");
    }else{
       let thead = document.createElement("thead");
        thead.innerHTML=` 
        <tr>
            <th scope="col">#</th>
            <th scope="col">Username</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col"></th>
        </tr>
        `;
        let elem = document.getElementById('friends_table');
        elem.insertBefore(thead,elem[0]);
    }
}


async function handleFriendsList(friends) {
    let friendsCount = 0;
    let requestCount = 0;
    let sendCount = 0;
    let nav = document.getElementById('myTab');
    let request = document.createElement('li');
    let sent = document.createElement('li');
    request.className="nav-item";
    sent.className = "nav-item";
    request.innerHTML = `<a class="nav-link" id="requests-tab" data-toggle="tab" href="#requests" role="tab" aria-controls="requests" aria-selected="false">Requests</a>`;
    sent.innerHTML = `<a class="nav-link" id="sent-tab" data-toggle="tab" href="#sent" role="tab" aria-controls="sent" aria-selected="false">Sent</a>`;
    nav.appendChild(request);
    nav.appendChild(sent);
    for (let i = 0; i < friends.length; i++) {
        let status = friends[i].status;
        console.log(status);
        if (status === 3) {
            friendsCount++;
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <th class="align-middle" scope="row">${i+1}</th>
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
            requestCount++;
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <th class="align-middle" scope="row">${i+1}</th>
             <td class="align-middle">
                <a href="${url + "/auth/profile.html?user=" + friends[i].receiver._id}">${friends[i].receiver.username}</a>
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
            sendCount++;
            let tr = document.createElement('tr');
            tr.innerHTML = `
            <th class="align-middle" scope="row">${i+1}</th>
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
            document.getElementById("sent_body").appendChild(tr);
        }
    }
    if(friendsCount === 0){
        await noResults("No Friends", "friends_body", "friends_table");
    }else{
        await addHeader('friends_table');
    }

    if(requestCount === 0){
        await noResults("No Requests", "requests_body", "requests_table");
    }else{
        await addHeader("requests_table");
    }

    if(sendCount === 0){
      await noResults("No Pending Requests", "sent_body", "sent_table");
    }else{
       await addHeader("sent_table");
    }
}


async function noResults(value, id, table){
    let tr = document.createElement('tr');
    tr.innerHTML = `
        <td class="align-middle">
            <h6 class="text-black-50 display-1">${value}</h6>
        </td>`;
    let elem =document.getElementById(id).appendChild(tr);
    let tableElem = document.getElementById(table);
    tableElem.className="table text-center";
    tableElem.style.height = '300px';
}

async function addHeader(id){
    let thead = document.createElement("thead");
    thead.innerHTML=` 
    <tr>
        <th scope="col">#</th>
        <th scope="col">Username</th>
        <th scope="col">Name</th>
        <th scope="col">Email</th>
        <th scope="col"></th>
    </tr>
    `;
    let elem = document.getElementById(id);
    console.log(elem);
    elem.insertBefore(thead,elem[0] );
}

