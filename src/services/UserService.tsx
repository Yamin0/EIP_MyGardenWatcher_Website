import {apiUrl, history} from "../App";
import User from "../interfaces/User";

enum EReqOrigin {
    REGISTER,
    LOGIN,
    GETUSER,
    SETUSER,
    EDITPWD,
    FORGOTPWD,
    RESETPWD,
    DELETE
}

const register = (mail: string, password: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, password})
    };

    return fetch(apiUrl + "/auth/register", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.REGISTER))
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
        .then((res) => handleResponse(res, EReqOrigin.LOGIN))
        .then((res) => {
            setToken(res.token);
        }, (err) => {
            return Promise.reject(err);
        })
};

const getUser = () => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/auth/user", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.GETUSER))
        .then((user) => {
            if (user["birthdate"] && user["birthdate"] !== "") user["birthdate"] = new Date(user["birthdate"]);
            else user["birthdate"] = new Date();
            user["password"] = "";
            return user;
        }, (err) => {
            return Promise.reject(err);
        })
};

const setUser = (user: User) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({...user, localisation: user.geoLoc})
    };

    return fetch(apiUrl + "/auth/user/update", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.SETUSER))
        .then((user) => {
            return user
        }, (err) => {
            return Promise.reject(err);
        });
};

const changePassword = (mail: string, oldPassword: string, newPassword: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({mail, oldPassword, newPassword})
    };

    return fetch(apiUrl + "/auth/user", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.EDITPWD))
        .then(() => {}, (err) => {
            return Promise.reject(err);
        });
}

const forgotPassword = (mail: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail})
    };

    return fetch(apiUrl + "/auth/reset/init", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.FORGOTPWD))
        .then(() => {}, (err) => {
            return Promise.reject(err);
        });
};

const resetPassword = (mail: string, newPassword: string,  token: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify({mail, newPassword, token})
    };

    return fetch(apiUrl + "/auth/reset/change", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.RESETPWD))
        .then(() => {}, (err) => {
            return Promise.reject(err);
        });
};

const deleteAccount = () => {
    const reqOpt: RequestInit = {
        method: "DELETE",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/auth/user", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.DELETE))
        .then(() => {logout()}, (err) => {
            return Promise.reject(err);
        });

};

const getToken = () => window.localStorage.getItem("mgwAuthToken");

const setToken = (token: string) => {
    window.localStorage.setItem("mgwAuthToken", token);
};

const logout = () => {
    window.localStorage.removeItem("mgwAuthToken");
    history.push("/");
};

function handleResponse(response: Response, origin: EReqOrigin) {
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
                    return Promise.reject(origin === EReqOrigin.RESETPWD ?
                        "La clé d'identification pour la réinitialisation de mot de passe est incorrecte ou a déjà été utilisée." :
                        "Un des champs du formulaire est manquant ou mal renseigné dans la requête. C'est un problème de code."
                    );
                case 401:
                    return Promise.reject(origin === EReqOrigin.LOGIN ?
                        "Identifiants incorrects" :
                        origin === EReqOrigin.FORGOTPWD ?
                            "Nous n'avons pas pu trouver de compte utilisateur enregistré avec cette adresse email." :
                            "Oups, une erreur s'est produite lors de l'envoi du formulaire. Merci de réessayer plus tard."
                    )
                case 404:
                    return Promise.reject(origin === EReqOrigin.FORGOTPWD || origin === EReqOrigin.RESETPWD ?
                        "Nous n'avons pas pu trouver de compte utilisateur enregistré avec cette adresse email." :
                        "Votre compte utilisateur n'a pas été trouvé. Merci de vérifier vos identifiants    ."
                    );
                case 405:
                    return Promise.reject("La réinitialisation du mot de passe n'a pas du être effectuée. Merci de réessayer une nouvelle fois ou contacter le support pour obtenir de l'aide.");
                case 409:
                    return Promise.reject("Cette adresse email a déjà été renseignée pour créer un compte utilisateur. Merci d'en indiquer une autre.");
                default:
                    return Promise.reject("Oups, une erreur s'est produite lors de l'envoi du formulaire. Merci de réessayer plus tard.");
            }
        }

        return data;
    });
}

export const UserService = {
    register,
    getUser,
    setUser,
    changePassword,
    forgotPassword,
    resetPassword,
    deleteAccount,
    login,
    logout,
    getToken
};

