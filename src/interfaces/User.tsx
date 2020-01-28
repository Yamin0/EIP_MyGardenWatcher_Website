export default interface User {
    email: string,
    password: string,
    newPassword: string,
    firstName: string,
    lastName: string,
    birthDay: Date,
    address: string,
    acceptMails: boolean
}

export const userInit: User = {
    email: "",
    password: "",
    newPassword: "",
    firstName: "",
    lastName: "",
    birthDay: new Date(),
    address: "",
    acceptMails: true
};
