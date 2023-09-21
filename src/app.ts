import * as dotenv from 'dotenv'
dotenv.config()

import express from 'express';
import { PrismaClient } from '@prisma/client';
import cors from 'cors';

import userRouter from './user/user.router';
import postRouter from './post/post.router';
import projectRouter from './project/project.router';
import courseRouter from './course/course.router';
import newsRouter from './news/news.router';
import courseLiteratureRouter from './courseLiterature/courseLiterature.router';
import examRouter from './exam/exam.router';
import { auth } from 'express-oauth2-jwt-bearer';

async function main() {
    const app = express();
    const port = 3001;

    //cors
    const allowedOrigins = ['http://localhost:3000'];
    const options: cors.CorsOptions = {
        origin: allowedOrigins,
    };

    //auth0
    const checkJwt = auth();

    //auth router attaches /login /logout and /callback routes to the baseURL
    app.use(checkJwt);
    app.use(cors(options));
    app.use(express.json());


    //add all routes
    app.use('/api/user', userRouter);
    app.use('/api/post', postRouter);
    app.use('/api/project', projectRouter);
    app.use('/api/course', courseRouter);
    app.use('/api/news', newsRouter);
    app.use('/api/courseLiterature', courseLiteratureRouter);
    app.use('/api/exam', examRouter);

    app.listen(port, () => {
        return console.log(`Express is listening at http://localhost:${port}`);
    });
}

main();


