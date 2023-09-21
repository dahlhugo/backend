import { Router, Request, Response } from "express";
import * as ProjectService from "./project.service";
import { ObjectId } from "bson";
import { Project } from "@prisma/client";

const projectRouter = Router();

//GET: Projects by author
projectRouter.get("/author/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const projects = await ProjectService.getProjectsFromUser(id);
        return res.status(200).json(projects);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//GET: A single project by id
projectRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const project = await ProjectService.getProject(id);
        if (project) {
            return res.status(200).json(project);
        }
        return res.status(404).send("Project not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//POST: Create a new project
//Params: name, authorId, courseId, yearCreated, links, image, description
projectRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!ProjectService.isProject(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const project = await ProjectService.createProject(req.body);
        return res.status(200).json(project);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a project
//Params:
projectRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    if (!ProjectService.isProject(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const project = req.body;

        const updatedProject = await ProjectService.updateProject(project, id);
        return res.status(200).json(updatedProject);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a project
//Params: id
projectRouter.delete("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        await ProjectService.deleteProject(id);
        return res.status(200).end("Project deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

export default projectRouter;