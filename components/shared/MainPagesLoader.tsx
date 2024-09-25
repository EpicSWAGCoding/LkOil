import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui"
import { Wallet, CreditCard, BarChart } from 'lucide-react'

export const MainPagesLoader = () => {
    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Личный кабинет процессинга топливных карт</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                {[Wallet, CreditCard, BarChart].map((Icon, index) => (
                    <Card key={index} className="animate-pulse">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                <div className="h-4 bg-gray-200 rounded w-24"></div>
                            </CardTitle>
                            <Icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="h-8 bg-gray-200 rounded w-16"></div>
                        </CardContent>
                    </Card>
                ))}
            </div>
            <Card className="animate-pulse">
                <CardHeader>
                    <CardTitle>Последние транзакции</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Дата</TableHead>
                                <TableHead>Номер карты</TableHead>
                                <TableHead>АЗС</TableHead>
                                <TableHead>Сумма</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {[...Array(5)].map((_, index) => (
                                <TableRow key={index}>
                                    {[...Array(4)].map((_, cellIndex) => (
                                        <TableCell key={cellIndex}>
                                            <div className="h-4 bg-gray-200 rounded w-full"></div>
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    )
}