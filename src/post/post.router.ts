import { Router, Request, Response } from "express";
import * as PostService from "./post.service";
import { ObjectId } from "bson";

const postRouter = Router();

//GET: Posts by author
postRouter.get("/author/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const posts = await PostService.getPostFromUser(id);
        return res.json(posts);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


//GET: A single author by id
postRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const post = await PostService.getPost(id);
        if (post) {
            return res.json(post);
        }
        return res.status(404).json("Post not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//POST: Create a new post
//Params: name, email
postRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!PostService.isPost(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const post = await PostService.createPost(req.body);
        return res.json(post);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a post
//Params:  
postRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    if (!PostService.isPost(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const post = req.body;

        const updatedPost = await PostService.updatePost(post, id);
        return res.status(200).json(updatedPost);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a post
//Params: id

postRouter.delete("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const id = req.params.id;

        await PostService.deletePost(id);
        return res.status(200).json("Post deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


export default postRouter;