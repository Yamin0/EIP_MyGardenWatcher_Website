import {UserService} from "./UserService";
import {apiUrl} from "../App";

const sendContact = (object: object, isAuthenticated: boolean, formType: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
        body: JSON.stringify({...object, formType })
    };

    let url: string = apiUrl + "/forms/" + (isAuthenticated ? "user" : "nonUser");

    if (isAuthenticated) {
        reqOpt.headers = new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        });
    }

    return (fetch(url, reqOpt)
        .then(handleResponse)
        .then(() => {}, (err) => {
            return Promise.reject(err);
        }))
};

function handleResponse(response: Response) {
    return response.text().then(text => {
        let data;
        try {
            data = {text} && JSON.parse(text);
        } catch (e) {
            data = text;
        }
        if (!response.ok) {
            if (response.status === 404) {
                return Promise.reject("Votre compte utilisateur n'a pas été trouvé. Veuillez vérifier que vous êtes connecté.");
            } else {
                return Promise.reject("Oups, une erreur s'est produite lors de l'envoi de votre message. Merci de réessayer plus tard.");
            }
        }

        return data;
    });
}

export const ContactService = {
    sendContact,
};

