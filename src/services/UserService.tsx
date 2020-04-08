import {createBrowserHistory} from "history";
import {apiUrl} from "../App";

const register = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, password})
    };

    return fetch(apiUrl + "/auth/register", reqOpt)
        .then(handleResponse)
        .then((user) => {
            return login(mail, password);
        }, (err) => {
            return Promise.reject(err);
        });
};

const login = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, password})
    };

    return fetch(apiUrl + "/auth/login", reqOpt)
        .then(handleResponse)
        .then((user) => {
            setToken(user.token);
        }, (err) => {
            return Promise.reject(err);
        })
};

const forgotPassword = (mail: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail})
    };

    return fetch(apiUrl + "/auth/reset/init", reqOpt)
        .then(handleResponse)
        .then(() => {}, (err) => {
            return Promise.reject(err);
        });
};

const resetPassword = (mail: string, token: string, newPassword: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, token, newPassword})
    };

    return fetch(apiUrl + "/auth/reset/change", reqOpt)
        .then(handleResponse)
        .then(() => {}, (err) => {
            return Promise.reject(err);
        });
};

const getToken = () => window.localStorage.getItem("mgwAuthToken");

const setToken = (token: string) => {
    window.localStorage.setItem("mgwAuthToken", token);
};

const logout = () => {
    window.localStorage.removeItem("mgwAuthToken");
    const from ={ pathname: "/" };
    createBrowserHistory().push(from);
    window.location.reload();
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

            switch (response.status) {
                case 400:
                    return Promise.reject("Un des champs du formulaire est manquant dans la requête. C'est un problème de code.");
                case 404:
                    return Promise.reject("Votre compte utilisateur n'a pas été trouvé. Merci de vérifier vos identifiants.");
                case 405:
                    return Promise.reject("La réinitialisation du mot de passe n'a pas du être effectuée. Merci de réessayer une nouvelle fois ou contacter le support pour obtenir de l'aide.");
                case 409:
                    return Promise.reject("Cette adresse email a déjà été enregistrée pour un autre compte utilisateur. Merci d'en utiliser une autre.");
                default:
                    return Promise.reject("Oups, une erreur s'est produite lors de l'envoi du formulaire. Merci de réessayer plus tard.");
            }
        }

        return data;
    });
}

export const UserService = {
    register,
    forgotPassword,
    resetPassword,
    login,
    logout,
    getToken
};

