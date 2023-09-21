import { Prisma, PrismaClient } from "@prisma/client";
import type { Course } from "@prisma/client";

const prisma = new PrismaClient();


export const getCourse = async (id: string): Promise<Course | null> => {
    return prisma.course.findUnique({
        where: {
            id,
        },
    });
};

export const getAllCourses = async (): Promise<Course[]> => {
    return prisma.course.findMany({
        orderBy: {
            year: "asc",
        },
    });
};

export const createCourse = async (course: Omit<Course, "id">): Promise<Course> => {
    const { courseCode, description, name, year, period } = course;

    return prisma.course.create({
        data: {
            name,
            courseCode,
            description,
            year,
            period,
            courseLiterature: {},
            projects: {},
            exams: {},
        },
        select: {
            id: true,
            name: true,
            courseCode: true,
            year: true,
            period: true,
            courseLiterature: true,
            description: true,
            projects: true,
            exams: true,
        }
    });
};

export const updateCourse = async (course: Omit<Course, "id">, id: string): Promise<Course> => {
    return prisma.course.update({
        where: {
            id,
        },
        data: {
            ...course
        },
        select: {
            id: true,
            name: true,
            courseCode: true,
            year: true,
            period: true,
            courseLiterature: true,
            description: true,
            projects: true,
            exams: true,
        }
    });
}

export const deleteCourse = async (id: string): Promise<void> => {
    await prisma.course.delete({
        where: {
            id,
        }
    });
};

export function isCourse(body: any) {
    if ("name" in body && "courseCode" in body && "description" in body) {
        return true;
    }
    return false;
}
