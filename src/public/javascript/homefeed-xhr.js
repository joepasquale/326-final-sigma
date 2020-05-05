async function submitComment() { //COMMENTS ARE ON HOMEFEED

    let Comment = document.getElementById("commentText").value;
    let UserName = document.getElementById("currentUser").value; 

    const data = {"Comment" : Comment, "UserName" : UserName};
    const newURL = url + "/homefeed/comment";
    const resp = await postData(newURL, data);  

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

