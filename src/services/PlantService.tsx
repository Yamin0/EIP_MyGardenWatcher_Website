import {apiUrl} from "../App";
import {UserService} from "./UserService";

const fetchPlantList = (attributes: string[], ids?: string) => {
        const reqOpt: RequestInit = {
            method: "GET",
            headers: new Headers({
                'Content-Type': 'application/json',
            }),
        };

        if (attributes.includes("temperature"))
            attributes.splice(attributes.indexOf("temperature"), 1, "minTemp", "maxTemp");

        let url: string = apiUrl + "/plants/?attributes=" + attributes.join();
        if (ids && ids !== "") url += "&id=" + ids;

        return fetch(url, reqOpt)
            .then(handleResponse)
            .then((plants) => {
                return plants.plants
            }, (err) => {
                return Promise.reject(err);
            });
};

const fetchPlantDetail = (id: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    };

    const url: string = apiUrl + "/plants/get/" + id.toString();

    return fetch(url, reqOpt)
        .then(handleResponse)
        .then((plant) => {
            return plant
        }, (err) => {
            return Promise.reject(err);
        });
};

const searchPlantList = (search: string) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({
            'Content-Type': 'application/json',
        }),
    };

    let url: string = apiUrl + "/plants/search/" + search;

    return fetch(url, reqOpt)
        .then(handleResponse)
        .then((plants) => {
            return plants.plants
        }, (err) => {
            return Promise.reject(err);
        });
}

const fetchPlantAdvice = (plantId: number, limit: number) => {
    const reqOpt: RequestInit = {
        method: "GET",
        headers: new Headers({'Content-Type': 'application/json'}),
    };

    let url: string = apiUrl + "/plants/similar?plantId=" + plantId.toString() + "&limit=" + limit.toString();

    return fetch(url, reqOpt)
        .then(handleResponse)
        .then((plants) => {
            return plants.plants
        }, (err) => {
            return Promise.reject(err);
        });
};

const calculateIdsOfPage = (pageNumber: number, itemsPerPage: number, allIds: number[]) => {
    const minPlantIndex: number = itemsPerPage * (pageNumber - 1);

    let plantIds: number[] = [];
    for (let i = minPlantIndex; i < minPlantIndex + itemsPerPage && i < allIds.length; i++) {
        plantIds = [...plantIds, allIds[i]];
    }

    return (plantIds);
};

const groupIds = (ids: number[]) => {
    ids = ids.sort((a, b) => a - b);
    let newIds: number[] = [];

    ids.forEach((nb, index) => {
        if (index !== 0 && index !== ids.length - 1) {
            if (ids[index - 1] !== nb - 1 && ids[index + 1] !== nb + 1)
            {
                newIds.push(nb);
                newIds.push(nb);
            }
            else if (ids[index - 1] !== nb - 1 || ids[index + 1] !== nb + 1)
                newIds.push(nb);
        } else {
            newIds.push(nb);
            if (index === 0 && ids[1] !== ids[0] + 1)
                newIds.push(nb);
        }
    });

    let idsString = "";

    newIds.forEach((nb, index) => {
        idsString += nb.toString();
        if (index !== newIds.length - 1) idsString += index % 2 === 0 ? "," : ";"
    });

    return idsString;
};

const linkPlantToCarrot = (plantId: number, carrotId: number) => {
    const reqOpt: RequestInit = {
        method: "POST",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
        body: JSON.stringify({ plantId, carrotId })
    };

    return fetch(apiUrl + "/plants/link", reqOpt)
        .then((res) => handleResponse(res))
        .then((plant) => {
            return plant;
        }, (err) => {
            return Promise.reject(err);
        });
};

const deletePlantFromCarrot = (carrotId: number, plantId: number) => {
    const reqOpt: RequestInit = {
        method: "DELETE",
        headers: new Headers({
            'Content-Type': 'application/json',
            'auth': UserService.getToken() as string
        }),
    };

    return fetch(apiUrl + "/plants/delete/" + carrotId.toString() + "/" + plantId.toString(), reqOpt)
        .then((res) => handleResponse(res))
        .then((plant) => {
            return plant;
        }, (err) => {
            return Promise.reject(err);
        });
}

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
            if (response.status === 404) {
                return Promise.reject("Nous ne disposons pas d'informations sur la plante que vous recherchez.");
            } else {
                return Promise.reject("Oups, une erreur s'est produite lors du chargement de la page. Merci de réessayer plus tard.");
            }
        }

        return data;
    });
}

export const PlantService = {
    fetchPlantList,
    fetchPlantDetail,
    searchPlantList,
    calculateIdsOfPage,
    groupIds,
    linkPlantToCarrot,
    deletePlantFromCarrot,
    fetchPlantAdvice
};

