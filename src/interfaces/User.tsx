export default interface User {
    mail: string,
    password: string,
    firstName: string,
    lastName: string,
    birthdate: Date,
    geoLoc: string,
    receiveMail: boolean
}

export const userInit: User = {
    mail: "",
    password: "",
    firstName: "",
    lastName: "",
    birthdate: new Date(85, 0, 1),
    geoLoc: "",
    receiveMail: true
};
