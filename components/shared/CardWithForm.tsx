'use client'

import InputMask from "react-input-mask";
import { Button, Input, Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui";
import { FC, useState } from "react";
import { useRouter } from 'next/navigation';

interface Props {
    className?: string;
}

export const CardWithForm: FC<Props> = () => {
    const [cardNumber, setCardNumber] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [phoneNumber, setPhoneNumber] = useState('');
    const [isSmsSent, setIsSmsSent] = useState(false);
    const [smsCode, setSmsCode] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Убираем пробелы из номера карты
        const cleanCardNumber = cardNumber.replace(/\s/g, '');

        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ login: cleanCardNumber, password }),
            });

            const data = await response.json();
            if (data.success) {
                router.push('/');
            } else {
                setError(data.message || 'Ошибка авторизации');
            }

        } catch (error: any) {
            console.error('Ошибка при авторизации:', error);
            setError('Ошибка подключения к серверу: ' + error.message);
        } finally {
            setLoading(false);
        }
    };

    const handlePhoneSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isSmsSent) {
            console.log('Sending SMS to:', phoneNumber);
            setIsSmsSent(true);
        } else {
            console.log('Phone Login Submitted:', { phoneNumber, smsCode });
        }
    };

    return (
        <Tabs defaultValue="card" className="w-full max-w-md">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="card">Топливная карта</TabsTrigger>
                <TabsTrigger value="phone">Телефон</TabsTrigger>
            </TabsList>

            <TabsContent value="card">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
                            Номер топливной карты
                        </label>
                        <InputMask
                            mask="9999 9999 9999 9999"
                            maskChar=""
                            value={cardNumber}
                            onChange={(e) => setCardNumber(e.target.value)}
                        >
                            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                                <Input {...inputProps} id="cardNumber" className="mt-1" placeholder="0000 0000 0000 0000" />
                            )}
                        </InputMask>
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Пароль
                        </label>
                        <Input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="mt-1"
                            placeholder="*********"
                        />
                    </div>

                    {error && <div className="text-red-500">{error}</div>}

                    <Button type="submit" className="w-full" disabled={loading}>
                        {loading ? 'Загрузка...' : 'Войти'}
                    </Button>
                </form>
            </TabsContent>

            <TabsContent value="phone">
                <form onSubmit={handlePhoneSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700">
                            Номер телефона
                        </label>
                        <InputMask
                            mask="+7 (999) 999-99-99"
                            maskChar=""
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                        >
                            {(inputProps: React.InputHTMLAttributes<HTMLInputElement>) => (
                                <Input {...inputProps} id="phoneNumber" className="mt-1" placeholder="+7 (000) 000-00-00" />
                            )}
                        </InputMask>
                    </div>

                    {isSmsSent && (
                        <div>
                            <label htmlFor="smsCode" className="block text-sm font-medium text-gray-700">
                                Код из SMS
                            </label>
                            <Input
                                id="smsCode"
                                type="text"
                                value={smsCode}
                                onChange={(e) => setSmsCode(e.target.value)}
                                className="mt-1"
                                placeholder="0000"
                            />
                        </div>
                    )}

                    <Button type="submit" className="w-full">
                        {isSmsSent ? 'Войти' : 'Получить код'}
                    </Button>
                </form>
            </TabsContent>
        </Tabs>
    );
};