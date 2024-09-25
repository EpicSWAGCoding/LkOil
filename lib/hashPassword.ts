import { hash } from 'bcrypt';

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;

    try {
        const hashedPassword = await hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Ошибка при хешировании пароля:', error);
        throw error;
    }
}
