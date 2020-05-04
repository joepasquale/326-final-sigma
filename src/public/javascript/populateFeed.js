let arrayOfUpdates= [];
let arrayOfComments= [];

async function addComments(){

    if(arrayOfComments.length > 4){ //if array is greater than 4, then set original display limit to 5 updates
        let y = 5;
    }
    else{
        let y = arrayOfUpdates.length; //if 4 or less, sets iteration to the number of items in the array
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

async function addUpdates(){
    let newURL = url + "/api/updates/all";
    let resp = await postData(newURL, { 'User':currentUser._id });
    arrayOfUpdates = await resp.json();
    
    if(arrayOfUpdates == null || arrayOfUpdates.length  === 0){ // Put text stating no updates if database array of user updates is less than 1
        let noUpdateDiv = document.getElementById("noUpdates");
        let p = document.createElement("P");
        p.innerHTML = `No feed updates :( . Try adding friends by searching to see their updates! See your friends <a href="${url + "/auth/friendlist.html?user=" + currentUser._id}">here</a>.`;
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
            let postHTML = document.createElement("div");
            let postHTML2 = document.createElement("div");
            postHTML.className="container shadow-sm p-3 my-5 bg-white";
            let messageStr = "";
            
            let listString = "";

            if(arrayOfUpdates[i].toList === 1){
                listString = "Want to read";
            }
            if(arrayOfUpdates[i].toList === 2){
                listString = "Currently reading";
            }
            if(arrayOfUpdates[i].toList === 3){
                listString = "Completed reading";
            }
            if(arrayOfUpdates[i].toList === 4){
                listString = "Stopped reading";
            }

            if(arrayOfUpdates[i].toList === 0){
                messageStr = arrayOfUpdates[i].user.username + " stopped reading " + arrayOfUpdates[i].book.title+" at "+arrayOfUpdates[i].time+".";
            }else {
                messageStr = arrayOfUpdates[i].user.username + " added " + arrayOfUpdates[i].book.title + " to their " + listString + " list at "+arrayOfUpdates[i].time+".";
            } 
            
            //MESSAGE FOR FUTURE DAN, PLEASE ADD THE UPDATE REVIEW TO INNERHTML WHEN ITS ADDED TO DB 
            postHTML.innerHTML = `
            <div id="updateDiv" class="row">
                <div class="col-8">
                    <div style="float:left; width: 100%;">
                        <div class="col">
                        </div>
                        <div class="col">
                            <p id="updatePost">
                                ${messageStr}
                            </p>
                        </div>
                    </div>
                        <br>
                    <div class="col">
                        <p id="updateText"> ${arrayOfUpdates[i].book} </p>
                    </div>
                </div>
                <div class="col">
                    <img src="${arrayOfUpdates[i].book.imageLinks.thumbnail}" height="336" width="168"></img>
                </div>
                <div class="col">
                </div>
            </div>`;

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
            feedDiv.appendChild(postHTML); //Update by user
            addComments(); //Comment(s) by user(s) (if any) (appendChild is called within addComments to the HTML output by addUpdate())
            feedDiv.appendChild(postHTML2); //Submit Comment Box
        }
    }
}



