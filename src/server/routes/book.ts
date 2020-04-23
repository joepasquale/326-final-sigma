const router = require("express").Router();
import { Book } from '../models/book';


router.post('/add', async (req, res) => {
    if (!req.body.title) return res.status(400).send("invalid Title");
    let titl = req.body.title;
    let auth = (!req.body.authors ? "" : req.body.authors);
    let publ = (!req.body.publisher ? "" : req.body.publisher);
    let ISBN = (!req.body.ISBN ? [{
        "type": "",
        "identifier": ""
    } ] : req.body.ISBN);
    let desc = (!req.body.description ? "" : req.body.description);
    let pubDate = (!req.body.publishedDate ? "" : req.body.publishedDate);
    let rate = (!req.body.googleRating ? 0 : req.body.googleRating);
    let imageLinks = (!req.body.imageLinks ? {
        "smallThumbnail": "../resources/no_image_book.jpg",
        "thumbnail": "../resources/no_image_book.jpg"
    } : req.body.imageLinks);
    let cat = (!req.body.categories ? "" : req.body.categories);
    let book = await Book.findOne({
        'title': titl,
        'authors': auth,
        'publisher': publ,
        'publishedDate': pubDate,
        'categories': cat,
        'description': desc,
        'googleRating': rate,
        'imageLinks': imageLinks,
        'ISBN': {
            $elemMatch: { type: ISBN[0].type, identifier:ISBN[0].identifier}
        }
    });
    if (!book) {
        book = new Book({
            title: titl,
            authors: auth,
            publisher: publ,
            publishedDate: pubDate,
            ISBN: ISBN,
            categories: cat,
            description: desc,
            googleRating: rate,
            imageLinks: imageLinks,
            userRating: [],
            userReview: []
        });
        await book.save();
    }       
   
    res.json(book);
});

router.post('/read', async (req, res) => {
    let id = req.body.id;
    await Book.findOne({ _id: id})
        .then(book => {
            if (!book) return res.status(400).send("No Book Found");
            res.json(book);
        })
        .catch(err => {
            return res.status(400).send("No Book Found");
        });
    res.end();
});

router.post('/review/create', async (req, res) => {

});




export { router };