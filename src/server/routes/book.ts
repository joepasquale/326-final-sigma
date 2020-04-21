const router = require("express").Router();
import { Book } from '../models/book';
import { User } from '../models/user';

router.put('/add', async (req, res) => {
    if (!req.body.title) return res.status(400).send("invalid Title");
    let titl = req.body.title;
    let auth = (!req.body.authors ? "" : req.body.authors);
    let publ = (!req.body.publisher ? "" : req.body.publisher);
    let ISBN = (!req.body.ISBN ? [{
        "type": "",
        "identifier": ""
    } ] : req.body.ISBN);
    let desc =(!req.body.description ? "" : req.body.description);
    let rate = (!req.body.googleRating ? 0 : req.body.googleRating);
    let imageLinks = (!req.body.imageLinks ? {
        "smallThumbnail": "",
        "thumbnail": ""
    } : req.body.imageLinks);
    let book = await Book.findOne({
        'title': titl,
        'authors': auth,
        'publisher': publ,
        'description': desc,
        'googleRating': rate,
        'imageLinks': imageLinks,
        'ISBN': {
            $elemMatch: { type: ISBN[0].type, identifier:ISBN[0].identifier}
        }
    });
    //await Book.findOne({ 'ISBN': { $elemMatch: { identifier: req.body.ISBN[0].identifier } } });
    if (!book) {
        book = new Book({
            title: titl,
            authors: auth,
            publisher: publ,
            ISBN: ISBN,
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

router.get('/:title', async (req, res) => {
    let title = req.params.title
    let decoded = decodeURIComponent(title);
    let book = await Book.findOne({ title: decoded });
    if (!book) return res.status(400).send("No Book Found");
    res.json(book);
});

router.post('/:title/review/create', async (req, res) => {

});




export { router };