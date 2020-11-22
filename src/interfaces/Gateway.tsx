import Plant from "./Plant";

export default interface Gateway {
    name: string,
    id: number,
    serialCode: string
}

export const gatewayInit: Gateway = {
    id: 0,
    name: "",
    serialCode: ""
};
