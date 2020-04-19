const url = "http://localhost:4000";
const googleAPI = "https://www.googleapis.com/books/v1/volumes?q=";

async function Search() {
    let googBooks = [];
    let search = await parseURL();
    if (search !== "") {
        let newURL = googleAPI + search;
        const resp = await fetch(newURL);
        const j = await resp.json();
        googBooks = await parseJSON(j);
        if (googBooks != null) {
            for (let i = 0; i < googBooks.length; i++) {
                const stars = document.createElement('div');
                stars.className = 'container-xl';
                for (let j = googBooks[i].googleRating == null ? 0 : googBooks[i].googleRating; j > 0; j--) {
                    stars.innerHTML += '<i class="fas fa-star text-warning"></i>';
                }
                for (let j = googBooks[i].googleRating == null ? 0 : googBooks[i].googleRating; j <= 4; j++) {
                    stars.innerHTML += '<i class="far fa-star text-warning"></i>';
                }
                const div = document.createElement('div');
                div.className = 'container';
                div.innerHTML = `
                <div class='row'>
                    <div id=${"image_" + i} class='container col'> 
                       <img class="mb-2" src=${googBooks[i].imageLinks == null ? "" : googBooks[i].imageLinks.thumbnail == null ? "" : googBooks[i].imageLinks.thumbnail} />
                       <h6>Google Rating:</h6>
                    </div>                
                    <div class='container col-md-9 col-sm-6 col-lg-9 col-xl-10'>
                        <h3><a href="#">${googBooks[i].title}</a></h3>
                        <small>${googBooks[i].authors == null ? "" : googBooks[i].authors}</small>
                        <p class='lead'>${googBooks[i].description == null ? "" : googBooks[i].description}</p>
                    </div>
                 </div>
                   
                <hr/>
                `
                    ;
                div.id = 'google_search_' + i;
                document.getElementById('search_list').appendChild(div);
                document.getElementById('image_' + i).appendChild(stars);
            }
        }
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
    let search = data.q.replace(/[+]/g, " ");

    document.getElementById("query").value = search;
    return search;

}

async function parseJSON(json) {
    let books = [];
    if (json == null) {
        return null;
    }
    for (let i = 0; i < json.items.length; i++) {
     
        books.push({
            'title': json.items[i].volumeInfo.title,
            'authors': json.items[i].volumeInfo.authors,
            'publisher': json.items[i].volumeInfo.publisher,
            'ISBN': json.items[i].volumeInfo.industryIdentifiers,
            'description': json.items[i].volumeInfo.description,
            'googleRating': json.items[i].volumeInfo.averageRating,
            'imageLinks': json.items[i].volumeInfo.imageLinks,
            'totalRating': 0,
            'numberRating': 0 
        });
    }
    return books;
}