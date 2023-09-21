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
exports.isProject = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectsFromUser = exports.getProject = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.project.findUnique({
        where: {
            id,
        },
    });
});
exports.getProject = getProject;
const getProjectsFromUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.project.findMany({
        where: {
            authorId: id,
        },
    });
});
exports.getProjectsFromUser = getProjectsFromUser;
const createProject = (project) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, yearCreated, courseId, authorId, links, image, description } = project;
    return prisma.project.create({
        data: {
            name,
            yearCreated,
            courseId,
            authorId,
            links,
            image,
            description,
        },
        select: {
            id: true,
            name: true,
            author: true,
            authorId: true,
            description: true,
            publishDate: true,
            courseId: true,
            course: true,
            links: true,
            image: true,
            yearCreated: true,
        }
    });
});
exports.createProject = createProject;
const updateProject = (project, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.project.update({
        where: {
            id,
        },
        data: Object.assign({}, project),
        select: {
            id: true,
            name: true,
            author: true,
            authorId: true,
            description: true,
            publishDate: true,
            courseId: true,
            course: true,
            links: true,
            image: true,
            yearCreated: true,
        }
    });
});
exports.updateProject = updateProject;
const deleteProject = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.project.delete({
        where: {
            id,
        }
    });
});
exports.deleteProject = deleteProject;
function isProject(body) {
    if ("authorId" in body && "description" in body && "name" in body && "courseId" in body && "links" in body) {
        return true;
    }
    return false;
}
exports.isProject = isProject;
//# sourceMappingURL=project.service.js.map