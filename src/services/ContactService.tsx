import {UserService} from "./UserService";
import {apiUrl} from "../App";

const contactPro = (object: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({object})
    };

    return (fetch(apiUrl + "/forms", reqOpt)
        .then(handleResponse)
        .then(() => {}, (err) => {
            return Promise.reject(err);
        }))
};

const contactSingle = (object: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({object})
    };

    return (fetch(apiUrl + "forms", reqOpt)
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
    contactPro,
    contactSingle
};

