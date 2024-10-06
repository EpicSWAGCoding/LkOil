'use client'

import React from 'react'
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	Input,
	Label
} from '@/components/ui'
import { formatCurrency } from '@/hooks'
import {
	Building,
	Calendar,
	CreditCard,
	Currency,
	FileText,
	Lock,
	PiggyBank,
	RussianRuble,
	Unlock
} from 'lucide-react'

interface Account {
	id: number
	accountNumber: string
	balance: number
	currencyType: string
	accountType: string
	isBlocked: boolean
	validTo: string
	segment?: string
	contract?: string
}

interface AccountDetailsProps {
	selectedAccount: Account
	isAdmin: boolean
}

export const AccountDetails = ({ selectedAccount, isAdmin }: AccountDetailsProps) => {
	const renderField = (label: string, value: string, icon: React.ReactNode, isBalance = false) => (
		<div className="mb-4">
			<Label htmlFor={label.toLowerCase()} className="text-sm font-medium text-gray-600">
				{label}
			</Label>
			<div className="relative mt-1">
				<div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
					{icon}
				</div>
				<Input
					id={label.toLowerCase()}
					value={value}
					readOnly={!isAdmin || !isBalance}
					className={`pl-10 w-full ${isBalance ? 'font-bold text-lg' : ''}`}
				/>
			</div>
		</div>
	)
	
	return (
		<Card className="w-full max-w-4xl mx-auto shadow-lg">
			<CardHeader>
				<CardTitle>Общая информация </CardTitle>
			</CardHeader>
			<CardContent className="p-6">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{renderField('Номер счета', selectedAccount.accountNumber, <CreditCard size={18} />)}
					{renderField('Сегмент', selectedAccount.segment || '', <Building size={18} />)}
					{renderField('Договор', selectedAccount.contract || '', <FileText size={18} />)}
					{renderField('Тип валюты', selectedAccount.currencyType, <RussianRuble size={18} />)}
					{renderField('Тип счета', selectedAccount.accountType, <Currency size={18} />)}
					{renderField(
						'Действует до',
						new Date(selectedAccount.validTo).toLocaleDateString('ru-RU', {
							year: 'numeric',
							month: 'long',
							day: 'numeric',
						}),
						<Calendar size={18} />
					)}
					{renderField(
						'Статус',
						selectedAccount.isBlocked ? 'Заблокирован' : 'Активен',
						selectedAccount.isBlocked ? (
							<Lock className="text-red-500" size={18} />
						) : (
							<Unlock className="text-green-500" size={18} />
						)
					)}
					{renderField(
						'Остаток',
						formatCurrency(selectedAccount.balance, selectedAccount.currencyType),
						<PiggyBank size={18} />,
						true
					)}
				</div>
			</CardContent>
		</Card>
	)
}