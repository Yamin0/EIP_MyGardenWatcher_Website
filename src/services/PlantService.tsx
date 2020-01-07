import Plant from "../interfaces/Plant";
import {UserService} from "./UserService";

const fetchPlantList = () => {
        const reqOpt: RequestInit = {
            method: "GET",
            headers: new Headers({ 'Content-Type': 'application/json', 'auth': UserService.getToken() as string }),
        };

        return fetch("http://www.mygardenwatcher.fr:3001/plants", reqOpt)
            .then(handleResponse)
            .then((plants) => {
                return plants
            }, (err) => {
                alert("fail fetch plants" + err);
                console.log(err);
                return Promise.reject(err);
            });
};

function handleResponse(response: Response) {
    return response.text().then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
            const error = (data && data.message) || response.statusText;
            return Promise.reject(error);
        }

        return data;
    });
}

export const PlantService = {
    fetchPlantList,
};

