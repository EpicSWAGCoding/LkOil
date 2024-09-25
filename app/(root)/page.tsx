import { Container, Header, MainPages } from '@/components/shared';

export default async function Home({ req }: { req: any }) {

    return (
        <div>
            <Container>
                <Header />
                <MainPages />
            </Container>
        </div>
    );
}
