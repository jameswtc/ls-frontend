export enum WeekDayEnum {
    MON = "monday",
    TUE = "tuesday",
    WED = "wednesday",
    THU = "thursday",
    FRI = "friday",
    SAT = "saturday",
    SUN = "sunday",
}

export interface HourWindow {
    start: string;
    end: string;
    type: "OPEN";
}

export interface OpeningHour {
    days: {
        [key in WeekDayEnum]?: HourWindow[];
    };
    closed_on_holidays?: boolean;
    open_by_arrangement?: boolean;
}

export interface PlaceInfo {
    id: string;
    displayed_what: string;
    displayed_where: string;
    opening_hours: OpeningHour;
}
