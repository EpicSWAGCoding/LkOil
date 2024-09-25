import { Container, Header, MainPages } from '@/components/shared';

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
