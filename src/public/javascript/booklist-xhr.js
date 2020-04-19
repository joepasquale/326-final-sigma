const url = "http://localhost:4000";

async function loadBooks() {
    //let user = parseURL();

}

function parseURL() {
    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    let search = data.q.replace(/[+]/g, " ");

    document.getElementById("query").value = search;
    return search;

}