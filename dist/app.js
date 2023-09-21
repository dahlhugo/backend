"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const user_router_1 = __importDefault(require("./user/user.router"));
const post_router_1 = __importDefault(require("./post/post.router"));
const project_router_1 = __importDefault(require("./project/project.router"));
const course_router_1 = __importDefault(require("./course/course.router"));
const news_router_1 = __importDefault(require("./news/news.router"));
const courseLiterature_router_1 = __importDefault(require("./courseLiterature/courseLiterature.router"));
const exam_router_1 = __importDefault(require("./exam/exam.router"));
const express_oauth2_jwt_bearer_1 = require("express-oauth2-jwt-bearer");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const port = 3001;
        //cors
        const allowedOrigins = ['http://localhost:3000'];
        const options = {
            origin: allowedOrigins,
        };
        //auth0
        const checkJwt = (0, express_oauth2_jwt_bearer_1.auth)();
        //auth router attaches /login /logout and /callback routes to the baseURL
        app.use(checkJwt);
        app.use((0, cors_1.default)(options));
        app.use(express_1.default.json());
        //add all routes
        app.use('/api/user', user_router_1.default);
        app.use('/api/post', post_router_1.default);
        app.use('/api/project', project_router_1.default);
        app.use('/api/course', course_router_1.default);
        app.use('/api/news', news_router_1.default);
        app.use('/api/courseLiterature', courseLiterature_router_1.default);
        app.use('/api/exam', exam_router_1.default);
        app.listen(port, () => {
            return console.log(`Express is listening at http://localhost:${port}`);
        });
    });
}
main();
//# sourceMappingURL=app.js.map