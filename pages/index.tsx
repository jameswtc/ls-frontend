import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import { Box, Container, Grid, Title } from "@mantine/core";
import { PlaceCard } from "../src/components/PlaceCard";
import { useAllPlaces } from "../src/place-fetcher";

const Home: NextPage = () => {
    const { places } = useAllPlaces({
        revalidateOnFocus: false,
    });

    return (
        <div className={styles.container}>
            <Head>
                <title>LocalSearch Places</title>
                <meta
                    name="description"
                    content="LocalSearch technical tasks assignment"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <main>
                <Container mt="2rem">
                    <Title
                        order={1}
                        size="h1"
                        align="center"
                        sx={{ fontWeight: 300 }}
                    >
                        LocalSearch Places
                    </Title>

                    <Box mt="2rem">
                        <Grid gutter="xl">
                            {places?.map((place, index) => {
                                return (
                                    <Grid.Col key={place.id} xs={12} sm={6}>
                                        <PlaceCard place={place} />
                                    </Grid.Col>
                                );
                            })}
                        </Grid>
                    </Box>
                </Container>
            </main>
        </div>
    );
};

export default Home;
