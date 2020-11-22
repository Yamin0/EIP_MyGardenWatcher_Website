import {apiUrl} from "../App";
import {UserService} from "./UserService";

const createCarrot = (name: string, gatewayId: number, serialNumber: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({name, gatewayId, serialNumber})
    };

    return fetch(apiUrl + "/carrots", reqOpt)
        .then((res) => handleResponse(res))
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
        .then((res) => handleResponse(res))
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
        .then((res) => handleResponse(res))
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
        .then((res) => handleResponse(res))
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
        .then((res) => handleResponse(res))
        .then(() => {return}, (err) => {
            return Promise.reject(err);
        });

};

const sensorData = (id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        })
    };

    let url = apiUrl + "/sensorData/?carrotId=" + id.toString() + "&attributes=luminosity,temperature,humidity";

    return fetch(url, reqOpt)
        .then((res) => handleResponse(res))
        .then((data) => {
            return data
        }, (err) => {
            return Promise.reject(err);
        })
};

const aliveCarrot = (gatewayId: number, id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/carrots/alive/" + gatewayId.toString() + "/" + id.toString(), reqOpt)
        .then((res) => handleResponse(res))
        .then((status) => {
            return status
        }, (err) => {
            return Promise.reject(err);
        });
};

function handleResponse(response: Response) {
    const newToken = response.headers.get("token");
    if (newToken && newToken !== "")
        UserService.setToken(newToken);
    return response.text().then(text => {
        let data;
        try {
            data = {text} && JSON.parse(text);
        } catch (e) {
            data = text;
        }
        if (!response.ok) {
            switch (response.status) {
                case 422:
                    return Promise.reject("Le nom ou le numéro de série de la carotte que vous essayez de créer est déjà pris, ou le numéro de série n'existe pas.");
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
    deleteCarrot,
    sensorData,
    aliveCarrot
};

