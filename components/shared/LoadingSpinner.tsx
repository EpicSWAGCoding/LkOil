import { Loader2 } from "lucide-react"

export const LoadingSpinner = () => {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-background">
            <Loader2 className="w-12 h-12 animate-spin text-primary" />
            <p className="mt-4 text-lg font-medium text-primary">Загрузка профиля...</p>
        </div>
    )
}