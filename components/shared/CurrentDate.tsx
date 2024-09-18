'use client'

import { useState, useEffect } from "react"
import { format } from "date-fns"
import { ru } from "date-fns/locale"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"

export const CurrentDate = () => {
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentDate(new Date())
        }, 1000)

        return () => {
            clearInterval(timer)
        }
    }, [])

    return (
        <div
            className={cn(
                "flex items-center rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background",
                "w-[280px] text-left font-normal text-foreground"
            )}
        >
            <CalendarIcon className="mr-2 h-4 w-4 opacity-50" />
            {format(currentDate, "PPP", { locale: ru })}
        </div>
    )
}