import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Title } from './title';
import Link from 'next/link';
import { cn } from "@/lib/utils";
import { Button } from "../ui";

interface Props {
    title: string;
    text: string;
    className?: string;
    imageUrl?: string;
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

            <img src={imageUrl} alt={title} width={300} />
        </div>
    );
};