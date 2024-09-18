import { Nunito } from 'next/font/google';

import { MainHeader } from "@/components/shared";

const nunito = Nunito({
    subsets: ['cyrillic'],
    variable: '--font-nunito',
    weight: ['400', '500', '600', '700', '800', '900'],
});

export default function RootLayout({ children, }: Readonly <{ children: React.ReactNode; }>) {
    return (
        <body className={nunito.className}>
            <MainHeader />
            {children}
        </body>
    );
}