export const capitalise = (text: string) => {
    if (!text.length) {
        return "";
    }

    return `${text[0].toUpperCase()}${text.slice(1)}`;
};
