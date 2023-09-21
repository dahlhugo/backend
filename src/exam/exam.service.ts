import { Prisma, PrismaClient } from "@prisma/client";
import type { Exam } from "@prisma/client";

const prisma = new PrismaClient();


export const getExam = async (id: string): Promise<Exam | null> => {
    return prisma.exam.findUnique({
        where: {
            id,
        },
    });
};

export const createExam = async (exam: Omit<Exam, "id">): Promise<Exam> => {
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
};

export const updateExam = async (exam: Omit<Exam, "id">, id: string): Promise<Exam> => {
    return prisma.exam.update({
        where: {
            id,
        },
        data: {
            ...exam
        },
        select: {
            id: true,
            link: true,
            date: true,
            courseId: true,
            course: true,
        }
    });
}

export const deleteExam = async (id: string): Promise<void> => {
    await prisma.exam.delete({
        where: {
            id,
        }
    });
};

export function isExam(body: any) {
    if ("link" in body && "date" in body && "courseId" in body) {
        return true;
    }
    return false;
}
