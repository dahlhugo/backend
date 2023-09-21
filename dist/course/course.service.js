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
Object.defineProperty(exports, "__esModule", { value: true });
exports.isCourse = exports.deleteCourse = exports.updateCourse = exports.createCourse = exports.getAllCourses = exports.getCourse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.course.findUnique({
        where: {
            id,
        },
    });
});
exports.getCourse = getCourse;
const getAllCourses = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.course.findMany({
        orderBy: {
            year: "asc",
        },
    });
});
exports.getAllCourses = getAllCourses;
const createCourse = (course) => __awaiter(void 0, void 0, void 0, function* () {
    const { courseCode, description, name, year, period } = course;
    return prisma.course.create({
        data: {
            name,
            courseCode,
            description,
            year,
            period,
            courseLiterature: {},
            projects: {},
            exams: {},
        },
        select: {
            id: true,
            name: true,
            courseCode: true,
            year: true,
            period: true,
            courseLiterature: true,
            description: true,
            projects: true,
            exams: true,
        }
    });
});
exports.createCourse = createCourse;
const updateCourse = (course, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.course.update({
        where: {
            id,
        },
        data: Object.assign({}, course),
        select: {
            id: true,
            name: true,
            courseCode: true,
            year: true,
            period: true,
            courseLiterature: true,
            description: true,
            projects: true,
            exams: true,
        }
    });
});
exports.updateCourse = updateCourse;
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.course.delete({
        where: {
            id,
        }
    });
});
exports.deleteCourse = deleteCourse;
function isCourse(body) {
    if ("name" in body && "courseCode" in body && "description" in body) {
        return true;
    }
    return false;
}
exports.isCourse = isCourse;
//# sourceMappingURL=course.service.js.map