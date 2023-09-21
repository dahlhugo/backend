import { Router, Request, Response } from "express";
import * as CourseService from "./course.service";
import { ObjectId } from "bson";

const courseRouter = Router();

//GET: All courses
courseRouter.get("/all", async (req: Request, res: Response) => {
    try {
        const courses = await CourseService.getAllCourses();
        return res.status(200).json(courses);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//GET: A single author by id
courseRouter.get("/:id", async (req: Request, res: Response) => {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const course = await CourseService.getCourse(id);
        if (course) {
            return res.status(200).json(course);
        }
        return res.status(404).json("Course not found");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//POST: Create a new course
//Params: name, courseCode, description
courseRouter.post("/", async (req: Request, res: Response) => {
    try {
        if (!CourseService.isCourse(req.body)) {
            return res.status(400).json("Invalid body");
        }

        const course = await CourseService.createCourse(req.body);
        return res.status(200).json(course);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//PUT: Update a course
//Params: id , ...
courseRouter.put("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    //TODO: Validate body correctly / express-validator?
    if (!CourseService.isCourse(req.body)) {
        return res.status(400).json("Invalid body");
    }

    try {
        const id = req.params.id;
        const course = req.body;

        const updatedCourse = await CourseService.updateCourse(course, id);
        return res.status(200).json(updatedCourse);
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});

//DELETE: Delete a course
//Params: id

courseRouter.delete("/:id", async (req: Request, res: Response) => {
    if (!ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }

    try {
        const id = req.params.id;

        await CourseService.deleteCourse(id);
        return res.status(200).json("Course deleted");
    } catch (error: any) {
        return res.status(500).json(error.message);
    }
});


export default courseRouter;