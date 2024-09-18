'use client';

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
import { useState } from "react";
import { format } from "date-fns";

export const SelectComponents = () => {
    const { selectedOptions, setContractor, setAccount, setCard } = useSelectStore();
    const [date, setDate] = useState<Date | undefined>(new Date());

    const handleSearch = () => {
        console.log("Контрагент:", selectedOptions.contractor);
        console.log("Счет:", selectedOptions.account);
        console.log("Карта:", selectedOptions.card);
        console.log("Дата:", date ? format(date, "yyyy-MM-dd") : "Не выбрана");
    };

    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 max-w-4xl mx-auto">
            <Select onValueChange={setContractor} value={selectedOptions.contractor || ""}>
                <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Выбор контрагента" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="option1">Опция 1</SelectItem>
                    <SelectItem value="option2">Опция 2</SelectItem>
                    <SelectItem value="option3">Опция 3</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={setAccount} value={selectedOptions.account || ""}>
                <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Выбор счета" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="account1">Счет 1</SelectItem>
                    <SelectItem value="account2">Счет 2</SelectItem>
                    <SelectItem value="account3">Счет 3</SelectItem>
                </SelectContent>
            </Select>

            <Select onValueChange={setCard} value={selectedOptions.card || ""}>
                <SelectTrigger className="w-full sm:w-64">
                    <SelectValue placeholder="Выбор карт" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="card1">Карта 1</SelectItem>
                    <SelectItem value="card2">Карта 2</SelectItem>
                    <SelectItem value="card3">Карта 3</SelectItem>
                </SelectContent>
            </Select>

            <div className="flex gap-2">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="outline" size="icon">
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

                <Button variant="default" size="icon" onClick={handleSearch}>
                    <Search className="h-4 w-4" />
                </Button>
            </div>
        </div>
    );
};
