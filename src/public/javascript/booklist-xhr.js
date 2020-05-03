
let userProfile;

async function loadBooks() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await getUser(decoded);
    userProfile = j
    let resp = await postData("/api/booklist/all", { 'array': userProfile.booklist })
    books = await resp.json();
    await handleUser();
    await getList(books);
}

async function handleUser() {
    document.getElementById('username').innerHTML =`<a href=${url + "/auth/profile.html?user="+ userProfile._id}>${userProfile.username}'s</a> Book List`;
}

/*0 want to read
 * 1 currently reading
 * 2 finished reading
 * 3 dropped
 * */
async function getList(books) {
    console.log(books);
    let wantCount = 0;
    let readCount = 0;
    let finishedCount = 0;
    let dropCount = 0;
    for (let i = 0; i < books.length; i++) {
        let val = books[i].status;
        let book = books[i].book;
        if (val === 1) {
            wantCount++;
            await handleList(book, wantCount, 'wishlist');
        } else if (val === 2) {
            readCount++;
            await handleList(book, readCount, 'reading');
        } else if (val === 3) {
            finishedCount++;
            await handleList(book, finishedCount, 'finished');
        } else {
            dropCount++;
            await handleList(book, dropCount, 'dropped');
        }
    }
    if (wantCount === 0) {
        await handleEmptyList('wishlist', "Wishlist Empty");
    }
    if (readCount === 0) {
        await handleEmptyList('reading', "Reading List Empty");
    }
    if (finishedCount === 0) {
        await handleEmptyList('finished', "Finished List Empty");
    }
    if (dropCount === 0) {
        await handleEmptyList('dropped', "Dropped List Empty");
    }

}

async function handleHeader(id) {
    document.getElementById(id+"_table").innerHTML = "";
    document.getElementById(id+"_table").innerHTML =
        `
             <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Genre</th>
                    <th scope="col">Rating</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
            <tbody id="${id+"_body"}">
            </tbody>
         `;
}

async function handleList(book, index, id) {
    if (index === 1) await handleHeader(id);
    let list = document.getElementById(id+"_body");
    console.log(id);
    console.log(list);
    let listItem = document.createElement('tr');
    listItem.innerHTML = `
        <th class="align-middle" scope="row">${index}</th>
        <td class="align-middle">
            <div style="width:45px;">
                <img src="${!book.imageLinks.thumbnail ? "" : book.imageLinks.thumbnail}" alt="..." class="img-thumbnail">
            </div>
        </td>
        <td class="align-middle"><a href="${url + "/auth/bookPage.html?book=" + book._id}">${book.title}</a></td>
        <td class="align-middle">${book.authors}</td>
        <td class="align-middle">${book.categories}</td>
        <td class="align-middle" id=${id+index}>
        </td>
        <td class="align-middle">
            <div class="dropdown-menu" id="drop_down" aria-labelledby="dropdownMenuButton">
                                           
            </div>
        </td>`;
    const stars = document.createElement('div');
    stars.className = 'container-xl';
    for (let j = book.googleRating; j > 0; j--) {
        if (j > 0 && j < 1) {
            stars.innerHTML += '<i class="fas fa-star-half text-warning"></i>';
        } else {
            stars.innerHTML += '<i class="fas fa-star text-warning"></i>';
        }
    }
    for (let j = book.googleRating; j <= 4; j++) {
        stars.innerHTML += '<i class="far fa-star text-warning"></i>';
    }
   
    list.appendChild(listItem);
    document.getElementById(id + index).appendChild(stars);
}

async function handleEmptyList(id, message) {
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).innerHTML = `
    <table class="container text-center" style="height: 400px">
        <tbody>
            <tr>
                <td class="align-middle">
                    <h6 class="text-black-50 display-1">${message}</h6>
                </td>
            </tr>
        </tbody>
    </table>`;
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
