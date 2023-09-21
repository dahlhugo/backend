import { Router, Request, Response } from "express";
import * as NewsService from "./news.service";
import { ObjectId } from "bson";

const newsRouter = Router();

//GET: All news in descending order
newsRouter.get("/news-feed", async (req: Request, res: Response) => {
    try {
        const news = await NewsService.getAllNews();

        return res.status(200).json(news);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

newsRouter.get("/latest-news", async (req: Request, res: Response) => {
    try {
        const news = await NewsService.getLatestNews();

        if (!news) {
            return res.status(404).send("latest news not found");
        }

        return res.status(200).json(news);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

newsRouter.get("/latest-news", async (req: Request, res: Response) => {
    try {
        const event = await NewsService.getLatestEvent();

        if (!event) {
            return res.status(404).send("latest news not found");
        }

        return res.status(200).json(event);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//GET: All events in descending order
newsRouter.get("/event-feed", async (req: Request, res: Response) => {
    try {
        const events = await NewsService.getAllEvents();

        return res.status(200).json(events);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


//GET: A single author by id
newsRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const news = await NewsService.getNews(id);
        if (news) {
            return res.status(200).json(news);
        }
        return res.status(404).json("News not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


//POST: Create a new news
//Params: name, newsCode, description
newsRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!NewsService.isNews(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const news = await NewsService.createNews(req.body);
        return res.status(200).json(news);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a news
//Params: id , ...
newsRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    if (!NewsService.isNews(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const news = req.body;

        const updatedNews = await NewsService.updateNews(news, id);
        return res.status(200).json(updatedNews);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a news
//Params: id

newsRouter.delete("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const id = req.params.id;

        await NewsService.deleteNews(id);
        return res.status(200).json("News deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


export default newsRouter;