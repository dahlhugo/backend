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
exports.isUser = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.findUnique({
        where: {
            id,
        },
    });
});
exports.getUser = getUser;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, name } = user;
    return prisma.user.create({
        data: {
            name,
            email,
            posts: {},
            projects: {},
        },
        select: {
            id: true,
            email: true,
            name: true,
            profilePicture: true,
            slogan: true,
        }
    });
});
exports.createUser = createUser;
const updateUser = (user, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.user.update({
        where: {
            id,
        },
        data: Object.assign({}, user),
        select: {
            id: true,
            email: true,
            name: true,
            profilePicture: true,
            slogan: true,
        }
    });
});
exports.updateUser = updateUser;
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.user.delete({
        where: {
            id,
        }
    });
});
exports.deleteUser = deleteUser;
function isUser(body) {
    if ("email" in body && "name" in body)
        return true;
    return false;
}
exports.isUser = isUser;
//# sourceMappingURL=user.service.js.map