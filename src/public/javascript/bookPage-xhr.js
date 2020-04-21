const url = "http://localhost:4000";

async function addReview() {

    let Review = document.getElementById("reviewText").value;

    const data = {"Review" : Review};
        const newURL = "http://localhost:4000/api/book/review";  //Check later **************************
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

async function addToList() {

    let Review = document.getElementById("reviewText").value;

    const data = { "List" : List};
        const newURL = "http://localhost:4000/api/book/addList";  //Check later***************************
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

async function getBook() {
    let title = await parseURL();
    let newURL = url + '/api/book/' + title;
    let resp = await fetch(newURL);
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