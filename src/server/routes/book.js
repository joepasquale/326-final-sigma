"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var router = require("express").Router();
exports.router = router;
var book_1 = require("../models/book");
router.post('/add', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var titl, auth, publ, ISBN, desc, pubDate, rate, imageLinks, cat, book;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!req.body.title)
                    return [2 /*return*/, res.status(400).send("invalid Title")];
                titl = req.body.title;
                auth = (!req.body.authors ? "" : req.body.authors);
                publ = (!req.body.publisher ? "" : req.body.publisher);
                ISBN = (!req.body.ISBN ? [{
                        "type": "",
                        "identifier": ""
                    }] : req.body.ISBN);
                desc = (!req.body.description ? "" : req.body.description);
                pubDate = (!req.body.publishedDate ? "" : req.body.publishedDate);
                rate = (!req.body.googleRating ? 0 : req.body.googleRating);
                imageLinks = (!req.body.imageLinks ? {
                    "smallThumbnail": "../resources/no_image_book.jpg",
                    "thumbnail": "../resources/no_image_book.jpg"
                } : req.body.imageLinks);
                cat = (!req.body.categories ? "" : req.body.categories);
                return [4 /*yield*/, book_1.Book.findOne({
                        'title': titl,
                        'authors': auth,
                        'publisher': publ,
                        'publishedDate': pubDate,
                        'categories': cat,
                        'description': desc,
                        'googleRating': rate,
                        'imageLinks': imageLinks,
                        'ISBN': {
                            $elemMatch: { type: ISBN[0].type, identifier: ISBN[0].identifier }
                        }
                    })];
            case 1:
                book = _a.sent();
                if (!!book) return [3 /*break*/, 3];
                book = new book_1.Book({
                    title: titl,
                    authors: auth,
                    publisher: publ,
                    publishedDate: pubDate,
                    ISBN: ISBN,
                    categories: cat,
                    description: desc,
                    googleRating: rate,
                    imageLinks: imageLinks,
                    userReview: []
                });
                return [4 /*yield*/, book.save()];
            case 2:
                _a.sent();
                _a.label = 3;
            case 3:
                res.json(book);
                return [2 /*return*/];
        }
    });
}); });
router.post('/read', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, book_1.Book.findOne({ _id: id })
                        .then(function (book) {
                        if (!book)
                            return res.status(400).send("No Book Found");
                        res.json(book);
                    })["catch"](function (err) {
                        return res.status(400).send("No Book Found");
                    })];
            case 1:
                _a.sent();
                res.end();
                return [2 /*return*/];
        }
    });
}); });
router.post('/review/create', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
