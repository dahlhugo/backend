import { Router, Request, Response } from "express";
import * as ExamService from "./exam.service";
import { ObjectId } from "bson";

const examRouter = Router();

//GET: A single author by id
examRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const exam = await ExamService.getExam(id);
        if (exam) {
            return res.status(200).json(exam);
        }
        return res.status(404).json("Exam not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//POST: Create a new exam
//Params: name, examCode, description
examRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!ExamService.isExam(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const exam = await ExamService.createExam(req.body);
        return res.status(200).json(exam);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a exam
//Params: id , ...
examRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    //TODO: Validate body correctly / express-validator?
    if (!ExamService.isExam(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const exam = req.body;

        const updatedExam = await ExamService.updateExam(exam, id);
        return res.status(200).json(updatedExam);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a exam
//Params: id

examRouter.delete("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const id = req.params.id;

        await ExamService.deleteExam(id);
        return res.status(200).json("Exam deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


export default examRouter;