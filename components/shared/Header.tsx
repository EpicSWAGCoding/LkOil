import { FC } from "react";
import { cn } from "@/lib/utils";
import { Container, MenuBar } from "@/components/shared";
import Image from "next/image";
import { Avatar, AvatarFallback } from "@/components/ui";

interface Props {
    className?: string;
}

export const Header: FC<Props> = ({ className }) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <Image src="/logo.png" alt="Logo" width={150} height={150} />
                <MenuBar />
                <Avatar>
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </Container>
        </header>
    )
}