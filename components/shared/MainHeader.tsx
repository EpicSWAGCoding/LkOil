'use client'

import { useState } from 'react';
import { ContactInfo, Container, MobileHeader } from '@/components/shared';
import { Avatar, AvatarFallback, Button } from '@/components/ui';
import { useLogout, useProfileData } from '@/hooks';
import { companyInfo } from '@/constants';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export const MainHeader = () => {
    const { username } = useProfileData();
    const { handleLogout } = useLogout();
    const [isRightBarOpen, setIsRightBarOpen] = useState(false);
    
    const toggleRightBar = () => {
        setIsRightBarOpen(!isRightBarOpen);
    };
    
    return (
      <>
          <header className='border-b hidden md:block'>
              <Container className="flex items-center justify-between py-8">
                  <div className="flex flex-col items-center">
                      <Link href="/">
                          <Image src="/logo.png" alt="Logo" width={200} height={200} className="mb-2" />
                      </Link>
                      <div className="text-center">
                          <p className="text-sm font-semibold text-gray-700">ООО ТД</p>
                          <p className="text-xs font-medium text-gray-600">«РОВЕНЬКОВСКАЯ НЕФТЕБАЗА»</p>
                      </div>
                  </div>
                  <div className="flex space-x-12">
                      <ContactInfo {...companyInfo.wholesale} />
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
          
          <button
            className="absolute top-4 right-4 p-2 md:hidden"
            onClick={toggleRightBar}
          >
              <Menu className="w-6 h-6 text-gray-700" />
          </button>
          
          <div className={`fixed top-0 right-0 w-full h-full bg-white shadow-lg z-50 p-4 transition-transform transform ${isRightBarOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <button
                className="text-gray-600 hover:text-gray-900 mb-4"
                onClick={toggleRightBar}
              >
                  <X className="w-6 h-6" />
              </button>
              <div className="space-y-4">
                  <MobileHeader />
              </div>
          </div>
      </>
    );
};
