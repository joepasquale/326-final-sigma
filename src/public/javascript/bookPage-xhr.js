const url = "http://localhost:4000";


async function postData(url, data) {
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


async function addReview() {

    let Review = document.getElementById("reviewText").value;

    const data = {"Review" : Review};
    const newURL = "http://localhost:4000/api/book/review";  //Check later **************************
    const resp = await postData(newURL, data);
}




async function addToList() {

    let Review = document.getElementById("reviewText").value;

    const data = { "List" : List};
    const newURL = "http://localhost:4000/api/book/addList";  //Check later***************************
    const resp = await postData(newURL, data);
}

async function getBook() {
    let id = await parseURL();
    let newURL = url + '/api/book/read';
    const data = { '_id': id };
    let resp = await postData(newURL, data);
    if (resp.status != 200) {
        console.log("Book Doesn't exist");
        return;
    }
    let j = await resp.json();
    console.log(j);
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
    return data.title;

}