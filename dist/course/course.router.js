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
const CourseService = __importStar(require("./course.service"));
const bson_1 = require("bson");
const courseRouter = (0, express_1.Router)();
//GET: All courses
courseRouter.get("/all", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const courses = yield CourseService.getAllCourses();
        return res.status(200).json(courses);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//GET: A single author by id
courseRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }
    try {
        const course = yield CourseService.getCourse(id);
        if (course) {
            return res.status(200).json(course);
        }
        return res.status(404).json("Course not found");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//POST: Create a new course
//Params: name, courseCode, description
courseRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!CourseService.isCourse(req.body)) {
            return res.status(400).json("Invalid body");
        }
        const course = yield CourseService.createCourse(req.body);
        return res.status(200).json(course);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//PUT: Update a course
//Params: id , ...
courseRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bson_1.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }
    //TODO: Validate body correctly / express-validator?
    if (!CourseService.isCourse(req.body)) {
        return res.status(400).json("Invalid body");
    }
    try {
        const id = req.params.id;
        const course = req.body;
        const updatedCourse = yield CourseService.updateCourse(course, id);
        return res.status(200).json(updatedCourse);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//DELETE: Delete a course
//Params: id
courseRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bson_1.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }
    try {
        const id = req.params.id;
        yield CourseService.deleteCourse(id);
        return res.status(200).json("Course deleted");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.default = courseRouter;
//# sourceMappingURL=course.router.js.map