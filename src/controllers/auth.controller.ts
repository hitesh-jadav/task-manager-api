import { Request, Response } from 'express';
import * as AuthService from '../services/auth.service';

export const login = (req: Request, res: Response) => {
  const { username, password } = req.body;
  try {
    const token = AuthService.login(username, password);
    res.json({ token });
  } catch {
    res.status(401).json({ error: 'Invalid credentials' });
  }
};
