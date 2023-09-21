import { Prisma, PrismaClient } from "@prisma/client";
import type { Project } from "@prisma/client";

const prisma = new PrismaClient();


export const getProject = async (id: string): Promise<Project | null> => {
    return prisma.project.findUnique({
        where: {
            id,
        },
    });
};

export const getProjectsFromUser = async (id: string): Promise<Project[]> => {
    return prisma.project.findMany({
        where: {
            authorId: id,
        },
    });
};
export const createProject = async (project: Omit<Project, "id" | "author" | "course">): Promise<Project> => {
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
};

export const updateProject = async (project: Omit<Project, "id">, id: string): Promise<Project> => {
    return prisma.project.update({
        where: {
            id,
        },
        data: {
            ...project
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
}

export const deleteProject = async (id: string): Promise<void> => {
    await prisma.project.delete({
        where: {
            id,
        }
    });
};

export function isProject(body: any) {
    if ("authorId" in body && "description" in body && "name" in body && "courseId" in body && "links" in body) {
        return true;
    }
    return false;
}
