"use strict";
// import express from 'express';
// import cors from 'cors';
// import movieRoutes from './routes/movieRoutes';
// import reviewRoutes from './routes/reviewRoutes';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// app.use(cors());
// app.use(express.json());
// app.use('/api', movieRoutes);
// app.use('/api', reviewRoutes);
// export default app;
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const moviewRoutes_1 = __importDefault(require("./routes/moviewRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
// Routes
app.use('/api', moviewRoutes_1.default);
app.use('/api', reviewRoutes_1.default);
// Error Handling
app.use((err, req, res, next) => {
    res.status(500).json({ message: 'Something went wrong', error: err.message });
});
exports.default = app;
