const url = "http://localhost:4000";
const googleAPI = "https://www.googleapis.com/books/v1/volumes?q=";

async function Search() {
    let googBooks = [];
    let search = await parseURL();
    if (search !== "") {
        let newURL = googleAPI + search;
        let resp = await fetch(newURL);
        let j = await resp.json();
        googBooks = await parseJSON(j);
        if (googBooks != null) {
            await handleGoogleAPI(googBooks);
        }
    }
    if (search === "" || googBooks === null) {
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
            let resp = await fetch(newURL, {
                method: 'PUT',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(googBooks[i]),
            });
            if (resp.status != 200) {
                console.log(await resp.text());
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
                       <img class="mb-2" src=${!googBooks[i].imageLinks.thumbnail ? "" : googBooks[i].imageLinks.thumbnail} />
                       <h6>Google Rating:</h6>
                    </div>                
                    <div class='container col-md-9 col-sm-6 col-lg-9 col-xl-10'>
                        <h3><a href="javascript:" onclick='redirectBookPage(this)'>${googBooks[i].title}</a></h3>
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
    return data.q

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
    let book = element.innerHTML;
    window.location.href = url + '/auth/bookPage.html?title=' + book;
    
}

