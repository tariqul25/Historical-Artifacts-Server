import { Request, Response, NextFunction } from 'express';
import admin from '../config/firebase';

export const verifyJWT = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ message: 'Unauthorized!' });

  const token = authHeader.split(' ')[1];
  try {
    const decoded = await admin.auth().verifyIdToken(token);
    req.body.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized!' });
  }
};
