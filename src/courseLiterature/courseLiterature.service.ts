import { Prisma, PrismaClient } from "@prisma/client";
import type { CourseLiterature } from "@prisma/client";

const prisma = new PrismaClient();


export const getCourseLiterature = async (id: string): Promise<CourseLiterature | null> => {
    return prisma.courseLiterature.findUnique({
        where: {
            id,
        },
    });
};

export const createCourseLiterature = async (courseLiterature: Omit<CourseLiterature, "id">): Promise<CourseLiterature> => {
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
};

export const updateCourseLiterature = async (courseLiterature: Omit<CourseLiterature, "id">, id: string): Promise<CourseLiterature> => {
    return prisma.courseLiterature.update({
        where: {
            id,
        },
        data: {
            ...courseLiterature
        },
        select: {
            id: true,
            name: true,
            description: true,
            authors: true,
            courseId: true,
        }
    });
}

export const deleteCourseLiterature = async (id: string): Promise<void> => {
    await prisma.courseLiterature.delete({
        where: {
            id,
        }
    });
};

export function isCourseLiterature(body: any) {
    if ("name" in body && "courseId" in body && "description" in body && "authors" in body) {
        return true;
    }
    return false;
}
