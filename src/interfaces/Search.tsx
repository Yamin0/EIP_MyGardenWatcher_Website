export default interface Search {
    name: string,
    type: number[],
    temperature: number,
    humidity: number,
    light: string,
}

export const searchInit: Search = {
    name: "",
    type: [],
    temperature: -1,
    humidity: -1,
    light: ""
}

export const lightIconNames: string[] = [
    "none",
    "partial",
    "full"
];

export const lightFrenchNames: string[] = [
    "aucune exposition",
    "exposition partielle",
    "exposition complète"
];

export const tempRanges: number[][] = [
    [-30, -10],
    [-9, 0],
    [1, 10],
    [11, 20],
    [21, 30],
    [30, 50],
];

export const humidityRanges: number[][] = [
    [0, 20],
    [21, 40],
    [41, 60],
    [61, 80],
    [81, 100],
];
