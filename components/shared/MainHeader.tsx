'use client';

import { FC, useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Container } from "@/components/shared";
import Image from "next/image";
import { Avatar, AvatarFallback, Button } from "@/components/ui";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";
import { Mail, MapPin, PhoneCall } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {
    className?: string;
}

export const MainHeader: FC<Props> = ({ className }) => {
    const [username, setUsername] = useState<string | null>(null);
    const router = useRouter(); // Инициализация useRouter

    const formatPhoneNumber = (phoneNumber: string) => {
        return phoneNumber.replace(/(\d{1})(\d{3})(\d{3})(\d{2})(\d{2})/, '+$1 ($2) $3-$4-$5');
    };

    useEffect(() => {
        const fetchProfile = async () => {
            const response = await fetch('/api/profile');
            if (response.ok) {
                const data = await response.json();
                setUsername(data.profile.username);
            }
        };
        fetchProfile();
    }, []);

    const handleLogout = async () => {
        try {
            const response = await fetch('/api/logout', {
                method: 'POST',
            });
            if (response.ok) {
                router.push('/auth'); // Используйте router для навигации
                toast({
                    title: "Выход",
                    description: "Вы успешно вышли из системы",
                });
            } else {
                console.error('Failed to logout');
                toast({
                    title: "Ошибка",
                    description: "Не удалось выйти из системы",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error('Error during logout:', error);
            toast({
                title: "Ошибка",
                description: "Произошла ошибка при выходе из системы",
                variant: "destructive",
            });
        }
    };

    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <div className="flex flex-col items-center">
                    <Link href="/">
                        <Image src="/logo.png" alt="Logo" width={80} height={80} className="mb-2" />
                    </Link>
                    <div className="text-center">
                        <p className="text-sm font-semibold text-gray-700">ООО ТД</p>
                        <p className="text-xs font-medium text-gray-600">«РОВЕНЬКОВСКАЯ НЕФТЕБАЗА»</p>
                    </div>
                </div>
                <div className="flex space-x-12">
                    <div className="flex flex-col items-center">
                        <h3 className="font-bold text-lg mb-2 text-center">ОПТ</h3>
                        <div className="space-y-1">
                            <p className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>ЛНР, г. Ровеньки, ул. Выгонная, 2</span>
                            </p>
                            <p className="flex items-center">
                                <PhoneCall className="w-4 h-4 mr-2" />
                                <span>{formatPhoneNumber('78573350656')}</span>
                            </p>
                            <p className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>neftebaza2004@mail.ru</span>
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <h3 className="font-bold text-lg mb-2 text-center">РОЗНИЦА</h3>
                        <div className="space-y-1">
                            <p className="flex items-center">
                                <MapPin className="w-4 h-4 mr-2" />
                                <span>ЛНР, г. Луганск, ул. Павловская, 2-в</span>
                            </p>
                            <p className="flex items-center">
                                <PhoneCall className="w-4 h-4 mr-2" />
                                <span>{formatPhoneNumber('79591021282')}</span>
                            </p>
                            <p className="flex items-center">
                                <Mail className="w-4 h-4 mr-2" />
                                <span>clientrnb@yandex.ru</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex space-x-1.5">
                    <Link href='/profile'>
                        <Avatar>
                            <AvatarFallback>{username ? username.charAt(0) : 'N/A'}</AvatarFallback>
                        </Avatar>
                    </Link>
                    <Button variant="outline" onClick={handleLogout}>Выйти</Button>
                </div>
            </Container>
        </header>
    );
};
