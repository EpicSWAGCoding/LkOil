import { Container, Header } from "@/components/shared";

export const dynamic = 'force-dynamic';

export default async function RefillPage() {
    return (
        <Container>
            <Header />
            <div>Это страница пополнений</div>
        </Container>
    )
}