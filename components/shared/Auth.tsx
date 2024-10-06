import React from 'react';
import Image from 'next/image';
import { CardWithForm } from '@/components/shared/CardWithForm';

export const Auth = () => {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center h-screen px-4'>
      <header className="flex flex-col items-center w-full max-w-4xl md:flex-row">
        <div className="flex items-center justify-center w-full md:w-1/2 mb-8 md:mb-0">
          <Image src="/mainlogo.png" alt="Logo" width={300} height={300} priority />
        </div>
        <div className="w-full md:w-1/2">
          <CardWithForm />
        </div>
      </header>
    </div>
  );
};