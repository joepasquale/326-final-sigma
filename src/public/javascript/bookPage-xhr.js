let Book;

async function getBook() {
    let urlData = await parseURL();
    let decoded = decodeURIComponent(urlData.book);
    let newURL = url + '/api/book/read';
    const data = { 'id': decoded };
    let resp = await postData(newURL, data);
    if (resp.status != 200) {
        window.location.href = url + '/auth/search-results.html?q=';
        return;
    }
    let j = await resp.json();
    Book = j;
    await handleBook(j);
    await handleComments(j);

}

async function handleBook(bookData) {
    document.title = 'Shelf - ' + bookData.title;
    const stars = document.createElement('div');
    stars.className = 'container-xl text-center';
    for (let j = bookData.googleRating; j > 0; j--) {
        if (j > 0 && j < 1) {
            stars.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
        } else {
            stars.innerHTML += '<i class="fas fa-star text-warning"></i>';
        }
    }
    for (let j = bookData.googleRating; j <= 4; j++) {
        stars.innerHTML += '<i class="far fa-star text-warning"></i>';
    }
   

    const div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `
            <h1>${bookData.title}</h1>
            <hr/>
                <div class='row'>
                    <div class='container col'> 
                       <img class="mb-2 img-thumbnail" src=${bookData.imageLinks.thumbnail} />
                    </div> 
                    <div class='container col-md-9 col-sm-8 col-lg-10 col-xl-10'>
                        <div  class='container border rounded' style="background-color: #fafafa;">
                            <div class='row py-3'>
                                <div id='gogRate' class='col'>
                                    <h5 class="text-center">Google Rating</h5>
                                </div>
                                <div id='userRate' class='col'>
                                    <h5 class="text-center">User Rating</h5>
                                </div>
                            </div>
                        </div>
                        <div class="container mt-3">

                            <div class='row mt-4'>
                                <div id="bookinfo" class='col-7'>
                                   
                                </div>
                                <div class='col text-center'>
                                  <div class="dropdown mt-1">
                                      <button class="btn btn-md btn-secondary dropdown-toggle" style="background-color: #335482;" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i class="fas fa-plus"></i> Add To
                                      </button>
                                      <div class="dropdown-menu" id="drop_down" aria-labelledby="dropdownMenuButton">
                                           
                                      </div>
                                  </div>
                               </div>
                            </div>
                        </div>
                    </div>
                 </div>
                 <hr/>
                <p class=''>${bookData.description}</p>
                `;
    document.getElementById('bookcontent').appendChild(div);
    let drop_down = document.getElementById("drop_down");
    let nURL = url + "/api/booklist/find";
    const dat = {"User": currentUser, "Book": Book};
    const response = await postData(nURL, dat);
    let relationship = await response.json();
    let status = 0;
    if(relationship){
       status = relationship.status;
    }
    if(status !== 1 ){
        drop_down.innerHTML +=`
        <button class="dropdown-item" type="button" value="${bookData._id}" onclick="addToList(this, 1, ${status})">Want to Read</button>`;
    }
    if(status !== 2 ){
        drop_down.innerHTML +=`
        <button class="dropdown-item" type="button" value="${bookData._id}" onclick="addToList(this, 2 , ${status})">Currently Reading</button>`;
    }
    if(status !== 3 ){
        drop_down.innerHTML +=`
        <button class="dropdown-item" type="button" value="${bookData._id}" onclick="addToList(this, 3, ${status})">Finished Reading</button>`;
    }
    if(status !== 4 ){
        drop_down.innerHTML +=`
        <button class="dropdown-item" type="button" value="${bookData._id}" onclick="addToList(this, 4, ${status})">Dropped</button>`;
    }
    if(status !== 0){
        drop_down.innerHTML += `
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" type="button" value="${bookData._id}" onclick="removeFromList(this, 0, ${status})">Remove From List</button>`;
    }

  
    
    if (bookData.authors != null && bookData.authors.length !== 0 && bookData.authors[0] !== "") {
        let p = document.createElement("p");
        p.style = "margin:0px; padding:0px;";
        p.innerHTML = `<h4>Author:&nbsp;<span class="lead" style="font-size:24px">${bookData.authors}</span></h4>`;
        document.getElementById('bookinfo').appendChild(p);
    }
    if (bookData.categories != null || bookData.categories.length !== 0 && bookData.categories[0] !== "") {
        let p = document.createElement("p");
        p.style = "margin:0px; padding:0px;";
        p.innerHTML = `<h4>Genre:&nbsp;<span class="lead" style="font-size:24px">${bookData.categories}</span></h4>`;
        document.getElementById('bookinfo').appendChild(p);
    }
    if (bookData.publisher != null && bookData.publisher !== "") {
        let p = document.createElement("p");
        p.style = "margin:0px; padding:0px;";
        p.innerHTML = `<h4>Publisher:&nbsp;<span class="lead" style="font-size:24px">${bookData.publisher}</span></h4>`;
        document.getElementById('bookinfo').appendChild(p);
    }
    if (bookData.publishedDate != null && bookData.publishedDate !== "") {
        let p = document.createElement("p");
        p.style = "margin:0px; padding:0px;";
        p.innerHTML = `<h4>Published:&nbsp;<span class="lead" style="font-size:24px">${bookData.publishedDate}</span></h4>`;
        document.getElementById('bookinfo').appendChild(p);
    }
    document.getElementById('gogRate').appendChild(stars);
   
}

