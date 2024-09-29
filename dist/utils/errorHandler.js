"use strict";
// import { Response } from 'express';
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = void 0;
// export const handleError = (res: Response, error: any) => {
//   res.status(500).json({ message: error.message || 'Internal Server Error' });
// };
const handleError = (error, res) => {
    res.status(500).json({ message: 'Server error', error });
};
exports.handleError = handleError;
