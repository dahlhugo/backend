import { Prisma, PrismaClient } from "@prisma/client";
import type { Post } from "@prisma/client";

const prisma = new PrismaClient();


export const getPost = async (id: string): Promise<Post | null> => {
    return prisma.post.findUnique({
        where: {
            id,
        },
    });
};

export const getPostFromUser = async (authorId: string): Promise<Post[]> => {
    return prisma.post.findMany({
        where: {
            authorId,
        },
    });
};

export const createPost = async (post: Omit<Post, "id" | "author">): Promise<Post> => {
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
};

export const updatePost = async (post: Omit<Post, "id">, id: string): Promise<Post> => {
    return prisma.post.update({
        where: {
            id,
        },
        data: {
            ...post
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
}

export const deletePost = async (id: string): Promise<void> => {
    await prisma.post.delete({
        where: {
            id,
        }
    });
};

export function isPost(body: any) {
    if ("authorId" in body && "text" in body) {
        return true;
    }
    return false;
}
