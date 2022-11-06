import useSWR from "swr";
import { PlaceInfo } from "./types/Places";
import { SWRConfiguration } from "swr/dist/types";

const RESOURCE_ENDPOINT: string = "http://127.0.0.1:3000/api/places";

const fetcher = async (input: RequestInfo | URL, init?: RequestInit) => {
    const resp = await fetch(input, init);
    return resp.json();
};

export const useAllPlaces = (
    swrOptions?: SWRConfiguration
): {
    places?: PlaceInfo[];
    isLoading: boolean;
    isError: boolean;
} => {
    const { data, error } = useSWR<PlaceInfo[]>(
        RESOURCE_ENDPOINT,
        fetcher,
        swrOptions || {}
    );

    return {
        places: data,
        isLoading: !error && !data,
        isError: error,
    };
};
