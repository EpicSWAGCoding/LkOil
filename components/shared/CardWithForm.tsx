import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Title } from "@/components/shared/Title";

export function CardWithForm() {
    return (
        <>
            <Title text="Вход в личный кабинет" size="lg" />
            <form>
                <div className="grid w-full items-center gap-4">
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="card-number">Номер топливной карты</Label>
                        <Input id="card-number" placeholder="4120 4560 7894 0000" />
                    </div>
                    <div className="flex flex-col space-y-1.5">
                        <Label htmlFor="password">Пароль</Label>
                        <Input id="password" type="password" placeholder="**********" />
                    </div>
                </div>
            </form>
            <Button className="mt-4 w-full">Войти</Button> {/* Кнопка занимает всю ширину */}
        </>
    );
}
