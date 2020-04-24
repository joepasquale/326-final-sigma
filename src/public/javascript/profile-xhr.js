

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
    Profile = j;
    await handleProfile(j);
}

async function sendProfileInfo() {
    let firstname = document.getElementById("first_name").value;
    let lastname = document.getElementById("last_name").value;
    let favorite_book = document.getElementById("favorite_book").value;
    console.log(favorite_book);
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
    let newURL = url + "/api/user/read";
    let data = { 'id': currentUser._id };
    let resp = await postData(newURL, data);
    if (resp.status != 200) {
        console.log("test");
    } else {
        let profile = await resp.json();
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
                <div class="row mt-2">
                    <div class="col">
                        <h4>Favorite Book:</h4>
                        <label class='lead' id="favbook_lab">${(profileData.info.favorite_book == null || profileData.info.favorite_book === "" ? "None" : profileData.info.favorite_book)}</label>
                    </div>
                        <div class="col">
                            <h4>Favorite Genre:</h4>
                            <label class='lead' id="favgenre_lab">${profileData.info.favorite_genre}</label>
                        </div>
                    </div>
                    <div class="row mt-2">
                    <div class="col">
                        <h4>Email:</h4>
                        <label class='lead' id="email_lab">${profileData.email}</label>
                    </div>
                        <div class="col">
                             <button class="btn btn-md btn-success mt-3"><i class="fas fa-plus"></i> Add Friend</button>
                        </div>
                    </div>
                   `;

}


async function handleProfile(profileData) {
    document.title = 'Shelf - ' + profileData.username;
    document.getElementById('username').innerHTML = profileData.username;
    if (profileData._id === currentUser._id) {
        console.log('true\n' + "CurrentUser: " + currentUser._id + "\n" + 'userProfile: ' + profileData._id);
        await handleIsUser(profileData);
    } else {
        console.log('false');
        await handleOtherUser(profileData);
    }
  
 
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
