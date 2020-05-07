let arrayOfUpdates= [];
let arrayOfComments= [];

async function addComments(){

    if(arrayOfComments.length == 0){
        return;
    }
    if(arrayOfComments.length > 4){ //if array is greater than 4, then set original display limit to 5 updates
        let y = 5;
    }
    else{
        let y = arrayOfComments.length; //if 4 or less, sets iteration to the number of items in the array
    }
    for(j=0 ; j=y; j++){ //for loop goes down until all comments are outputted to HTML
        let commentFeedDiv = document.getElementById("updateDiv");
        let commentHTML = document.createElement("div"); 
        //Comment HTML Below
        commentHTML.innerHTML = 
        `<div class="container shadow-sm p-3 my-5 bg-white" style="background-color: white">
            <div class="row" >
                <div class="col-sm-11">
                    <p id="reviewerName">
                        ${arrayOfUpdates[j].user.username} commented at ${arrayOfComments.timestamp}.
                    </p>
                </div>
                <div class="col-sm-12">
                    <p id="commentText"> ${commentStr} </p>
                </div>
            </div>
        </div>`;
    
    commentFeedDiv.appendChild(commentHTML);
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
    arrayOfUpdates = await resp.json();
    if(arrayOfUpdates == null || arrayOfUpdates.length  === 0){ // Put text stating no updates if database array of user updates is less than 1
        let noUpdateDiv = document.getElementById("noUpdates");
        let p = document.createElement("P");
        p.innerHTML = `No feed updates :( . Try adding friends by searching their profile to see their updates! See your friends <a href="${url + "/auth/friendlist.html?user=" + currentUser._id}">here</a>.`;
        noUpdateDiv.appendChild(p);
        noUpdateDiv.style.display = 'block';
        //console.log("TEST");
    }
    else{ // Output html of X number of updates to the feed
        if(arrayOfUpdates.length > 10){ //if array is greater than 9, then set original display limit to 10 updates
            x = 10;
        }
        else{
            x = arrayOfUpdates.length; //if 9 or less, sets iteration to the number of items in the array
        }
        for(i = 0 ; i<x; i++){ //for loop goes down until all posts are outputted to HTML
            let feedDiv = document.getElementById("feedbox");
            let postHTML2 = document.createElement("div");
            console.log(arrayOfUpdates[i]);
            if(arrayOfUpdates[i].change.toList != null){
                await handleListUpdate(arrayOfUpdates, i);
            }else{
                await handleReviewUpdate(arrayOfUpdates, i);
            }
            
            postHTML2.innerHTML = `<div class="container shadow-sm p-3 my-5 bg-white" style="background-color: white"> 
                <div class="row">
                    <div class="col-sm-1">
                    </div>
                <div class="col-sm-11">
                    <p class="textUI" id="textUI">Leave a comment?</p>
                </div>
                <div class="col-sm-12" style="margin-left:15px;margin-top:15px;">
                    <div class="form-group green-border-focus">
                        <textarea class="form-control" id="commentText" rows="3" placeholder="Leave a comment..." style="width: 1000px;"></textarea>
                    </div>
                        <button onclick="submitComment()" class="btn btn-secondary" type="Submit" style="margin-right: 15px;">Submit</button>
                    </div>
                </div>
            </div>`
            //Update structure goes as followed:
            addComments(); //Comment(s) by user(s) (if any) (appendChild is called within addComments to the HTML output by addUpdate())
            feedDiv.appendChild(postHTML2); //Submit Comment Box
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
    postHTML.className="container shadow-sm p-3 my-5 bg-white";
    let action = "";
    let prep = "";
    let messageStr = "";
    let toListString = "";
    let toList = array[i].change.toList;
    let fromList = array[i].change.fromList;
    let dateval = new Date(array[i].time);
    if(toList === 0){
        action = "removed"
        prep = "from"
        toListString = await getList(array[i].change.toFrom);
    }else{
        action = "added"
        prep = "to"
        toListString = await getList(array[i].change.toList);
    }
    postHTML.innerHTML = `
            <div class="row px-5 pb-2">
                <div class="col containter">
                    <img class="img-thumbnail" style="height:150px;" src="${array[i].book.imageLinks.thumbnail}"></img>
                 </div>    
                <div class="container col-md-9 col-sm-8 col-7 col-lg-10 col-xl-10">
                    <p style="color:black; font-size:24px; margin-bottom:0px;"><a href="${url + "/auth/profile.html?user=" + array[i].user._id}" >${array[i].user.username}</a> 
                    ${action} <a href="${url + "/auth/bookPage.html?book=" + array[i].book._id}">${array[i].book.title}</a> ${prep} ${toListString}</p>
                    <small class="text-muted">${dateval.toString()}</small>
                </div>
            </div>
           `;
    feedDiv.appendChild(postHTML);

}

async function handleReviewUpdate(array, index){
    let feedDiv = document.getElementById("feedbox");
    let postHTML = document.createElement("div");
    postHTML.className="container shadow-sm p-3 my-5 bg-white";
    const review = await getReview(array[i].change);
    console.log(review);
    let dateval = new Date(review.time);
    let dateval2 = new Date(array[i].time);
    postHTML.innerHTML = `
        <div class="row px-5 pb-2">
            <div class="col">
                <p style="color:black; font-size:24px; margin-bottom:0px;"><a href="${url + "/auth/profile.html?user=" + array[i].user._id}" >${array[i].user.username}</a> 
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



