const googleAPI = "https://www.googleapis.com/books/v1/volumes?q=";

//returns false if empty else returns false;
async function handleSearch(type /*0 book, 1 profile*/, url, data) {
    let val = true;
    if (type === 0) {
        await fetch(url,{
        }).then(async function (resp) {
                
                    if (resp.status == 400) {
                        return false;
                    }
                    let j = await resp.json();
                    let googBooks = await parseJSON(j);
                    if (googBooks != null) {
                        await handleGoogleAPI(googBooks);
                        return true;
                    }
                    return false;
                })
            .catch(async function (err) {val = false;});
            
        } else {
            resp = await postData(url, data);
            if (resp.status != 200) {
                    return false;
                }
            let profile = await resp.json();
            if (profile != null) {
                await handleProfileSearch(profile);
                return true;
            }
            return false;
    }
    return val;
}

async function handleProfileSearch(profile){
    for (let i = 0; i < profile.length; i++) {
        const div = document.createElement('div');
        div.className = 'div shadow my-5 py-4 px-3 bg-white';
        div.innerHTML = `
                <div class='row'>         
                   <h3 class='text-center col-lg col-md col-xl'><a href="javascript:" onclick='redirectProfilePage(this)' id=${profile[i]._id}>${profile[i].username}</a></h3></td>
                   <h4 class='text-center col-lg col-md col-xl'>${profile[i].email}<h4></td>
                   <h3 class='text-center col-lg col-md col-xl'><span class="badge badge-warning text-white">Profile</span></h3>
                </div>
                `;
        div.id = 'profile_' + i;
        document.getElementById('search_list').appendChild(div);
    }
}


async function decode(text) {
    text = decodeURIComponent(text);
    text = text.split('+').join(" ");
    return text;
}


async function Search() {
    let data = await parseURL();
    let books = false;
    let profile = false;
    let search = data.q;
    let option = data.option;
    search = await decode(search);
    document.getElementById('query').value = search;
    if (search !== "") {
        if (option != 1) {
            books = await handleSearch(0, googleAPI + search, {});
            document.getElementById('book_radio').checked = true;
        }
        if (option != 0) {
            profile = await handleSearch(1, url + '/api/user/search', { 'search': search });
            document.getElementById('profile_radio').checked = true;
        }
    }
    if (option != 0 && option != 1) {
        document.getElementById('both_radio').checked = true;
    }
    if (search === "" || books === false && profile === false) {
        const empty = document.createElement('table');
        empty.style.height = '300px';
        empty.className = "container mb-5 text-center bg-white shadow";
        empty.innerHTML =
            `
            <tbody>
                <tr>
                    <td class="align-middle">
                        <h6 class="text-black-50 display-1">No Results</h6>
                    </td>
                </tr>
            </tbody>`;
        document.getElementById('search_list').appendChild(empty);
    }
}


async function handleGoogleAPI(googBooks) {
        for (let i = 0; i < googBooks.length; i++) {
            newURL = url + '/api/book/add';
            let resp = await postData(newURL, googBooks[i]);
            if (resp.status != 200) {
                continue;
            }
            googBooks[i] = await resp.json();
            const stars = document.createElement('div');
            stars.className = 'container-xl';
            for (let j = googBooks[i].googleRating; j > 0; j--) {
                if (j > 0 && j < 1) {
                    stars.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
                } else {
                    stars.innerHTML += '<i class="fas fa-star text-warning"></i>';
                }
            }
            for (let j = googBooks[i].googleRating; j <= 4; j++) {
                stars.innerHTML += '<i class="far fa-star text-warning"></i>';
            }
            const div = document.createElement('div');
            div.className = 'container shadow my-5 py-4 px-3 bg-white';
            div.innerHTML = `
                <div class='row'>
                    <div id=${"image_" + i} class='container col'> 
                       <img class="mb-2 img-thumbnail" src=${!googBooks[i].imageLinks.thumbnail ? "" : googBooks[i].imageLinks.thumbnail} />
                       <h6>Google Rating:</h6>
                    </div>                
                    <div class='container col-md-9 col-sm-8 col-lg-10 col-xl-10'>
                        <div class='row'>
                            <h3 class='col-md col-lg col-xl'><a href="javascript:" onclick='redirectBookPage(this)' id=${googBooks[i]._id}>${googBooks[i].title}</a></h3>
                            <h3 class='col-xl-3 col-lg-3 col-sm col-md-4'><span class="badge badge-warning text-white" style="background-color:#ad3ccf;">Book</span></h3>
                        </div>
                        <small>${googBooks[i].authors}</small>
                        <p class='lead'>${googBooks[i].description}</p>
                    </div>
                 </div>
                `;
            div.id = 'google_search_' + i;
            document.getElementById('search_list').appendChild(div);
            document.getElementById('image_' + i).appendChild(stars);
            
    }
}

async function parseJSON(json) {
    let books = [];
    if (json == null || json.items == null) {
        return null;
    }
    for (let i = 0; i < json.items.length; i++) {
     
        books.push({
            'title': json.items[i].volumeInfo.title,
            'authors': json.items[i].volumeInfo.authors,
            'publisher': json.items[i].volumeInfo.publisher,
            'publishedDate': json.items[i].volumeInfo.publishedDate,
            'categories': json.items[i].volumeInfo.categories,
            'ISBN': json.items[i].volumeInfo.industryIdentifiers,
            'description': json.items[i].volumeInfo.description,
            'googleRating': json.items[i].volumeInfo.averageRating,
            'imageLinks': json.items[i].volumeInfo.imageLinks,
            'userRating': []
        });
    }
    return books;
}

async function redirectBookPage(element) {
    let book = element.id;
    window.location.href = url + '/auth/bookPage.html?book=' + book;
    
}

async function redirectProfilePage(element) {
    let user = element.id;
    window.location.href = url + '/auth/profile.html?user=' + user;

}

