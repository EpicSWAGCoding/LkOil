'use client'

import { useLogout, useProfileData } from '@/hooks';
import { Avatar, AvatarFallback, Button } from '@/components/ui';
import Image from 'next/image';
import Link from 'next/link';
import { ContactInfo } from '@/components/shared';
import { companyInfo } from '@/constants';

export const MobileHeader = () => {
	const { username } = useProfileData();
	const { handleLogout } = useLogout();
	
	return (
		<header className='border-b md:hidden'>
			<div className="flex flex-col items-center py-4">
				<Link href="/">
					<Image src="/logo.png" alt="Logo" width={80} height={80} className="mb-2" />
				</Link>
				<div className="text-center mb-4">
					<p className="text-sm font-semibold text-gray-700">ООО ТД</p>
					<p className="text-xs font-medium text-gray-600">«РОВЕНЬКОВСКАЯ НЕФТЕБАЗА»</p>
				</div>
				<div className="flex flex-col items-center space-y-4 mb-4">
					<ContactInfo {...companyInfo.wholesale} />
					<ContactInfo {...companyInfo.retail} />
				</div>
				<div className="flex flex-col items-center space-y-2">
					<Link href='/profile'>
						<Avatar>
							<AvatarFallback>{username ? username.charAt(0) : 'N/A'}</AvatarFallback>
						</Avatar>
					</Link>
					<Button variant="outline" onClick={handleLogout} className="w-full text-center">Выйти</Button>
				</div>
			</div>
		</header>
	);
};
