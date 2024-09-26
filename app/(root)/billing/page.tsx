import { Billing, Container, Header } from "@/components/shared";

export const dynamic = 'force-dynamic';

export default async function BillingPage() {
    return (
        <Container>
            <Header />
            <Billing />
        </Container>
    )
}