async function addUpdates(){

    if( arrayOfUpdates < 1){ // Put text stating no updates if database array of user updates is less than 1
        let noUpdateDiv = document.getElementById("noUpdates");
        let p = document.createElement("P");
        p.innerHTML = `No feed updates. Add friends <a href="${url + "/auth/friendlist.html?user=" + currentUser._id}">here</a> to see their updates!`;
        noUpdateDiv.appendChild(p);
        noUpdateDiv.style.display = 'block';
        console.log("TEST");
    }
    else{ // Output html of X number of updates to the feed

        if(arrayOfUpadtes > 9){ //if array is graeter than 9, then set original display limit to 10 updates
            let i = 10;
        }
        else{
            let i = arrayOfUpdates.length; //if 9 or less, sets iteration to the number of items in the array
        }
        for(i ; i=0; i--){ //for loop goes down until all posts are outputted to HTML
            let feedDiv = document.getElementById("feedbox");
            let postHTML = document.createElement("div"); //Here is where the HTML gets outputted to homefeed.html
            let messageStr = "";
            if(arrayOfUpdates[i].status === 0){
                let messageStr = arrayOfUpdates[i].user.username + " stopped reading " + arrayOfUpdates[i].book.title+".";
            }
            else{
                let messageStr = arrayOfUpdates[i].user.username + " added " + arrayOfUpdates[i].book.title} + " to their " + arrayOfUpadtes[i].list.status + " list.";
            }
            postHTML.innerHTML = `<div class="row">
            <div class="col-8">
                <div style="float:left; width: 100%;">
                    <div class="col">
                        <!-- This is where profile pic is displayed for each update-->
                        <img src="../resources/Dog.PNG" height="168" width="168"></img>
                    </div>

                    <div class="col">
                        <!-- Friend Name, Book Title, and their update-->
                        <p id="updatePost">
                            ${messageStr}
                        </p>

                    </div>
                </div>
                <br>
                <div class="col">
                    <!-- Personal Message left by User-->
                    <p id="updateText"> [UPDATE TEXT] </p>
                </div>
            </div>
            
            <div class="col">
                <!-- This is where book pic is displayed for each update-->
                <img src="../resources/shining.jpg" height="336" width="168"></img>
            </div>
            <div class="col">
            </div>

        </div>


        <div class="container shadow-sm p-3 my-5 bg-white" style="background-color: white"> <!-- comments go here-->
            <div class="row" >

                <div class="col-sm-1">
                    <!-- This is where profile pic is displayed for each comment-->
                    <img src="../resources/avatar.png" height="84" width="84"></img>
                </div>

                <div class="col-sm-11">
                    <!-- Friend Name and their comment-->
                    <p id="reviewerName">
                        [Friend Name] commented
                    </p>
                </div>

                <div class="col-sm-12">
                    <!-- Personal Message left by User-->
                    <p id="commentText"> COMMENT TEXT </p>
                </div>
            </div>
        </div>

        <div class="container shadow-sm p-3 my-5 bg-white" style="background-color: white"> <!-- post a comment from current user-->
            <div class="row">

                <div class="col-sm-1">
                    <!-- This is where profile pic is displayed for each comment by the user-->
                    <img src="../resources/emergy.png" height="84" width="84"></img>
                </div>

                <div class="col-sm-11">
                    <!-- Prompts user if they want to comment-->
                    <p class="textUI" id="textUI">Leave a comment?</p>
                </div>

                <div class="col-sm-12" style="margin-left:15px;margin-top:15px;">
                    <!-- Personal Message left by User-->
                    <div class="form-group green-border-focus">
                        <textarea class="form-control" id="commentText" rows="3" placeholder="Leave a comment..."
                            style="width: 1000px;"></textarea>
                    </div>
                    <button onclick="submitComment()" class="btn btn-secondary" type="Submit"
                        style="margin-right: 15px;">Submit</button>
                </div>
            </div>
        </div> <!-- user comment end here-->
    </div>`;
        }
}



addUpdates();