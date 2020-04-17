const url = "http://localhost:4000";

async function submitComment() {

    let Comment = document.getElementById("commentText").value;

    const data = {"Comment" : Comment};
        const newURL = "http://localhost:4000/api/home/comment";  //Check later **************************
    await fetch(newURL, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data),
    })
        .then(function (dat) { 
        console.log('Request success: ', dat.results);
    })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
}


async function movePage(){ //moves from the homefeed page to homefeedAdd page


}
