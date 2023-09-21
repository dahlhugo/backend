import type { News, } from "@prisma/client";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();


export const getNews = async (id: string): Promise<News | null> => {
    return prisma.news.findUnique({
        where: {
            id,
        },
    });
};

export const getAllNews = async (): Promise<News[]> => {
    return prisma.news.findMany({
        where: {
            organizer: null,
        },
        orderBy: {
            publishDate: "desc",
        },
    });
};

export const getLatestNews = async (): Promise<News> => {
    return prisma.news.findFirst({
        where: {
            organizer: null,
        },
        orderBy: {
            publishDate: "desc",
        },
    });
};

export const getLatestEvent = async (): Promise<News> => {
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
};

export const getAllEvents = async (): Promise<News[]> => {
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
};

export const createNews = async (news: Omit<News, "id">): Promise<News> => {
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
};

export const updateNews = async (news: Omit<News, "id">, id: string): Promise<News> => {
    return prisma.news.update({
        where: {
            id,
        },
        data: {
            ...news
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
}

export const deleteNews = async (id: string): Promise<void> => {
    await prisma.news.delete({
        where: {
            id,
        }
    });
};

export function isNews(body: any) {
    if ("title" in body && "text" in body && "sources" in body) {
        return true;
    }
    return false;
}
