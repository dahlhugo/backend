import { PrismaClient } from "@prisma/client";
import type { User, Post } from "@prisma/client";

const prisma = new PrismaClient();



export const getUser = async (id: string): Promise<User | null> => {
    return prisma.user.findUnique({
        where: {
            id,
        },
    })
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
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
};

export const updateUser = async (user: Omit<Partial<User>, "id">, id: string): Promise<User> => {

    return prisma.user.update({
        where: {
            id,
        },
        data: {
            ...user
        },
        select: {
            id: true,
            email: true,
            name: true,
            profilePicture: true,
            slogan: true,
        }
    });
}

export const deleteUser = async (id: string): Promise<void> => {
    await prisma.user.delete({
        where: {
            id,
        }
    });
};
export function isUser(body: any) {
    if ("email" in body && "name" in body) return true;
    return false;
}

