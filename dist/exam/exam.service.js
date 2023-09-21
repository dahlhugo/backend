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
exports.isExam = exports.deleteExam = exports.updateExam = exports.createExam = exports.getExam = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.exam.findUnique({
        where: {
            id,
        },
    });
});
exports.getExam = getExam;
const createExam = (exam) => __awaiter(void 0, void 0, void 0, function* () {
    const { link, date, courseId } = exam;
    return prisma.exam.create({
        data: {
            link,
            date,
            courseId
        },
        select: {
            id: true,
            link: true,
            date: true,
            courseId: true,
            course: true,
        }
    });
});
exports.createExam = createExam;
const updateExam = (exam, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.exam.update({
        where: {
            id,
        },
        data: Object.assign({}, exam),
        select: {
            id: true,
            link: true,
            date: true,
            courseId: true,
            course: true,
        }
    });
});
exports.updateExam = updateExam;
const deleteExam = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.exam.delete({
        where: {
            id,
        }
    });
});
exports.deleteExam = deleteExam;
function isExam(body) {
    if ("link" in body && "date" in body && "courseId" in body) {
        return true;
    }
    return false;
}
exports.isExam = isExam;
//# sourceMappingURL=exam.service.js.map