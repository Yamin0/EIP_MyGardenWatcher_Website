import Plant from "./Plant";

export default interface Carrot {
    name: string,
    id: number,
    plants: Plant[]
}

export const carrotInit: Carrot = {
    id: 0,
    name: "",
    plants: []
};