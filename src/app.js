"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const PORT = 3000;
app.get('/', (req, res, next) => {
    res.send('Hello, Express with TypeScript!');
});
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});