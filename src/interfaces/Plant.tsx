export default interface Plant {
    id: number,
    name: string,
    minTemp: number,
    maxTemp: number,
    humidity: number,
    light: string,
    image: string,
    description: string,
    link: string,
    type: string,
    caracteristics: string
}

export const plantInit: Plant = {
    id: 0,
    name: "",
    minTemp: 0,
    maxTemp: 0,
    humidity: 0,
    light: "",
    image: "",
    description: "",
    link: "",
    type: "",
    caracteristics: ""
};
