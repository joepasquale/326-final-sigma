
async function addReview() { //REVIEWS ARE ON BOOK PAGES, COMMENTS ARE ON HOMEFEED

    let Review = document.getElementById("reviewText").value;
    let UserName = document.getElementById("username").value; //revist once users are added********************

    const data = {"Review" : Review, "UserName" : UserName};
    const newURL = "http://localhost:4000/api/book/review";  //Check later **************************
    const resp = await postData(newURL, data);

    const newURL = "http://localhost:4000/api/book/review";
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




async function addToList() {

    let addToList = document.getElementById("listDrop").value;

    const data = { "List" : addToList};
    const newURL = "http://localhost:4000/api/book/addList";
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
    document.getElementbyId('reviewerName').innerHTML = bookData.userReview[0].username
    document.getElementbyId('reviewerText').innerHTML = bookData.userReview[0].reviewText
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