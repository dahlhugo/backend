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
exports.isCourseLiterature = exports.deleteCourseLiterature = exports.updateCourseLiterature = exports.createCourseLiterature = exports.getCourseLiterature = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCourseLiterature = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.courseLiterature.findUnique({
        where: {
            id,
        },
    });
});
exports.getCourseLiterature = getCourseLiterature;
const createCourseLiterature = (courseLiterature) => __awaiter(void 0, void 0, void 0, function* () {
    const { authors, courseId, description, name } = courseLiterature;
    return prisma.courseLiterature.create({
        data: {
            name,
            description,
            authors,
            courseId
        },
        select: {
            id: true,
            name: true,
            description: true,
            authors: true,
            courseId: true,
        }
    });
});
exports.createCourseLiterature = createCourseLiterature;
const updateCourseLiterature = (courseLiterature, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.courseLiterature.update({
        where: {
            id,
        },
        data: Object.assign({}, courseLiterature),
        select: {
            id: true,
            name: true,
            description: true,
            authors: true,
            courseId: true,
        }
    });
});
exports.updateCourseLiterature = updateCourseLiterature;
const deleteCourseLiterature = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.courseLiterature.delete({
        where: {
            id,
        }
    });
});
exports.deleteCourseLiterature = deleteCourseLiterature;
function isCourseLiterature(body) {
    if ("name" in body && "courseId" in body && "description" in body && "authors" in body) {
        return true;
    }
    return false;
}
exports.isCourseLiterature = isCourseLiterature;
//# sourceMappingURL=courseLiterature.service.js.map