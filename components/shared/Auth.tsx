import FC from "react";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { CardWithForm } from "@/components/shared/CardWithForm";

interface Props {
    className?: string;
}

export const Auth: FC<Props> = ({ className }) => {
    return (
        <div className={cn('flex justify-center items-center h-screen px-4', className)}>
            <header className="flex items-center w-full max-w-4xl">
                <div className="flex items-center justify-center w-1/2">
                    <Image src="/logo.png" alt="Logo" width={300} height={200} />
                </div>
                <div className="w-1/2">
                    <CardWithForm />
                </div>
            </header>
        </div>
    );
};
