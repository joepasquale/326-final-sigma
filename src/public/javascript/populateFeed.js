async function getComments(id){
    const nURL = url + "/api/comment/all";
    const data = {'Update': id};
    let resp = await postData(nURL, data);
    return await resp.json();
}


async function addComments(id){
    let arrayOfComments = await getComments(id);
    if(arrayOfComments == null || arrayOfComments.length == 0){
        return;
    }
    for(let i=0 ; i<arrayOfComments.length; i++){ //for loop goes down until all comments are outputted to HTML
        let commentFeedDiv = document.getElementById("feedbox");
        let commentHTML = document.createElement("div"); 
        //Comment HTML Below
        let dateval = new Date(arrayOfComments[i].time);
        commentHTML.className="container shadow-sm p-3 my-2 bg-white";
        commentHTML.innerHTML = 
            `<div class="row px-5 pb-2" id=${"commentContent_"+i} >
                <div class="container col">
                    <p id="reviewerName"  style="color:black; margin-bottom:0px; word-wrap:break-word;">
                        <a  href="${url + "/auth/profile.html?user=" + arrayOfComments[i].user._id}">${arrayOfComments[i].user.username}<a> commented
                    </p>
                    <small class="text-muted">${dateval.toString()}</small>
                </div>
            </div>
            <div class="row px-5">
                <div class="container">
                    <p id="commentText" style="word-wrap:break-word;"> ${arrayOfComments[i].message} </p>
                </div>
            </div>`;
    commentFeedDiv.appendChild(commentHTML);
    if(arrayOfComments[i].user._id === currentUser._id){
        let removeButton = document.createElement('div');
        removeButton.className = "d-flex flex-row-reverse";
        removeButton.innerHTML=`  <button class="btn" value="${arrayOfComments[i]._id}" onclick="removeComment(this)"><i class="fas fa-times text-danger"></i></button>`;
        document.getElementById("commentContent_"+i).appendChild(removeButton);
    }
    }
}

async function removeComment(elem){
    const nURL = url + "/api/comment/remove";
    const data = {'ID': elem.value};
    let resp = await postData(nURL, data);
    if(resp.status == 200){
        setTimeout(function () {
            window.location.reload(true);
        });
    }
}

async function getReview(id){
    const nURL = url + "/api/review/find_review";
    const data = {'ID': id};
    let resp = await postData(nURL, data);
    return await resp.json();
}

async function addUpdates(){
    let newURL = url + "/api/updates/all";
    let resp = await postData(newURL, { 'User':currentUser._id });
    let arrayOfUpdates = await resp.json();
    if(arrayOfUpdates == null || arrayOfUpdates.length  === 0){ // Put text stating no updates if database array of user updates is less than 1
        let noUpdateDiv = document.getElementById("noUpdates");
        let p = document.createElement("P");
        p.innerHTML = `No feed updates :( . Try adding friends by searching their profile to see their updates! See your friends <a href="${url + "/auth/friendlist.html?user=" + currentUser._id}">here</a>.`;
        noUpdateDiv.appendChild(p);
        noUpdateDiv.style.display = 'block';
        return;
    }
     // Output html of X number of updates to the feed
    for(let i = 0 ; i< arrayOfUpdates.length; i++){ //for loop goes down until all posts are outputted to HTML
        let feedDiv = document.getElementById("feedbox");
        let postHTML2 = document.createElement("div");
        if(arrayOfUpdates[i].change.toList != null){
            await handleListUpdate(arrayOfUpdates, i);
        }else{
            await handleReviewUpdate(arrayOfUpdates, i);
        }
        let id = arrayOfUpdates[i]._id;
        postHTML2.className = "container shadow-sm p-3 mb-5 mt-2 bg-white";
        postHTML2.innerHTML = 
        
            `   <div class="row px-5 d-flex justify-content-center">
                    <div class="col-6" >
                        <div class="alert alert-danger text-center" id=${"validateInput_"+id} role="alert" style="display:none;" ></div>
                    </div>
                </div>
            
               
                <div class="row px-5">
                    <p id="textUI">Leave a comment?</p>
                </div>
                <div class="form-group row px-5 green-border-focus">
                    <textarea class="form-control" id=${"commentText_"+id} rows="3" placeholder="Leave a comment..." style="resize:none;"></textarea>
                </div>
                <div class="row px-5">
                    <button value=${id} onclick="submitComment(this)" class="btn text-white" style="background-color: #335482;" type="Submit" style="margin-right: 15px;">Submit</button>        
                </div>
            `;
        //Update structure goes as followed:
        await addComments(id); //Comment(s) by user(s) (if any) (appendChild is called within addComments to the HTML output by addUpdate())
        feedDiv.appendChild(postHTML2); //Submit Comment Box
    }
}


