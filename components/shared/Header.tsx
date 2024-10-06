'use client'

import { FC } from 'react';
import { cn } from '@/lib/utils';
import { Container, MenuBar, SelectComponents } from '@/components/shared';
import { usePathname } from 'next/navigation';

interface Props {
  className?: string;
}

export const Header: FC<Props> = ({ className }) => {
  const pathname = usePathname();
  
  return (
    <header className={cn('border-b', className)}>
      <Container
        className={cn(
          "flex flex-col items-center py-8 md:flex-row md:items-center md:py-8",
          pathname === '/' ? 'justify-center' : 'justify-between'
        )}
      >
        <MenuBar />
        {pathname !== '/' && <SelectComponents />}
      </Container>
    </header>
  );
};
