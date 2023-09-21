import { Router, Request, Response } from "express";
import * as CourseLiteratureService from "./courseLiterature.service";
import { ObjectId } from "bson";

const courseLiteratureRouter = Router();

//GET: A single author by id
courseLiteratureRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const courseLiterature = await CourseLiteratureService.getCourseLiterature(id);
        if (courseLiterature) {
            return res.status(200).json(courseLiterature);
        }
        return res.status(404).json("CourseLiterature not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//POST: Create a new courseLiterature
//Params: name, courseLiteratureCode, description
courseLiteratureRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!CourseLiteratureService.isCourseLiterature(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const courseLiterature = await CourseLiteratureService.createCourseLiterature(req.body);
        return res.status(200).json(courseLiterature);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a courseLiterature
//Params: id , ...
courseLiteratureRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    //TODO: Validate body correctly / express-validator?
    if (!CourseLiteratureService.isCourseLiterature(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const courseLiterature = req.body;

        const updatedCourseLiterature = await CourseLiteratureService.updateCourseLiterature(courseLiterature, id);
        return res.status(200).json(updatedCourseLiterature);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a courseLiterature
//Params: id

courseLiteratureRouter.delete("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const id = req.params.id;

        await CourseLiteratureService.deleteCourseLiterature(id);
        return res.status(200).json("CourseLiterature deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


export default courseLiteratureRouter;