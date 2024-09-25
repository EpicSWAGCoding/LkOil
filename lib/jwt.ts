import { verify } from 'jsonwebtoken';
import { decrypt } from './encryption';

const JWT_SECRET = process.env.JWT_SECRET || '3d7c4e0f1a2b5d8e9f6c3b7a0d2e5f8c1b4a7d0e3f6c9b2a5d8e1f4a7c0b3d6'

// Функция для проверки JWT токена
export async function verifyJwtToken(token: string) {
    if (!JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment variables.");
    }

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
