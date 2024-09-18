import { FC } from "react";
import { cn } from "@/lib/utils";
import { Container, CurrentDate } from "@/components/shared";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui";
import Link from "next/link";

interface Props {
    className?: string;
}

export const MainHeader: FC<Props> = ({ className }) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <Image src="/logo.png" alt="Logo" width={80} height={80} />
                <div>
                    <span> ООО «ТД «РОВЕНЬКОВСКАЯ НЕФТЕБАЗА» </span>
                </div>
                <Link href='/profile'>
                    <Avatar>
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                </Link>
            </Container>
        </header>
    )
}