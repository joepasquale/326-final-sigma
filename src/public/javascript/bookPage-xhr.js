const url = "http://localhost:4000";

async function addReview() {

    let Review = document.getElementById("reviewText").value;

    const data = {"Review" : Review};
        const newURL = "http://localhost:4000/api/book/review";  //Check later **************************
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

async function addToList() {

    let Review = document.getElementById("reviewText").value;

    const data = { "List" : List};
        const newURL = "http://localhost:4000/api/book/addList";  //Check later***************************
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

async function getBook() {

}