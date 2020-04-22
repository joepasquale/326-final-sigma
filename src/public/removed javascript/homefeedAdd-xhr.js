const url = "http://localhost:4000";

async function uploadCover() { //REVISIT SINCE JSON CANT STORE IMAGES
    let cover = document.getElementById("coverImage").value;

    const data = { "cover" : coverImage};
        const newURL = "http://localhost:4000/api/book/cover"; 
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

async function uploadBook() {
    let List = document.getElementById("addListForm").value;
    let Title = document.getElementById("bookTitle").value;
    let Author = document.getElementById("authorName").value;
    let ISBN = document.getElementById("ISBNinput").value;
    let Genre = document.getElementById("bookGenre").value;
    let Rating = document.getElementById("bookRating").value;
    let Review = document.getElementById("reviewText").value;

    const data = { "List" : List, "Title" : Title, "Author" : Author, "ISBN" : ISBN, "Genre" : Genre, "Rating" : Rating, "Review" : Review};
        const newURL = "http://localhost:4000/api/book/add"; 
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