async function submitComment(elem) { //COMMENTS ARE ON HOMEFEED
    let Comment = document.getElementById('commentText_'+ elem.value).value;
    Comment = Comment.trim();
    if(Comment == null || Comment == ""){
        let validate = document.getElementById('validateInput_'+elem.value);
        validate.style = "display:block";
        validate.innerHTML="Input cannot be empty";
        document.getElementById('commentText_'+ elem.value).value = "";
    }else{
        const data = {
            "Comment" : Comment, 
            "User" : currentUser._id, 
            "Update": elem.value
        };
        const newURL = url + "/api/comment/add";
        const resp = await postData(newURL, data);
        if(resp.status == 200){
            setTimeout(function () {
                window.location.reload(true);
            });
        }
    }
}


async function getList(status){
    if(status === 1){
       return "Want to read List";
    }
    if(status === 2){
       return "Currently reading List";
    }
    if(status === 3){
        return "Finished reading List";
    }
    if(status === 4){
        return "Dropped List";
    }
}

async function handleListUpdate(array, i){
    let feedDiv = document.getElementById("feedbox");
    let postHTML = document.createElement("div");
    postHTML.className="container shadow-sm p-3 mt-5 mb-3 bg-white";
    let action = "";
    let prep = "";
    let messageStr = "";
    let toListString = "";
    let toList = array[i].change.toList;
    let fromList = array[i].change.fromList;
    let dateval = new Date(array[i].time);
    if(toList === 0){
        action = "removed"
        prep = "from their"
        toListString = await getList(array[i].change.toFrom);
    }else{
        action = "added"
        prep = "to their"
        toListString = await getList(array[i].change.toList);
    }
    postHTML.innerHTML = `
            <div class="row px-5 pb-2">
                <div class="col containter">
                    <img class="img-thumbnail" style="height:150px;" src="${array[i].book.imageLinks.thumbnail}"></img>
                 </div>    
                <div class="container col-md-9 col-sm-8 col-7 col-lg-10 col-xl-10">
                    <p style="color:black; font-size:24px; margin-bottom:0px; word-wrap:break-word;"><a href="${url + "/auth/profile.html?user=" + array[i].user._id}" >${array[i].user.username}</a> 
                    ${action} <a href="${url + "/auth/bookPage.html?book=" + array[i].book._id}">${array[i].book.title}</a> ${prep} ${toListString}</p>
                    <small class="text-muted">${dateval.toString()}</small>
                </div>
            </div>
           `;
    feedDiv.appendChild(postHTML);

}

async function handleReviewUpdate(array, i){
    let feedDiv = document.getElementById("feedbox");
    let postHTML = document.createElement("div");
    postHTML.className="container shadow-sm p-3 mt-5 mb-3 bg-white";
    const review = await getReview(array[i].change);
    let dateval = new Date(review.time);
    let dateval2 = new Date(array[i].time);
    postHTML.innerHTML = `
        <div class="row px-5 pb-2">
            <div class="col">
                <p style="color:black; font-size:24px; margin-bottom:0px; word-wrap:break-word;"><a href="${url + "/auth/profile.html?user=" + array[i].user._id}" >${array[i].user.username}</a> 
                posted a new review for <a href="${url + "/auth/bookPage.html?book=" + array[i].book._id}">${array[i].book.title}</a></p>
                <small class="text-muted">${dateval2.toString()}</small>
            </div>
        </div>
        <div class="row pb-4 px-5">
            <div class="col container">
                <img class="img-thumbnail" src="${array[i].book.imageLinks.thumbnail}"></img> 
            </div>
            <hr/>
            <div class="col container col-md-9 col-sm-9 col-12 col-lg-10 col-xl-10">
                <div class="row my-2 container d-flex align-items-center" id="userRate">
                </div>    
                <div class="row mb-2 container d-flex align-items-center">
                    <small class="text-muted">${dateval.toDateString()}</small>
                </div>    
                <div class='row'>
                    <div class='container'>
                        <p class="" style="word-wrap:break-word;">${review.message}</p>
                    </div>
                </div>
            </div>
        </div>`;
    feedDiv.appendChild(postHTML);
    //user stars;
    const userStars = document.createElement('div');
    userStars.className = 'container-xl text-center';
    for (let j = review.rating; j > 0; j--) {
        if (j > 0 && j < 1) {
            userStars.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
        } else {
            userStars.innerHTML += '<i class="fas fa-star text-warning"></i>';
        }
    }
    for (let j = review.rating; j <= 4; j++) {
        userStars.innerHTML += '<i class="far fa-star text-warning"></i>';
    }
    document.getElementById('userRate').appendChild(userStars);
}



