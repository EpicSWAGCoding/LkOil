// lib/jwt.ts
import { verify } from 'jsonwebtoken';
import { decrypt } from './encryption';

const JWT_SECRET = process.env.JWT_SECRET;

// Функция для проверки JWT токена
export async function verifyJwtToken(token: string) {
    try {
        const decoded = verify(token, JWT_SECRET);
        if (typeof decoded === 'string') {
            throw new Error('Invalid token');
        }
        const decryptedPayload = decrypt(decoded.data);
        return JSON.parse(decryptedPayload);
    } catch (error) {
        console.error('Error verifying token:', error);
        return null;
    }
}