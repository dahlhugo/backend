"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const NewsService = __importStar(require("./news.service"));
const bson_1 = require("bson");
const newsRouter = (0, express_1.Router)();
//GET: All news in descending order
newsRouter.get("/news-feed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield NewsService.getAllNews();
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
newsRouter.get("/latest-news", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const news = yield NewsService.getLatestNews();
        if (!news) {
            return res.status(404).send("latest news not found");
        }
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
newsRouter.get("/latest-news", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const event = yield NewsService.getLatestEvent();
        if (!event) {
            return res.status(404).send("latest news not found");
        }
        return res.status(200).json(event);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//GET: All events in descending order
newsRouter.get("/event-feed", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const events = yield NewsService.getAllEvents();
        return res.status(200).json(events);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//GET: A single author by id
newsRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }
    try {
        const news = yield NewsService.getNews(id);
        if (news) {
            return res.status(200).json(news);
        }
        return res.status(404).json("News not found");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//POST: Create a new news
//Params: name, newsCode, description
newsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!NewsService.isNews(req.body)) {
            return res.status(400).json("Invalid body");
        }
        const news = yield NewsService.createNews(req.body);
        return res.status(200).json(news);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//PUT: Update a news
//Params: id , ...
newsRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bson_1.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }
    if (!NewsService.isNews(req.body)) {
        return res.status(400).json("Invalid body");
    }
    try {
        const id = req.params.id;
        const news = req.body;
        const updatedNews = yield NewsService.updateNews(news, id);
        return res.status(200).json(updatedNews);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//DELETE: Delete a news
//Params: id
newsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bson_1.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }
    try {
        const id = req.params.id;
        yield NewsService.deleteNews(id);
        return res.status(200).json("News deleted");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.default = newsRouter;
//# sourceMappingURL=news.router.js.map