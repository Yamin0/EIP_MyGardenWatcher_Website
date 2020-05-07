export default interface Search {
    name: string,
    minTemp: string,
    maxTemp: string,
    humidity: string,
    light: string,
}

export const lightValues: string[] = [
    "",
    "low",
    "partial",
    "full",
    "low:partial",
    "partial:full"
];

export const searchInit: Search = {
    name: "",
    minTemp: "",
    maxTemp: "",
    humidity: "",
    light: lightValues[0],
};
