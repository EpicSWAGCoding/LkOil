import { Loader2 } from "lucide-react"

export const LoaderProfile = () => {
    return (
        <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <Loader2 className="w-12 h-12 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground animate-pulse">Загрузка профиля...</p>
        </div>
    )
}