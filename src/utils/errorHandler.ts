// import { Response } from 'express';

// export const handleError = (res: Response, error: any) => {
//   res.status(500).json({ message: error.message || 'Internal Server Error' });
// };


export const handleError = (error: any, res: any) => {
    res.status(500).json({ message: 'Server error', error });
  };
  