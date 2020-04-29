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
var user_1 = require("../models/user");
var auth_1 = require("../middleware/auth");
router.post('/read', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.body.id;
                return [4 /*yield*/, user_1.User.findOne({ _id: id }, { password: 0 })
                        .exec(function (err, user) {
                        if (err) {
                            console.log(err);
                            return res.status(400).send("No User Found");
                        }
                        if (!user)
                            return res.status(400).send("No User Found");
                        console.log(user);
                        res.json(user);
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/search', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var search;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                search = req.body.search;
                if (!search)
                    return [2 /*return*/, res.status(400).send("No profile found")];
                return [4 /*yield*/, user_1.User.find({ $text: { $search: search } }, { password: 0 })
                        .then(function (profiles) {
                        console.log("profile found or not found");
                        if (!profiles || profiles.length === 0)
                            return res.status(400).send("No profiles found");
                        res.send(profiles);
                    })["catch"](function (err) {
                        console.log("search error");
                        return res.status(400).send("error");
                    })];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); });
router.post('/info/update', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log(req.body.info);
                return [4 /*yield*/, user_1.User.findOneAndUpdate({ username: req.body.username }, { $set: { info: req.body.info } })];
            case 1:
                _a.sent();
                res.status(200).send("user updated");
                return [2 /*return*/];
        }
    });
}); });
router.post('/me', auth_1.auth, function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        res.json(req.user);
        return [2 /*return*/];
    });
}); });
