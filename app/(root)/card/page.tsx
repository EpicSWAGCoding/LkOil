import { Container, Header } from "@/components/shared";

export const dynamic = 'force-dynamic';

export default async function CardPage() {
    return (
        <Container>
            <Header />
            <div>Это страница карт</div>
        </Container>
    )
}