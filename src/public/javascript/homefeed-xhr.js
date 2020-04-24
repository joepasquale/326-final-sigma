const url = "http://localhost:4000";

async function submitComment() { //COMMENTS ARE ON HOMEFEED, REVIEWS ARE ON BOOK PAGES

    let Comment = document.getElementById("commentText").value;
    let UserName = document.getElementById("currentUser").value; 

    const data = {"Comment" : Comment, "UserName" : UserName};
    const newURL = "http://localhost:4000/api/home/comment"; 
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

//async function submitComment() { OLD SUBMITCOMMENT FUNCTION
//
//    let Comment = document.getElementById("commentText").value;
//    let UserName = document.getElementById("currentUser").value; 
//
//    const data = {"Comment" : Comment, "UserName" : UserName};
//    const newURL = "http://localhost:4000/api/book/comment";  
//    const resp = await postData(newURL, data);
//}

async function handleBook(bookData) {
    console.log(bookData);
    document.title = 'Shelf - ' + bookData.title;
    document.getElementById('title').innerHTML = bookData.title;
    document.getElementById('image_cover').src = bookData.imageLinks.thumbnail;
    document.getElementbyId('reviewerName').innerHTML = bookData.userReview[0].username // 
    document.getElementbyId('reviewerText').innerHTML = bookData.userReview[0].reviewText //check with josh
}
