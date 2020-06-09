export default interface Search {
    name: string,
    temperature: number,
    humidity: number,
    light: string,
}

export const searchInit: Search = {
    name: "",
    temperature: 0,
    humidity: 0,
    light: "",
};
