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
exports.isNews = exports.deleteNews = exports.updateNews = exports.createNews = exports.getAllEvents = exports.getLatestEvent = exports.getLatestNews = exports.getAllNews = exports.getNews = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.news.findUnique({
        where: {
            id,
        },
    });
});
exports.getNews = getNews;
const getAllNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.news.findMany({
        where: {
            organizer: null,
        },
        orderBy: {
            publishDate: "desc",
        },
    });
});
exports.getAllNews = getAllNews;
const getLatestNews = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.news.findFirst({
        where: {
            organizer: null,
        },
        orderBy: {
            publishDate: "desc",
        },
    });
});
exports.getLatestNews = getLatestNews;
const getLatestEvent = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.news.findFirst({
        where: {
            organizer: {
                not: null,
            }
        },
        orderBy: {
            publishDate: "desc",
        },
    });
});
exports.getLatestEvent = getLatestEvent;
const getAllEvents = () => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.news.findMany({
        where: {
            organizer: {
                not: null,
            }
        },
        orderBy: {
            publishDate: "desc",
        },
    });
});
exports.getAllEvents = getAllEvents;
const createNews = (news) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, text, image, organizer, sources } = news;
    return prisma.news.create({
        data: {
            title,
            text,
            image,
            organizer: organizer ? organizer : null,
            sources,
        },
        select: {
            id: true,
            title: true,
            text: true,
            image: true,
            organizer: true,
            sources: true,
            publishDate: true,
        }
    });
});
exports.createNews = createNews;
const updateNews = (news, id) => __awaiter(void 0, void 0, void 0, function* () {
    return prisma.news.update({
        where: {
            id,
        },
        data: Object.assign({}, news),
        select: {
            id: true,
            title: true,
            text: true,
            image: true,
            organizer: true,
            sources: true,
            publishDate: true,
        }
    });
});
exports.updateNews = updateNews;
const deleteNews = (id) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.news.delete({
        where: {
            id,
        }
    });
});
exports.deleteNews = deleteNews;
function isNews(body) {
    if ("title" in body && "text" in body && "sources" in body) {
        return true;
    }
    return false;
}
exports.isNews = isNews;
//# sourceMappingURL=news.service.js.map