import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function CurrencyRates() {
    // В реальном приложении эти данные должны приходить из API
    const rates = {
        USD: 90.9345,
        EUR: 100.7958
    }

    return (
        <Card className="w-[300px]">
            <CardHeader>
                <CardTitle>Курсы валют</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div className="flex flex-col">
                    <div className="text-2xl font-bold">1 USD</div>
                    <div className="text-3xl font-extrabold">{rates.USD.toFixed(4)} ₽</div>
                </div>
                <Separator />
                <div className="flex flex-col">
                    <div className="text-2xl font-bold">1 EUR</div>
                    <div className="text-3xl font-extrabold">{rates.EUR.toFixed(4)} ₽</div>
                </div>
            </CardContent>
        </Card>
    )
}