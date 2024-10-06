import { Button, Select, SelectTrigger, SelectValue } from '@/components/ui'
import { CalendarIcon, Search } from 'lucide-react'

export function SelectComponentsSkeleton() {
    return (
        <div className="flex flex-col sm:flex-row items-center gap-4 p-4 max-w-4xl mx-auto animate-pulse">
            {/* Contractor Select */}
            <Select disabled>
                <SelectTrigger className="w-[150px] h-9">
                    <SelectValue placeholder="Выбор контрагента" />
                </SelectTrigger>
            </Select>

            {/* Account Select */}
            <Select disabled>
                <SelectTrigger className="w-[150px] h-9">
                    <SelectValue placeholder="Выбор счета" />
                </SelectTrigger>
            </Select>

            {/* Card Select */}
            <Select disabled>
                <SelectTrigger className="w-[150px] h-9">
                    <SelectValue placeholder="Выбор карт" />
                </SelectTrigger>
            </Select>

            <div className="flex gap-2">
                {/* Calendar Button */}
                <Button variant="outline" size="icon" className="h-9 w-9" disabled>
                    <CalendarIcon className="h-4 w-4" />
                </Button>

                {/* Search Button */}
                <Button variant="default" size="icon" className="h-9 w-9" disabled>
                    <Search className="h-4 w-4" />
                </Button>
            </div>

            {/* Clear Button */}
            <Button variant="outline" className="ml-4" disabled>
                Очистить
            </Button>
        </div>
    )
}