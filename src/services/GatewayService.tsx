import {apiUrl} from "../App";
import {UserService} from "./UserService";

const createGateway = (name: string, serialCode: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({name, serialCode})
    };

    return fetch(apiUrl + "/gateways", reqOpt)
        .then((res) => handleResponse(res))
        .then((gateway) => {
            return gateway;
        }, (err) => {
            return Promise.reject(err);
        });
};

const fetchGatewayList = () => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        })
    };

    return fetch(apiUrl + "/gateways", reqOpt)
        .then((res) => handleResponse(res))
        .then((gateways) => {
            return gateways.gateways;
        }, (err) => {
            return Promise.reject(err);
        })
};

const editGateway = (id: number, newName: string) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({ id, newName })
    };

    return fetch(apiUrl + "/gateways/rename", reqOpt)
        .then((res) => handleResponse(res))
        .then((gateway) => {
            return gateway;
        }, (err) => {
            return Promise.reject(err);
        })
};

const fetchGatewayDetail = (id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        })
    };

    return fetch(apiUrl + "/gateways/" + id.toString(), reqOpt)
        .then((res) => handleResponse(res))
        .then((gateway) => {
            return gateway
        }, (err) => {
            return Promise.reject(err);
        })
};

const deleteGateway = (id: number) => {
    const reqOpt: RequestInit = {
        method: "DELETE",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/gateways/" + id.toString(), reqOpt)
        .then((res) => handleResponse(res))
        .then(() => {return}, (err) => {
            return Promise.reject(err);
        });
};

const aliveGateway = (id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/gateways/alive/" + id.toString(), reqOpt)
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
            return Promise.reject("Oups, une erreur s'est produite lors de l'envoi du formulaire. Merci de réessayer plus tard.");
        }

        return data;
    });
}

export const GatewayService = {
    createGateway,
    fetchGatewayList,
    editGateway,
    fetchGatewayDetail,
    deleteGateway,
    aliveGateway
};