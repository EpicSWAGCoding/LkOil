'use client';

import { useEffect, useState } from 'react';
import {
    Popover,
    PopoverTrigger,
    Button,
    Calendar,
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
    PopoverContent
} from "@/components/ui";
import { CalendarIcon, Search } from "lucide-react";
import { useSelectStore } from "@/store/category";
import { format } from "date-fns";
import {SelectComponentsSkeleton} from "@/components/shared/SelectComponentsSkeleton";

interface SelectData {
    contractors: { id: number; name: string }[];
    accounts: { id: number; accountNumber: string; contractorId: number }[];
    cards: { id: number; cardNumber: string; accountNumber: string; contractorId: number }[];
}

export const SelectComponents = () => {
    const { selectedOptions, setContractor, setAccount, setCard, clearSelections } = useSelectStore();
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [selectData, setSelectData] = useState<SelectData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        setIsLoading(true);
        fetch('/api/select-data')
            .then(response => response.json())
            .then(data => {
                setSelectData(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Error fetching select data:', error);
                setIsLoading(false);
            });
    }, []);

    const handleSearch = () => {
        console.log("Контрагент:", selectedOptions.contractor);
        console.log("Счет:", selectedOptions.account);
        console.log("Карта:", selectedOptions.card);
        console.log("Дата:", date ? format(date, "yyyy-MM-dd") : "Не выбрана");
    };

    const handleClear = () => {
        clearSelections();
        setDate(undefined);
    };

    if (isLoading) {
        return <SelectComponentsSkeleton />;
    }

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 max-w-4xl mx-auto">
            <Select onValueChange={setContractor} value={selectedOptions.contractor || ""}>
                <SelectTrigger className="w-[165px] h-9">
                    <SelectValue placeholder="Выбор контрагента" />
                </SelectTrigger>
                <SelectContent>
                    {selectData?.contractors.map(contractor => (
                        <SelectItem key={contractor.id} value={contractor.id.toString()}>
                            {contractor.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={setAccount}
                value={selectedOptions.account || ""}
                disabled={!selectedOptions.contractor}
            >
                <SelectTrigger className="w-[165px] h-9">
                    <SelectValue placeholder="Выбор счета" />
                </SelectTrigger>
                <SelectContent>
                    {selectData?.accounts
                        .filter(account => account.contractorId.toString() === selectedOptions.contractor)
                        .map(account => (
                            <SelectItem key={account.id} value={account.id.toString()}>
                                {account.accountNumber}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>

            <Select
                onValueChange={setCard}
                value={selectedOptions.card || ""}
                disabled={!selectedOptions.contractor || !selectedOptions.account}
            >
                <SelectTrigger className="w-[165px] h-9">
                    <SelectValue placeholder="Выбор карт" />
                </SelectTrigger>
                <SelectContent>
                    {selectData?.cards
                        .filter(card =>
                            card.contractorId.toString() === selectedOptions.contractor &&
                            card.accountNumber === selectData.accounts.find(a => a.id.toString() === selectedOptions.account)?.accountNumber
                        )
                        .map(card => (
                            <SelectItem key={card.id} value={card.id.toString()}>
                                {card.cardNumber}
                            </SelectItem>
                        ))}
                </SelectContent>
            </Select>

            <div className="flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon" className="h-9 w-9">
                            <CalendarIcon className="h-4 w-4" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={date}
                            onSelect={setDate}
                            initialFocus
                        />
                    </PopoverContent>
                </Popover>

                <Button variant="default" size="icon" onClick={handleSearch} className="h-9 w-9">
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            <Button variant="outline" onClick={handleClear} className="ml-4">
                Очистить
            </Button>
        </div>
    );
};