import { Container, Header, MainPages } from '@/components/shared';

export const dynamic = 'force-dynamic';

export default async function Home() {

    return (
        <div>
            <Container>
                <Header />
                <MainPages />
            </Container>
        </div>
    );
}
