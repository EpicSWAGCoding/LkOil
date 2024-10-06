'use client'

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface Props {
    className?: string;
}

const menuItems = [
    { name: 'Главная', href: '/' },
    { name: 'Счета', href: '/billing' },
    { name: 'Карты', href: '/card' },
    { name: 'Пополнение', href: '/refill' },
    { name: 'Лимиты', href: '/limits' },
];

export const MenuBar: FC<Props> = ({ className }) => {
    const pathname = usePathname();
    const router = useRouter();
    
    const handleNavigation = (href: string) => {
        router.push(href);
    };
    
    return (
      <div className={cn('flex flex-wrap justify-center md:justify-start gap-1 bg-gray-50 p-2 rounded-2xl', className)}>
          {menuItems.map((item) => (
            <button
              className={cn(
                'flex items-center font-bold h-10 rounded-lg px-4 py-1',
                pathname === item.href && 'bg-white shadow-md shadow-gray-200 text-primary'
              )}
              onClick={() => handleNavigation(item.href)}
              key={item.name}
            >
                {item.name}
            </button>
          ))}
      </div>
    );
};
