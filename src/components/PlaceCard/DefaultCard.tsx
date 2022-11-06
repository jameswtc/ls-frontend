import { Box, Card, Flex, Text, Title } from "@mantine/core";
import { PlaceInfo } from "../../types/Places";
import OpeningHours from "./OpeningHours";

type Props = {
    place: PlaceInfo;
};

const DefaultCard = ({ place }: Props) => {
    return (
        <Card shadow="sm" radius="sm" sx={{ height: "100%" }}>
            <Card.Section>
                <Box bg="violet" p="1rem">
                    <Box pb=".5rem">
                        <Title order={2} color="white">
                            {place.displayed_what}
                        </Title>
                    </Box>
                    <Box>
                        <Text fz="sm" color="white">
                            {place.displayed_where}
                        </Text>
                    </Box>
                </Box>
            </Card.Section>
            <Flex direction="column">
                <Box sx={{ flexGrow: 1 }}>
                    <Title order={3} size="sm" mt="lg" mb="sm" c="dimmed">
                        Opening Hours
                    </Title>

                    <OpeningHours openingHours={place.opening_hours} />
                </Box>
                <Box>
                    <Box mt="2rem">
                        {(place.opening_hours.closed_on_holidays ||
                            place.opening_hours.open_by_arrangement) && (
                            <Text size="xs" mb=".6rem">
                                Note:
                            </Text>
                        )}

                        {place.opening_hours.closed_on_holidays && (
                            <Text size="xs">Closed on public holidays</Text>
                        )}

                        {place.opening_hours.open_by_arrangement && (
                            <Text size="xs">
                                Also opened by special arrangement
                            </Text>
                        )}
                    </Box>
                </Box>
            </Flex>
        </Card>
    );
};

export default DefaultCard;
