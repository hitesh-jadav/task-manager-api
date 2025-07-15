import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const dummyUser = { id: 1, username: 'admin', password: 'admin123' };

export const login = (username: string, password: string) => {
  if (username === dummyUser.username && password === dummyUser.password) {
    const token = jwt.sign({ id: dummyUser.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
    return token;
  }
  throw new Error('Invalid credentials');
};
