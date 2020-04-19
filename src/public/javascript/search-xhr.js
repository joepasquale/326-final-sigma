const url = "http://localhost:4000";

function redirectSearch() {
    let search = document.getElementById("searchbar").value;
    let query = search.replace(/ /g, "%20"); 
    window.location.href = url + '/auth/search-results.html?q='+query;
}

function redirectSearch_MainBar(){
    let search = document.getElementById("mainsearch").value;
    let query = search.replace(/ /g, "%20");
    window.location.href = url + '/auth/search-results.html?q=' + query;
}

async function Search() {
    console.log('test');
    parseURL();

}

function parseURL() {
    let url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (let i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    console.log(data.q);
    let search = data.q.replace(/%20/g, " ");
    document.getElementById("mainsearch").value = search;
    document.getElementById("searchbar").value = search;

}