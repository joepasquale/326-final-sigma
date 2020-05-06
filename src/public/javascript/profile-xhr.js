let userProfile;

async function getProfile() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await getUser(decoded);
    userProfile = j;
    await handleProfile(userProfile);
}

async function sendProfileInfo() {
    let firstname = document.getElementById("first_name").value;
    let lastname = document.getElementById("last_name").value;
    let favorite_book = document.getElementById("favorite_book").value;
    let favgenre = document.getElementById("favgenre");
    let favorite_genre = favgenre.options[favgenre.selectedIndex].value;
    let newURL = url + "/api/user/info/update";
    data = {
        "username": currentUser.username,
        "info":{
                "firstname": firstname,
                "lastname": lastname,
                "favorite_book": favorite_book,
                "favorite_genre": favorite_genre
        }
    }
    let resp = await postData(newURL, data);
}

async function getProfileInfo() {
    let profile = await getUser(currentUser._id);
    document.getElementById("first_name").value = profile.info.firstname;
    document.getElementById("last_name").value = profile.info.lastname;
    document.getElementById("favorite_book").value = profile.info.favorite_book;
    let drop = document.getElementById("favgenre");
    let val = profile.info.favorite_genre;
    for (let i = 0; i < drop.options.length; i++) {
       if (drop.options[i].value === val) {
           drop.options[i].selected = true;
       }
    }
}


async function handleIsUser(profileData) {
    document.getElementById('profile_info').innerHTML =`
        <div class="row mt-3">
            <div class="col">
                <h4>First Name</h4>
                <input type="text" class="form-control" name="first_name" id="first_name" placeholder="First Name" value="${profileData.info.firstname}">
                    </div>
                <div class="col">
                    <h4>Last Name</h4>
                    <input type="text" class="form-control" name="last_name" id="last_name" placeholder="Last Name" value="${profileData.info.lastname}">
                    </div>
                </div>
                <div class="row mt-2">
                    <div class="col">
                        <h4>Favorite Book</h4>
                        <input type="text" class="form-control" name="favorite_book" id="favorite_book" placeholder="Book Title" value="${profileData.info.favorite_book}">
                    </div>
                        <div class="col">
                            <h4>Favorite Genre</h4>
                            <select class="form-control" id="favgenre">
                                <option value="None">None</option>
                                <option value="Fantasy">Fantasy</option>
                                <option value="Sci-Fi">Sci-Fi</option>
                                <option value="Horror">Horror</option>
                                <option value="Western">Western</option>
                                <option value="Romance">Romance</option>
                                <option value="Thriller">Thriller</option>
                                <option value="Mystery">Mystery</option>
                                <option value="Detective">Detective</option>
                                <option value="Dystopia">Dystopia</option>
                                <option value="Action">Action Adventure</option>
                                <option value="Young Adult">Young Adult</option>
                                <option value="Non-Fiction">Non-Fiction</option>
                                <option value="TextBook">TextBook</option>
                                <option value="Poetry">Poetry</option>
                                <option value="Biography">Biography</option>
                                <option value="Play">Play</option>
                            </select>
                        </div>
                    </div>
                    <div class="row my-3">
                     <div class="col">
                        <h4>Email:</h4>
                        <label class='lead' id="email">${profileData.email}<label>
                    </div>
                        <div class="col mt-2">
                       <button class="btn btn-md btn-success  mr-2" onclick="sendProfileInfo()"><i class="fas fa-check-circle"></i> Save</button>
                        <button class="btn btn-md btn-secondary" onclick="getProfileInfo()"><i class="fas fa-redo"></i> Reset</button>
                    </div>
                        
                    </div>`;
    let drop = document.getElementById("favgenre");
    let val = profileData.info.favorite_genre;
    for (let i = 0; i < drop.options.length; i++) {
        if (drop.options[i].value === val) {
            drop.options[i].selected = true;
        }
    }
   

}

async function handleOtherUser(profileData) {
    document.getElementById('profile_info').innerHTML = `
        <div class="row mt-3">
            <div class="col">
                <h4>First Name:</h4>
                <label class='lead' id="firstname_lab">${profileData.info.firstname}</label>
            </div>
            <div class="col">
                <h4>Last Name:</h4>
                <label class='lead' id="lastname_lab">${profileData.info.lastname}</label>
            </div>
        </div>
        <div class="row mt-2" >
            <div class="col">
                <h4>Favorite Book:</h4>
                <label class='lead' id="favbook_lab">${(profileData.info.favorite_book == null || profileData.info.favorite_book === "" ? "None" : profileData.info.favorite_book)}</label>
            </div>
            <div class="col">
                <h4>Favorite Genre:</h4>
                <label class='lead' id="favgenre_lab">${profileData.info.favorite_genre}</label>
            </div>
        </div>
        <div class="row mt-2" id="add_button">
            <div class="col">
                <h4>Email:</h4>
                <label class='lead' id="email_lab">${profileData.email}</label>
            </div>
        </div>    
                   `;

    let newURL = url + "/api/friend/find";
    const data = {"UserA":currentUser, "UserB": profileData };
    let resp = await postData(newURL, data);
    let relationship = await resp.json();
    let friend_button = document.createElement('div');
    friend_button.className = "col";
    if(!relationship){
        friend_button.innerHTML=
        ` 
            <button class="btn btn-md btn-success mt-3" onclick="sendFriendRequest()"><i class="fas fa-plus"></i> Add Friend</button>
        `;
    }else{
        let status = relationship.status;
        if(status == 1){
            friend_button.innerHTML=
            `
            <button class="btn btn-md btn-success" value="${userProfile._id}" onclick="acceptFriend(this)"><i class="fas fa-plus"></i> Accept Request</button>
            <button class="btn btn-md btn-danger my-2" value="${userProfile._id}" onclick="rejectFriend(this)"><i class="fas fa-times"></i> Reject Request</button>
           
            `;
        }
        if(status == 2){
            friend_button.innerHTML=
            `  
                <div  class='container w-75 border rounded text-center my-3 py-2' style="background-color: #fafafa;">Friend Request Pending...</div>
              
            `;     
        }
        if(status == 3){
            friend_button.innerHTML=
            `  
            <button class="btn btn-md btn-danger" value="${userProfile._id}" onclick="rejectFriend(this)"><i class="fas fa-times"></i> Remove Friend</button>
            `;
        }
        
    }
    document.getElementById('add_button').appendChild(friend_button);
}


async function sendFriendRequest() {
    let userB = await getUser(currentUser._id);
    const data = {  
        "UserA": userProfile,
        "UserB": userB,
    };
    const newURL = url + '/api/friend/request';
    const resp = await postData(newURL, data);
       if (resp.status == 200) {
        setTimeout(function () {
            window.location.reload(true);
        })
    }
}

async function handleProfile(profileData) {
    document.title = 'Shelf - ' + profileData.username;
    document.getElementById('username').innerHTML = profileData.username;
    if (profileData._id === currentUser._id) {
        await handleIsUser(profileData);
    } else {
        await handleOtherUser(profileData);
    }
  
 
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
