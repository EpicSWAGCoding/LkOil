'use client'

import { useState } from 'react'
import { formatPhoneNumber } from '@/hooks'
import { Mail, MapPin, PhoneCall } from 'lucide-react'
import { Map } from '@pbe/react-yandex-maps'
import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui'

interface ContactInfoProps {
	title: string;
	address: string;
	phone: string;
	email: string;
}

export const ContactInfo = ({ title, address, phone, email }) => {
	
	const [isOpen, setIsOpen] = useState(false)
	
	return (
		<div className="flex flex-col items-center">
			<h3 className="font-bold text-lg mb-2 text-center">{title}</h3>
			<div className="space-y-1">
				<p className="flex items-center">
					<MapPin className="w-4 h-4 mr-2" />
					<span>{address}</span>
				</p>
				<p className="flex items-center">
					<PhoneCall className="w-4 h-4 mr-2" />
					<span>{formatPhoneNumber(phone)}</span>
				</p>
				<p className="flex items-center">
					<Mail className="w-4 h-4 mr-2" />
					<span>{email}</span>
				</p>
				<Dialog open={isOpen} onOpenChange={setIsOpen}>
					<DialogTrigger asChild>
						<Button variant="outline" className="mt-2">
							Показать на карте
						</Button>
					</DialogTrigger>
					<DialogContent className="sm:max-w-[700px] bg-white">
						<DialogHeader>
							<DialogTitle>Карта</DialogTitle>
						</DialogHeader>
						<div className="w-full h-[500px]">
							<Map defaultState={{ center: [48.093856, 39.361686], zoom: 18 }} width="100%" height="100%" />
						</div>
					</DialogContent>
				</Dialog>
			</div>
		</div>
	)
}