'use client'

import { useRouter } from "next/navigation";

export default function ProfilePage() {
    const router = useRouter();

    const handleLogout = async (e) => {
        e.preventDefault();

        const res = await fetch('/api/logout', {
            method: 'POST',
        });

        if (res.ok) {
            router.push('/auth'); // Перенаправление после выхода
        }
    };

    return (
        <section>
            <form onSubmit={handleLogout}>
                <button type="submit">Logout</button>
            </form>
        </section>
    );
}