async function removeReview(rev){
    const data = {
        'ID': rev.value,
        'User': currentUser._id
    };
    const nURL = url + '/api/review/remove';
    let resp = await postData(nURL, data);  
    if (resp.status == 200) {
        setTimeout(function () {
            window.location.reload(true);
        })
    }
}


async function postReview(){
    let rating = document.getElementById("rating");
    let book_rating = rating.options[rating.selectedIndex].value;
    let rating_text = document.getElementById('review').value;
    rating_text =  rating_text.trim();
    if( rating_text == null ||  rating_text == ""){
        let validate = document.getElementById('validateInput');
        validate.style = "display:block";
        validate.innerHTML="Input cannot be empty";
        document.getElementById('review').value = "";
    }else{
        const data = {
            'Book': Book._id,
            'User': currentUser._id,
            'Text': rating_text,
            'Rating': book_rating,
        };
        const nURL = url + '/api/review/add';
        let resp = await postData(nURL, data); 
        if (resp.status == 200) {
            setTimeout(function () {
                window.location.reload(true);
            })
        }
    }
}

async function handleComments(bookData) {
    const data = {'Book': bookData._id};
    const nURL = url + "/api/review/find_books";
    const resp = await postData( nURL,data);
    let comments = await resp.json();
    let totalRating = 0;
    for(let i = 0; i < comments.length; i++){
        let div = document.createElement('div');
        const userRating = document.createElement('div');
        userRating.className = 'container-xl';
        totalRating += comments[i].rating;
        for (let j = comments[i].rating; j > 0; j--) {
            if (j > 0 && j < 1) {
                userRating.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
            } else {
                userRating.innerHTML += '<i class="fas fa-star text-warning"></i>';
            }
        }
        for (let j = comments[i].rating; j <= 4; j++) {
            userRating.innerHTML += '<i class="far fa-star text-warning"></i>';
        }
    
        let dateval = new Date(comments[i].time);
        console.log(dateval);
        div.className="container shadow bg-white mb-5";
        div.innerHTML=`
            <div class="row py-4 px-3">
                <div class="col container">
                    <div class='col container border rounded ' style="background-color: #fafafa;">
                            <div class='row py-3'>
                                <div id='${"rating_"+i}' class="col text-center">
                                    <h5 class="text-center">User Rating</h5>
                                </div>
                            </div>
                    </div>
                </div>
                <hr/>
                <div class="col container col-md-9 col-sm-9 col-12 col-lg-10 col-xl-10">
                    <div class="row container d-flex align-items-center" id="${"reviewContent_"+i}">
                        <big style="overflow:hidden;"><a href="${url + "/auth/profile.html?user=" + comments[i].user._id}" style="color:black; font-size:23px; ;">${comments[i].user.username}</a></big>
                        <small class="ml-2 text-muted">${dateval.toDateString()}</small>
                      
                    </div>    
                    <div class='row'>
                        <div class='container'>
                            <p class="" style="word-wrap:break-word;">${comments[i].message}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="row">

            </div>
        `;
        document.getElementById('bookcomments').appendChild(div);
        document.getElementById('rating_'+i).appendChild(userRating);
        if(comments[i].user._id === currentUser._id){
            let removeButton = document.createElement('div');
            removeButton.className = "col d-flex flex-row-reverse";
            removeButton.innerHTML=`  <button class="btn" value="${comments[i]._id}" onclick="removeReview(this)"><i class="fas fa-times text-danger"></i></button>`;
            document.getElementById("reviewContent_"+i).appendChild(removeButton);
        }
    }
    let userBookRating = 0
    if(comments != null && comments.length > 0){
        userBookRating = totalRating/comments.length;
    }
   
      //user stars;
    const userStars = document.createElement('div');
    userStars.className = 'container-xl text-center';
    for (let j =userBookRating; j > 0; j--) {
        if (j > 0 && j < 1) {
            userStars.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
        } else {
            userStars.innerHTML += '<i class="fas fa-star text-warning"></i>';
        }
    }
    for (let j = userBookRating; j <= 4; j++) {
        userStars.innerHTML += '<i class="far fa-star text-warning"></i>';
    }
    document.getElementById('userRate').appendChild(userStars);


}