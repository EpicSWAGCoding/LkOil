'use client'

import { useEffect, useState } from 'react';
import { Container, Loader } from '@/components/shared';
import {
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Checkbox,
    Input,
    Label,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui';
import { Car, CreditCard, Fuel, User } from 'lucide-react';

interface Limit {
    id: number;
    fuelType: string;
    limit: number;
    driverName: string;
    carNumber: string;
    isBlocked: boolean;
    card: {
        cardNumber: string;
    };
}

export const LimitSetting = () => {
    const [fuelType, setFuelType] = useState('');
    const [limit, setLimit] = useState('');
    const [driver, setDriver] = useState('');
    const [carNumber, setCarNumber] = useState('');
    const [selectedCards, setSelectedCards] = useState<number[]>([]);
    const [limits, setLimits] = useState([]);
    const [filteredLimits, setFilteredLimits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    // Функция для поиска
    const handleSearch = () => {
        console.log('Searching with:', { fuelType, limit, driver, carNumber });
        if (!fuelType && !limit && !driver && !carNumber) {
            console.log('No search criteria, showing all limits');
            setFilteredLimits(limits);
        } else {
            const filtered = limits.filter(limitItem => {
                return (
                  (!fuelType || limitItem.fuelType === fuelType) &&
                  (!limit || limitItem.limit.toString().includes(limit)) &&
                  (!driver || limitItem.driverName.toLowerCase().includes(driver.toLowerCase())) &&
                  (!carNumber || limitItem.carNumber.toLowerCase().includes(carNumber.toLowerCase()))
                );
            });
            setFilteredLimits(filtered);
        }
    };
    
    // Новая функция для очистки полей поиска
    const handleClear = () => {
        setFuelType('');
        setLimit('');
        setDriver('');
        setCarNumber('');
        setFilteredLimits(limits);
    };
    
    const handleCheckboxChange = (id: number) => {
        setSelectedCards(prev =>
          prev.includes(id) ? prev.filter(cardId => cardId !== id) : [...prev, id]
        );
    };
    
    // const handleSetLimits = async () => {
    //     const selectedCardIds = selectedCards;
    //
    //     try {
    //         const responses = await Promise.all(selectedCardIds.map(cardId => {
    //             return fetch('/api/limitsset', {
    //                 method: 'POST',
    //                 headers: {
    //                     'Content-Type': 'application/json',
    //                 },
    //                 body: JSON.stringify({
    //                     fuelType,
    //                     limit,
    //                     driverName: driver,
    //                     carNumber,
    //                     cardId
    //                 }),
    //             });
    //         }));
    //
    //         const results = await Promise.all(responses.map(res => res.json()));
    //         console.log('Limits set successfully:', results);
    //         // Обновляем список лимитов после установки
    //         fetchLimits();
    //     } catch (error) {
    //         console.error('Error setting limits:', error);
    //         setError('Не удалось установить лимиты');
    //     }
    // };
    
    const handleBlockCards = async () => {
        try {
            const response = await fetch('/api/limitsblock', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    cardIds: selectedCards,
                }),
            });
            
            if (!response.ok) {
                throw new Error('Failed to block cards');
            }
            
            const result = await response.json();
            console.log('Cards blocked successfully:', result);
            // Обновляем список лимитов после блокировки
            fetchLimits();
        } catch (error) {
            console.error('Error blocking cards:', error);
            setError('Не удалось заблокировать карты');
        }
    };
    
    // Функция для получения лимитов с сервера
    const fetchLimits = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/limits');
            
            if (!response.ok) {
                throw new Error('Ошибка при загрузке данных');
            }
            
            const data = await response.json();
            setLimits(data);
            setFilteredLimits(data);
        } catch (error) {
            console.error('Error fetching limits:', error);
            setError('Не удалось загрузить данные лимитов');
        } finally {
            setLoading(false);
        }
    };
    
    // Получаем лимиты с сервера при монтировании компонента
    useEffect(() => {
        fetchLimits();
    }, []);
    
    if (loading) {
        return <Loader />;
    }
    
    if (error) {
        return <div className="text-red-500">{error}</div>;
    }
    
    return (
      <Container>
          <div className="space-y-6 p-6">
              <h1 className="text-2xl font-bold">Установка лимитов</h1>
              
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
                              <div className="space-y-2">
                                  <Label htmlFor="carNumber" className="text-sm font-medium text-gray-700">Номер автомобиля</Label>
                                  <div className="relative">
                                      <Car className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                      <Input
                                        id="carNumber"
                                        value={carNumber}
                                        onChange={(e) => setCarNumber(e.target.value)}
                                        className="pl-10 w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                                        placeholder="Введите номер автомобиля"
                                      />
                                  </div>
                              </div>
                              <div className="col-span-2 flex justify-between">
                                  <Button onClick={handleSearch} className="mt-4">Найти</Button>
                                  <Button onClick={handleClear} variant="outline" className="mt-4">Очистить</Button>
                              </div>
                          </div>
                          
                          {/* Таблица с отфильтрованными лимитами */}
                          <Table className="mt-6">
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
                                  {filteredLimits.map(limit => (
                                    <TableRow key={limit.id}>
                                        <TableCell>
                                            <Checkbox
                                              checked={selectedCards.includes(limit.id)}
                                              onCheckedChange={() => handleCheckboxChange(limit.id)}
                                            />
                                        </TableCell>
                                        <TableCell>{limit.card.cardNumber}</TableCell>
                                        <TableCell>{limit.fuelType}</TableCell>
                                        <TableCell>{limit.limit}</TableCell>
                                        <TableCell>{limit.driverName}</TableCell>
                                        <TableCell>{limit.carNumber}</TableCell>
                                        <TableCell>{limit.isBlocked ? 'Заблокирована' : 'Активна'}</TableCell>
                                    </TableRow>
                                  ))}
                                  {filteredLimits.length === 0 && (
                                    <TableRow>
                                        <TableCell colSpan={7} className="text-center">Нет лимитов, соответствующих вашему запросу.</TableCell>
                                    </TableRow>
                                  )}
                              </TableBody>
                          </Table>
                      </CardContent>
                  </Card>
                  <div className="flex space-x-4">
                      {/*<Button onClick={handleSetLimits}>Установить лимиты</Button>*/}
                      <Button onClick={() => {}}>Установить лимиты</Button>
                      <Button onClick={handleBlockCards} variant="destructive">Заблокировать</Button>
                  </div>
              </div>
          </div>
      </Container>
    );
};