import {apiUrl, history} from "../App";
import User from "../interfaces/User";
import {UserService} from "./UserService";

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

const createCarrot = (name: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({name})
    };

    return fetch(apiUrl + "/carrots", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.REGISTER))
        .then((carrot) => {
            return carrot;
        }, (err) => {
            return Promise.reject(err);
        });
};

const fetchCarrotList = () => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        })
    };

    return fetch(apiUrl + "/carrots", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.LOGIN))
        .then((carrots) => {
            return carrots.carrots;
        }, (err) => {
            return Promise.reject(err);
        })
};

const editCarrot = (id: number, newName: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({ id, newName })
    };

    return fetch(apiUrl + "/carrots/rename", reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.GETUSER))
        .then((carrot) => {
            return carrot;
        }, (err) => {
            return Promise.reject(err);
        })
};

const fetchCarrotDetail = (id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        })
    };

    return fetch(apiUrl + "/carrots/" + id.toString(), reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.LOGIN))
        .then((carrot) => {
            return carrot
        }, (err) => {
            return Promise.reject(err);
        })
};

const deleteCarrot = (id: number) => {
    const reqOpt: RequestInit = {
        method: "DELETE",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/carrots/" + id.toString(), reqOpt)
        .then((res) => handleResponse(res, EReqOrigin.DELETE))
        .then(() => {return}, (err) => {
            return Promise.reject(err);
        });

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

export const CarrotService = {
    createCarrot,
    fetchCarrotList,
    fetchCarrotDetail,
    editCarrot,
    deleteCarrot
};

