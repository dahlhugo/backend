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
exports.isPost = exports.deletePost = exports.updatePost = exports.createPost = exports.getPostFromUser = exports.getPost = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getPost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.post.findUnique({
        where: {
            id,
        },
    });
});
exports.getPost = getPost;
const getPostFromUser = (authorId) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.post.findMany({
        where: {
            authorId,
        },
    });
});
exports.getPostFromUser = getPostFromUser;
const createPost = (post) => __awaiter(void 0, void 0, void 0, function* () {
    const { authorId, text } = post;
    return prisma.post.create({
        data: {
            authorId,
            text,
            likes: []
        },
        select: {
            id: true,
            author: true,
            authorId: true,
            text: true,
            publishDate: true,
            rating: true,
            likes: true,
        }
    });
});
exports.createPost = createPost;
const updatePost = (post, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.post.update({
        where: {
            id,
        },
        data: Object.assign({}, post),
        select: {
            id: true,
            author: true,
            authorId: true,
            text: true,
            publishDate: true,
            rating: true,
            likes: true,
        }
    });
});
exports.updatePost = updatePost;
const deletePost = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.post.delete({
        where: {
            id,
        }
    });
});
exports.deletePost = deletePost;
function isPost(body) {
    if ("authorId" in body && "text" in body) {
        return true;
    }
    return false;
}
exports.isPost = isPost;
//# sourceMappingURL=post.service.js.map