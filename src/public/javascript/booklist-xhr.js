
async function loadBooks() {
    let urlData = await parseURL();
    let userID = urlData.user;
    let decoded = decodeURIComponent(userID);
    let j = await getUser(decoded);
    await handleUser(j);
    await getList(j);
}

async function handleUser(user) {
    document.getElementById('username').innerHTML = user.username+"'s Book List";
}

/*0 want to read
 * 1 currently reading
 * 2 finished reading
 * 3 dropped
 * */
async function getList(j) {
    let books = j.bookList;
    let wantCount = 0;
    let readCount = 0;
    let finishedCount = 0;
    let dropCount = 0;
    for (let i = 0; i < books.length; i++) {
        let val = books[i].type;
        let book = await getBook(books[i].book);
        if (val === 0) {
            wantCount++;
            await handleList(book, wantcount, 'wishlist');
        } else if (val === 1) {
            readCount++;
            await handleList(books[i].book, readCount, 'reading');
        } else if (val === 2) {
            finishedCount++;
            await handleList(books[i].book, finishedCount, 'finished');
        } else {
            dropCount++;
            await handleList(books[i].book, dropCount, 'dropped');
        }
    }
    if (wantCount === 0) {
        await handleEmptyList('wishlist');
    }
    if (readCount === 0) {
        await handleEmptyList('reading');
    }
    if (finishedCount === 0) {
        await handleEmptyList('finished');
    }
    if (dropCount === 0) {
        await handleEmptyList('dropped');
    }

}

async function handleHeader(id) {
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).innerHTML =
        `<div class="table-responsive">
            <table class="table">
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
                <tbody id='booklist_'+${id}>
                </tbody>
         <div>`;
}

async function handleList(book, index, id) {
    if (index === 1) await handleHeader(id);
    let list = document.getElementById('booklist_' + id);
    let listitem = document.createElement('tr');
    listItem.innerHTML = `
     <th class="align-middle" scope="row">${index}</th>
     <td class="align-middle">
         <div style="width:45px;">
            <img src="${!book.imageLinks.smallthumbnail ? "" : book.imageLinks.smallthumbnail}" alt="..." class="img-thumbnail">
         </div>
     </td>
     <td class="align-middle"><a href="">${book.title}</a></td>
     <td class="align-middle">${book.authors}</td>
     <td class="align-middle" id=${id+index}>
     </td>
     <td class="align-middle">
          <button class="btn border" type="button">
            <i class="far fa-edit"></i> Edit
          </button>
     </td>`;
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
    documnet.getElementById(id + index).appendChild(stars);
    list.appendChild(listItem);
}

async function handleEmptyList(id) {
    document.getElementById(id).innerHTML = "";
    document.getElementById(id).innerHTML = `
    <table class="container text-center" style="height: 400px">
        <tbody>
            <tr>
                <td class="align-middle">
                    <h6 class="text-black-50 display-1">Book List Empty</h6>
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
