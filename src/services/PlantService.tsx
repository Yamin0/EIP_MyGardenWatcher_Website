import {UserService} from "./UserService";
import {apiUrl} from "../App";

const fetchPlantList = (attributes: string[], ids?: string) => {
        const reqOpt: RequestInit = {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
                'auth': UserService.getToken() as string
            }),
        };

        let url: string = apiUrl + "/plants/?attributes=" + attributes.join();
        if (ids && ids !== "") url += "&id=" + ids;

        return fetch(url, reqOpt)
            .then(handleResponse)
            .then((plants) => {
                return plants
            }, (err) => {
                return Promise.reject(err);
            });
};

const fetchPlantDetail = (id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    const url: string = apiUrl + "/plants/" + id.toString();

    return fetch(url, reqOpt)
        .then(handleResponse)
        .then((plant) => {
            return plant
        }, (err) => {
            return Promise.reject(err);
        });

};

const calculateIdsOfPage = (pageNumber: number, itemsPerPage: number, allIds: number[]) => {
    const minPlantIndex: number = itemsPerPage * (pageNumber - 1);

    let plantIds: number[] = [];
    for (let i = minPlantIndex; i < minPlantIndex + itemsPerPage; i++) plantIds = [...plantIds, allIds[i]];

    return (plantIds);
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
                return Promise.reject("La plante dont vous essayez de consulter le détail n'a pas été trouvée dans la base de données.");
            } else {
                return Promise.reject("Oups, une erreur s'est produite lors de l'envoi de votre message. Merci de réessayer plus tard.");
            }
        }

        return data;
    });
}

export const PlantService = {
    fetchPlantList,
    fetchPlantDetail,
    calculateIdsOfPage
};

