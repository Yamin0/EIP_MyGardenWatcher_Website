export default interface User {
    email: string,
    password: string,
    newPassword: string,
    firstName: string,
    lastName: string,
    birthDay: Date,
    address: string,
}

export const userInit: User = {
    email: "",
    password: "",
    newPassword: "",
    firstName: "",
    lastName: "",
    birthDay: new Date(),
    address: "",
};
