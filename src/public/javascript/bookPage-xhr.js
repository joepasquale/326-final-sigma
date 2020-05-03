let Book;

async function addReview() {

}

async function getBook() {
    let urlData = await parseURL();
    let decoded = decodeURIComponent(urlData.book);
    let newURL = url + '/api/book/read';
    const data = { 'id': decoded };
    let resp = await postData(newURL, data);
    if (resp.status != 200) {
        console.log("Book Doesn't exist");
        window.location.href = url + '/auth/search-results.html?q=';
        return;
    }
    let j = await resp.json();
    Book = j;
    await handleBook(j);
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
    //user stars;
    const userStars = document.createElement('div');
    userStars.className = 'container-xl text-center';
    for (let j = bookData.userRating; j > 0; j--) {
        if (j > 0 && j < 1) {
            userStars.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
        } else {
            userStars.innerHTML += '<i class="fas fa-star text-warning"></i>';
        }
    }
    for (let j = bookData.userRating; j <= 4; j++) {
        userStars.innerHTML += '<i class="far fa-star text-warning"></i>';
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
    console.log(drop_down);
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
    document.getElementById('userRate').appendChild(userStars);


    await handleComments(bookData);


    
}

async function handleComments(bookData) {
        //document.getElementbyId('reviewerName').innerHTML = bookData.userReview[0].username
        //document.getElementbyId('reviewerText').innerHTML = bookData.userReview[0].reviewText
    
    const div = document.createElement('div');
    div.className = 'container';
    div.innerHTML = `
         
        `;
    document.getElementById('bookreviews').appendChild(div);

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