import { Loader2 } from "lucide-react"

export const Loader = () => {
    return (
        <div className="flex items-center justify-center h-64">
            <div className="relative">
                <Loader2 className="w-12 h-12 text-primary animate-spin" />
                <div className="absolute inset-0 w-12 h-12 border-4 border-t-4 border-primary rounded-full animate-pulse"></div>
            </div>
        </div>
    )
}