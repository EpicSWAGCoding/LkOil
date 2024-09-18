'use client'

import { FC } from "react";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Props {
    className?: string;
}

const menuItems = [
    { name: 'Главная', href: '/' },
    { name: 'Счета', href: '/billing' },
    { name: 'Карты', href: '/card' },
    { name: 'Пополнение', href: '/refill' },
];

export const MenuBar: FC<Props> = ({ className }) => {

    const pathname = usePathname();

    return (
        <div className={cn('inline-flex gap-1 bg-gray-50 p-1 rounded-2xl', className)}>
            {menuItems.map((item) => (
                <Link
                    className={cn(
                        'flex items-center font-bold h-11 rounded-2xl px-5',
                        pathname === item.href && 'bg-white shadow-md shadow-gray-200 text-primary'
                    )}
                    href={item.href}
                    key={item.name}
                >
                    <button>{item.name}</button>
                </Link>
            ))}
        </div>
    );
};
