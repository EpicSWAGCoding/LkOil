'use client'

import { FC, useState } from "react";
import { CarNumberInput, Container, Loader, PinCodeInput } from "@/components/shared";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    SelectContent,
    SelectItem,
    SelectTrigger,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    Select,
    SelectValue,
    Button,
    Checkbox
} from "@/components/ui";
import { CreditCard, Truck, User, Fuel, Lock } from 'lucide-react'

interface Card {
    id: number;
    cardNumber: string;
    fuelType: string;
    limit: number;
    driver: string;
    carNumber: string;
    pinCode: string;
    isBlocked: boolean;
}

const mockCards: Card[] = [
    { id: 1, cardNumber: '1234 5678 9012 3456', fuelType: 'Бензин', limit: 100, driver: 'Иванов И.И.', carNumber: 'А123АА777', pinCode: '1234', isBlocked: false },
    { id: 2, cardNumber: '2345 6789 0123 4567', fuelType: 'Дизель', limit: 150, driver: 'Петров П.П.', carNumber: 'В456ВВ999', pinCode: '5678', isBlocked: true },
    { id: 3, cardNumber: '3456 7890 1234 5678', fuelType: 'Газ', limit: 80, driver: 'Сидоров С.С.', carNumber: 'С789СС111', pinCode: '9012', isBlocked: false },
];

export const LimitSetting: FC = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [fuelType, setFuelType] = useState('');
    const [limit, setLimit] = useState('');
    const [driver, setDriver] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [pinCode, setPinCode] = useState('');

    const [cards, setCards] = useState<Card[]>(mockCards);
    const [selectedCards, setSelectedCards] = useState<number[]>([]);

    const handleCheckboxChange = (id: number) => {
        setSelectedCards(prev =>
            prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
        );
    };

    const handleSetLimits = () => {
        if (selectedCards.length === 0) {
            setError('Выберите хотя бы одну карту');
            return;
        }

        const updatedCards = cards.map(card => {
            if (selectedCards.includes(card.id)) {
                return {
                    ...card,
                    fuelType: fuelType || card.fuelType,
                    limit: limit ? parseInt(limit) : card.limit,
                    driver: driver || card.driver,
                    carNumber: carNumber || card.carNumber,
                    pinCode: pinCode || card.pinCode
                };
            }
            return card;
        });

        setCards(updatedCards);
        setError(null);
        // Очистка полей ввода после установки лимитов
        setFuelType('');
        setLimit('');
        setDriver('');
        setCarNumber('');
        setPinCode('');
        setSelectedCards([]);
    };

    const handleBlockCards = () => {
        if (selectedCards.length === 0) {
            setError('Выберите хотя бы одну карту для блокировки');
            return;
        }

        const updatedCards = cards.map(card =>
            selectedCards.includes(card.id) ? { ...card, isBlocked: true } : card
        );

        setCards(updatedCards);
        setError(null);
        setSelectedCards([]);
    };

    return (
        <Container>
            <div className="space-y-6 p-6">
                <h1 className="text-2xl font-bold">Установка лимитов</h1>

                {loading ? (
                    <Loader />
                ) : error ? (
                    <div className="text-center text-red-500 p-4 bg-red-100 rounded-md">
                        <p>Ошибка: {error}</p>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Параметры лимитов</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fuelType" className="text-sm font-medium text-gray-700">Вид топлива</Label>
                                        <div className="relative">
                                            <Fuel className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Select onValueChange={setFuelType} value={fuelType}>
                                                <SelectTrigger id="fuelType" className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500">
                                                    <SelectValue placeholder="Выберите вид топлива" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="Бензин">Бензин</SelectItem>
                                                    <SelectItem value="Дизель">Дизель</SelectItem>
                                                    <SelectItem value="Газ">Газ</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="limit" className="text-sm font-medium text-gray-700">Лимит</Label>
                                        <div className="relative">
                                            <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="limit"
                                                type="number"
                                                value={limit}
                                                onChange={(e) => setLimit(e.target.value)}
                                                className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Введите лимит"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="driver" className="text-sm font-medium text-gray-700">Водитель</Label>
                                        <div className="relative">
                                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                            <Input
                                                id="driver"
                                                value={driver}
                                                onChange={(e) => setDriver(e.target.value)}
                                                className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                                placeholder="Имя водителя"
                                            />
                                        </div>
                                    </div>
                                    <CarNumberInput
                                        value={carNumber}
                                        onChange={setCarNumber}
                                    />
                                    <PinCodeInput
                                        value={pinCode}
                                        onChange={setPinCode}
                                    />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader>
                                <CardTitle>Список карт</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[50px]"></TableHead>
                                            <TableHead>Номер карты</TableHead>
                                            <TableHead>Вид топлива</TableHead>
                                            <TableHead>Лимит</TableHead>
                                            <TableHead>Водитель</TableHead>
                                            <TableHead>Номер машины</TableHead>
                                            <TableHead>Статус</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cards.map((card) => (
                                            <TableRow key={card.id}>
                                                <TableCell>
                                                    <Checkbox
                                                        checked={selectedCards.includes(card.id)}
                                                        onCheckedChange={() => handleCheckboxChange(card.id)}
                                                    />
                                                </TableCell>
                                                <TableCell>{card.cardNumber}</TableCell>
                                                <TableCell>{card.fuelType}</TableCell>
                                                <TableCell>{card.limit}</TableCell>
                                                <TableCell>{card.driver}</TableCell>
                                                <TableCell>{card.carNumber}</TableCell>
                                                <TableCell>{card.isBlocked ? 'Заблокирована' : 'Активна'}</TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>

                        <div className="flex space-x-4">
                            <Button onClick={handleSetLimits}>Установить лимиты</Button>
                            <Button onClick={handleBlockCards} variant="destructive">Заблокировать</Button>
                        </div>
                    </div>
                )}
            </div>
        </Container>
    )
}