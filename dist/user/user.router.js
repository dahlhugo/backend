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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const UserService = __importStar(require("./user.service"));
const bson_1 = require("bson");
const userRouter = (0, express_1.Router)();
//GET: A single author by id
userRouter.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }
    try {
        const user = yield UserService.getUser(id);
        if (user) {
            return res.status(200).json(user);
        }
        return res.status(404).json("User not found");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//POST: Create a new user
//Params: name, email
userRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!UserService.isUser(req.body)) {
            return res.status(400).json("Invalid body");
        }
        const user = yield UserService.createUser(req.body);
        return res.status(200).json(user);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//PUT: Update a user
//Params:
userRouter.put("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!bson_1.ObjectId.isValid(req.params.id)) {
        return res.status(400).json("Invalid id");
    }
    if (!UserService.isUser(req.body)) {
        return res.status(400).json("Invalid body");
    }
    try {
        const id = req.params.id;
        const user = req.body;
        const updatedUser = yield UserService.updateUser(user, id);
        return res.status(200).json(updatedUser);
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
//DELETE: Delete a user
//Params: id
userRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    if (!bson_1.ObjectId.isValid(id)) {
        return res.status(400).json("Invalid id");
    }
    try {
        yield UserService.deleteUser(id);
        return res.status(200).end("User deleted");
    }
    catch (error) {
        return res.status(500).json(error.message);
    }
}));
exports.default = userRouter;
//# sourceMappingURL=user.router.js.map