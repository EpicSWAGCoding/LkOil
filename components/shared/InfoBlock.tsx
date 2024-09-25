import React from 'react';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "../ui";
import { Title } from "@/components/shared";
import Image from 'next/image';

interface Props {
    title: string;
    text: string;
    className?: string;
    imageUrl?: string; // imageUrl может быть undefined
}

export const InfoBlock: React.FC<Props> = ({ className, title, text, imageUrl }) => {
    return (
        <div className={cn(className, 'flex items-center justify-between w-[840px] gap-12')}>
            <div className="flex flex-col">
                <div className="w-[445px]">
                    <Title size="lg" text={title} className="font-extrabold" />
                    <p className="text-gray-400 text-lg">{text}</p>
                </div>

                <div className="flex gap-5 mt-11">
                    <Link href="/auth">
                        <Button variant="outline" className="gap-2">
                            <ArrowLeft />
                            Войти
                        </Button>
                    </Link>
                </div>
            </div>

            {imageUrl ? ( // Проверяем, есть ли imageUrl
                <Image src={imageUrl} alt={title} width={300} height={200} /> // Добавьте height, чтобы избежать ошибок
            ) : (
                <div className="w-[300px] h-[200px] bg-gray-200 flex items-center justify-center"> {/* Заглушка для отсутствующего изображения */}
                    Нет изображения
                </div>
            )}
        </div>
    );
};
