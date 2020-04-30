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
var friends_1 = require("../models/friends");
var user_1 = require("../models/user");
router.post('/request', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var relationshipA, relationshipB;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, friends_1.Friend.findOneAndUpdate({ requester: req.body.UserA, receiver: req.body.UserB }, { $set: { status: 1 } }, { upsert: true, "new": true })];
            case 1:
                relationshipA = _a.sent();
                return [4 /*yield*/, friends_1.Friend.findOneAndUpdate({ requester: req.body.UserB, receiver: req.body.UserA }, { $set: { status: 2 } }, { upsert: true, "new": true })];
            case 2:
                relationshipB = _a.sent();
                return [4 /*yield*/, user_1.User.findOneAndUpdate({ _id: req.body.UserA }, { $push: { friends: relationshipA } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, user_1.User.findOneAndUpdate({ _id: req.body.UserB }, { $push: { friends: relationshipB } })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/accept', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        friends_1.Friend.findOneAndUpdate({ requester: req.body.UserA, receiver: req.body.UserB }, { $set: { status: 3 } });
        friends_1.Friend.findOneAndUpdate({ requester: req.body.UserB, receiver: req.body.A }, { $set: { status: 3 } });
        return [2 /*return*/];
    });
}); });
router.post('/reject', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var relationshipA, relationshipB;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, friends_1.Friend.findOneAndRemove({ requester: req.body.UserA, receiver: req.body.UserB })];
            case 1:
                relationshipA = _a.sent();
                return [4 /*yield*/, friends_1.Friend.findOneAndRemove({ requester: req.body.UserB, receiver: req.body.UserA })];
            case 2:
                relationshipB = _a.sent();
                return [4 /*yield*/, user_1.User.findOneAndUpdate({ _id: req.body.UserA }, { $pull: { friends: relationshipA._id } })];
            case 3:
                _a.sent();
                return [4 /*yield*/, user_1.User.findOneAndUpdate({ _id: req.body.UserB }, { $pull: { friends: relationshipB._id } })];
            case 4:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/all', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var friendslist, docfriends;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                friendslist = req.body.array;
                return [4 /*yield*/, friends_1.Friend.find({ '_id': { $in: friendslist } })
                        .populate('receiver', '_id username email firstname lastname')
                        .populate('requester', '_id username email firstname lastname')];
            case 1:
                docfriends = _a.sent();
                res.json(docfriends);
                return [2 /*return*/];
        }
    });
}); });
router.post('/remove', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/];
    });
}); });
