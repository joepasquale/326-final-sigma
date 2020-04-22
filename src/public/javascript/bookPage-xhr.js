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
    let urlData = await parseURL();
    let decoded = decodeURIComponent(urlData.book);
    console.log(decoded);
    let newURL = url + '/api/book/read';
    const data = { 'id': decoded };
    let resp = await postData(newURL, data);
    if (resp.status != 200) {
        console.log("Book Doesn't exist");
        window.location.href = url + '/auth/search-results.html?q=';
        return;
    }
    let j = await resp.json();
    await handleBook(j);
}

async function handleBook(bookData) {
    console.log(bookData);
    document.title = 'Shelf - ' + bookData.title;
    document.getElementById('title').innerHTML = bookData.title;
    document.getElementById('author').innerHTML = bookData.authors;
    document.getElementById('publishedDate').innerHTML = bookData.publishedDate;
    document.getElementById('publisher').innerHTML = bookData.publisher;
    document.getElementById('image_cover').src = bookData.imageLinks.thumbnail;
    document.getElementById('googleRating').innerHTML = bookData.googleRating;
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
    return data;

}