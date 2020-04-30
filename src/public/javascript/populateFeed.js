
const url = "http://localhost:4000";
let currentUser = "";

async function addUpdates(){

    if( arrayOfUpdates < 1){ // Put text stating no updates if database array of user updates is less than 1
        let noUpdateDiv = document.getElementById("noUpdates");
        let p = document.createElement("P");
        p.innerHTML = "No feed updates. Add friends here [LINK] to see their updates!";
        noUpdateDiv.appendChild(p);
        noUpdateDiv.style.display = 'block';
    }
    else{ // Output html of X number of updates to the feed

        if(arrayOfUpadtes > 9){ //if array is graeter than 9, then set original display limit to 10 updates
            let i = 10;
        }
        else{
            let i = arrayOfUpdates.length; //if 9 or less, sets iteration to the number of items in the array
        }
        for(i ; i=0; i--){ //for loop goes down until all posts are outputted to HTML
            let feedDiv = document.getElementById("feed");
            let postHTML = document.createElement("div");
            postHTML.innerHTML = "test"; //Here is where the HTML gets outputted to homefeed.html
        }


    }

}

addUpdates();