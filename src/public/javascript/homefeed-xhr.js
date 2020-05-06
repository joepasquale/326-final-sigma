async function postCommentData(url, data) {
    const resp = await fetch(url,
        {
            method: 'POST',
            mode: 'cors',
            cache: 'no-cache',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json'
            },
            redirect: 'follow',
            body: JSON.stringify(data)
        });
    return resp;
}

async function submitComment() { //COMMENTS ARE ON HOMEFEED

    let Comment = document.getElementById("commentText").value;
    let UserName = document.getElementById("currentUser").value; 

    const data = {"Comment" : Comment, "UserName" : UserName};
    const newURL = url + "/homefeed/comment";
    const resp = await postCommentData(newURL, data);
    let token = await resp.text();
    sessionStorage.setItem('token', token); 

}

