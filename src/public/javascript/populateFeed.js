let arrayOfUpdates= [];

async function addUpdates(){
    let newURL = url + "/api/updates/all";
    let resp = await postData(newURL, { 'User':currentUser._id });
    arrayOfUpdates = await resp.json();
    
    if(arrayOfUpdates == null || arrayOfUpdates.length  === 0){ // Put text stating no updates if database array of user updates is less than 1
        let noUpdateDiv = document.getElementById("noUpdates");
        let p = document.createElement("P");
        p.innerHTML = `No feed updates. Add friends <a href="${url + "/auth/friendlist.html?user=" + currentUser._id}">here</a> to see their updates!`;
        noUpdateDiv.appendChild(p);
        noUpdateDiv.style.display = 'block';
        //console.log("TEST");

        
    }
    else{ // Output html of X number of updates to the feed
        let j = 0;
        if(arrayOfUpdates.length > 10){ //if array is greater than 9, then set original display limit to 10 updates
            j = 10;
        }
        else{
            j = arrayOfUpdates.length; //if 9 or less, sets iteration to the number of items in the array
        }
        for(i = 0 ; i<j; i++){ //for loop goes down until all posts are outputted to HTML
            let feedDiv = document.getElementById("feedbox");
            let postHTML = document.createElement("div"); //Here is where the HTML gets outputted to homefeed.html
            postHTML.className="container shadow-sm p-3 my-5 bg-white";
            let messageStr = "";
       
            if(arrayOfUpdates[i].toList === 0){
                messageStr = arrayOfUpdates[i].user.username + " stopped reading " + arrayOfUpdates[i].book.title+"at"+arrayOfUpdates[i].time+".";
            }else {
                messageStr = arrayOfUpdates[i].user.username + " added " + arrayOfUpdates[i].book.title + " to their " + arrayOfUpdates[i].toList + " list at "+arrayOfUpdates[i].time+".";
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

            feedDiv.appendChild(postHTML);
        }
    }
}

async function addComments(){

    if(arrayOfComments.length > 4){ //if array is greater than 4, then set original display limit to 5 updates
        let i = 5;
    }
    else{
        let i = arrayOfUpdates.length; //if 4 or less, sets iteration to the number of items in the array
    }
    for(i ; i=0; i--){ //for loop goes down until all comments are outputted to HTML
        let commentFeedDiv = document.getElementById("updateDiv");
        let commentHTML = document.createElement("div"); 

        commentHTML.innerHTML = 
        `<div class="container shadow-sm p-3 my-5 bg-white" style="background-color: white">
            <div class="row" >
                <div class="col-sm-1">
                </div>
                <div class="col-sm-11">
                    <p id="reviewerName">
                        ${arrayOfUpdates[i].user.username} commented at ${arrayOfComments.timestamp}.
                    </p>
                </div>
                <div class="col-sm-12">
                    <p id="commentText"> ${commentStr} </p>
                </div>
            </div>
        </div>
        <div class="container shadow-sm p-3 my-5 bg-white" style="background-color: white"> 
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
        </div>
    </div>`;
    
    commentFeedDiv.appendChild(commentHTML);
    }


}

