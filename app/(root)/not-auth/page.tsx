import { InfoBlock } from "@/components/shared/InfoBlock";

export const dynamic = 'force-dynamic';

export default function UnauthorizedPage() {
    return (
        <div className="flex flex-col items-center justify-center mt-40">
            <InfoBlock
                title="Доступ запрещён"
                text="Данную страницу могут просматривать только авторизованные пользователи"
                imageUrl="lock.png"
            />
        </div>
    );
}