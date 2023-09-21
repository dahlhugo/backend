import { Router, Request, Response } from "express";
import * as UserService from "./user.service";
import { ObjectId } from "bson";

const userRouter = Router();

//GET: A single author by id
userRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const user = await UserService.getUser(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json("User not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//POST: Create a new user
//Params: name, email
userRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!UserService.isUser(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const user = await UserService.createUser(req.body);
        return res.status(200).json(user);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a user
//Params:
userRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    if (!UserService.isUser(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const user = req.body;

        const updatedUser = await UserService.updateUser(user, id);
        return res.status(200).json(updatedUser);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a user
//Params: id
userRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        await UserService.deleteUser(id);
        return res.status(200).end("User deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

export default userRouter;