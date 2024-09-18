import { FC } from "react";
import { cn } from "@/lib/utils";
import {Container, CurrentDate, MenuBar, SelectComponents} from "@/components/shared";

interface Props {
    className?: string;
}

export const Header: FC<Props> = ({ className }) => {
    return (
        <header className={cn('border-b', className)}>
            <Container className="flex items-center justify-between py-8">
                <MenuBar />
                <SelectComponents />
            </Container>
        </header>
    )
}