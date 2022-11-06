import { Box, Flex, Stack, Text } from "@mantine/core";
import { HourWindow, OpeningHour, WeekDayEnum } from "../../types/Places";
import { capitalise } from "../../utils/helpers";

type Props = {
    openingHours: OpeningHour;
};

type TimeSlot = {
    from: string;
    to: string;
};

interface GroupedDayHours {
    dayFrom: WeekDayEnum;
    dayTo: WeekDayEnum;

    // Empty array denotes "closed" for the given day range
    hours: TimeSlot[];
}

const WeekDayOrdered = [
    WeekDayEnum.SUN,
    WeekDayEnum.MON,
    WeekDayEnum.TUE,
    WeekDayEnum.WED,
    WeekDayEnum.THU,
    WeekDayEnum.FRI,
    WeekDayEnum.SAT,
];

const OpeningHourLine = ({ grouped }: { grouped: GroupedDayHours }) => {
    const formatDayRange = (grouped: GroupedDayHours): string => {
        if (grouped.dayFrom === grouped.dayTo) {
            return `${capitalise(grouped.dayFrom)}`;
        }

        return `${capitalise(grouped.dayFrom)} - ${capitalise(grouped.dayTo)}`;
    };

    return (
        <Box pt=".5rem">
            {!!grouped.hours.length &&
                grouped.hours.map((hourSlot, index) => (
                    <Flex key={index} direction="row" justify="space-between">
                        <Box>
                            {index > 0 && <Text></Text>}
                            {index === 0 && (
                                <Text>{formatDayRange(grouped)}</Text>
                            )}
                        </Box>
                        <Box>
                            {hourSlot.from} - {hourSlot.to}
                        </Box>
                    </Flex>
                ))}
            {!grouped.hours.length && (
                <Flex direction="row" justify="space-between">
                    <Box>{formatDayRange(grouped)}</Box>
                    <Box>closed</Box>
                </Flex>
            )}
        </Box>
    );
};

const OpeningHours = ({ openingHours }: Props) => {
    // Compares if the 2 given HourWindow has the same opening hour window
    const hasSameOpeningHours = (a: HourWindow[], b: HourWindow[]): boolean => {
        // Take care of zero length array because performing .every() on empty
        // array always returns true
        if (a.length === 0 && b.length === 0) {
            return true;
        }

        if ((!!a.length && !b.length) || (!a.length && !!b.length)) {
            return false;
        }

        return a.every((hwA) =>
            b.some(
                (hwB) =>
                    hwB.start === hwA.start &&
                    hwB.end === hwA.end &&
                    hwB.type == hwA.type
            )
        );
    };

    // Groups the opening hours for presentation
    const groupOpeningSlots = (openingHours: OpeningHour) => {
        let rememberLast: HourWindow[];

        return WeekDayOrdered.reduce<GroupedDayHours[]>(
            (grouped, currentDay) => {
                // Empty array denotes no opening hours - closed
                const currentHours =
                    openingHours.days[currentDay as WeekDayEnum] || [];

                console.log("checking for " + currentDay, currentHours);

                if (
                    rememberLast &&
                    hasSameOpeningHours(
                        rememberLast,
                        openingHours.days[currentDay as WeekDayEnum] || []
                    )
                ) {
                    // Same opening hours as previous day, updating the dayTo of the last item
                    // in the grouped GroupedDayHours[]
                    grouped[grouped.length - 1].dayTo =
                        currentDay as WeekDayEnum;

                    return [...grouped];
                }

                rememberLast = currentHours;

                return [
                    ...grouped,
                    {
                        dayFrom: currentDay as WeekDayEnum,
                        dayTo: currentDay as WeekDayEnum,
                        hours: currentHours.reduce<TimeSlot[]>(
                            (prev, current) => {
                                return [
                                    ...prev,
                                    { from: current.start, to: current.end },
                                ];
                            },
                            []
                        ),
                    },
                ];
            },
            []
        );
    };

    const groupOpeningHours = groupOpeningSlots(openingHours);

    return (
        <Box>
            <Stack spacing={0}>
                {groupOpeningHours.map((days) => (
                    <OpeningHourLine key={days.dayFrom} grouped={days} />
                ))}
            </Stack>
        </Box>
    );
};

export default OpeningHours;
