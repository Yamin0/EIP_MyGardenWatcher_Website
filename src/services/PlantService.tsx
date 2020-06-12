import {apiUrl} from "../App";
import Plant, {lightList, typeList} from "../interfaces/Plant";
import Search, {humidityRanges, tempRanges} from "../interfaces/Search";
import ESortType from "../interfaces/Sort";

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

const filterPlantList = (search: Search, plants: Plant[]) => {
    Object.keys(search).forEach((key) => {
        switch (key) {
            case "temperature":  plants = plants.filter(filterTemperature(search.temperature)); break;
            case "humidity":  plants = plants.filter(filterHumidity(search.humidity)); break;
            case "light":
                plants = plants.filter(plant => {
                    return plant.light.toLowerCase().includes(search.light.toLowerCase())
                });
                break;
            case "name":
                plants = plants.filter(plant => {
                    return plant.name.toLowerCase().includes(search.name.toLowerCase())
                });
                break;
            case "type":
                const searchTypes: string[] = search.type.map(val => typeList[val].toLowerCase());
                plants = plants.filter(plant => searchTypes.includes(plant.type.toLowerCase()));
                break;
            default: break;
        }
    });
    return plants;
};

const filterTemperature = (temperature: number) => {
    return function(plant: Plant) {
        const range: number[] = tempRanges[temperature];
        const array: number[] = Array(range[1] - range[0] + 1).fill(range[0]).map((x,i)=> x + i);

        let included: boolean = false;

        array.forEach(x => {
            if (plant.minTemp < x && x < plant.maxTemp)
                included = true;
        });
        return included;
    }
}

const filterHumidity = (humidity: number) => {
    return function(plant: Plant) {
        const range: number[] = humidityRanges[humidity];

        return range[0] < plant.humidity && plant.humidity < range[1];
    }
}

const sortPlantList = (plants: Plant[], sort: ESortType) => {
    switch (sort) {
        case ESortType.NAME_ASC: plants = plants.sort(nameSort(1)); break;
        case ESortType.NAME_DESC: plants = plants.sort(nameSort(-1)); break;
        case ESortType.TYPE_ASC: plants = plants.sort(typeSort(1)); break;
        case ESortType.TYPE_DESC: plants = plants.sort(typeSort(-1)); break;
        case ESortType.MIN_TEMP_ASC: plants = plants.sort((a, b) => a.minTemp - b.minTemp); break;
        case ESortType.MIN_TEMP_DESC: plants = plants.sort((a, b) => b.minTemp - a.minTemp); break;
        case ESortType.MAX_TEMP_ASC: plants = plants.sort((a, b) => a.maxTemp - b.maxTemp); break;
        case ESortType.MAX_TEMP_DESC: plants = plants.sort((a, b) => b.maxTemp - a.maxTemp); break;
        case ESortType.HUM_ASC: plants = plants.sort((a, b) => a.humidity - b.humidity); break;
        case ESortType.HUM_DESC: plants = plants.sort((a, b) => b.humidity - a.humidity); break;
        case ESortType.SUN_ASC: plants = plants.sort(lightSort(1)); break;
        case ESortType.SUN_DESC: plants = plants.sort(lightSort(-1)); break;
        default: break;
    }

    return plants;
};

const nameSort = (dir: number) => {
    const alphabet = 'ÆABCDEFGHIJKLMNŒOPQRSTUVWXYZæaàâäbcçdeéèêëfghiïîjklmnñœoôöpqrstuûüvwxyÿz';
    return function(a: Plant, b: Plant) {
        const aName = a.name.toLowerCase();
        const bName = b.name.toLowerCase();
        let pos = 0,
            min = Math.min(aName.length, bName.length);
        dir = dir || 1;
        while(aName.charAt(pos) === bName.charAt(pos) && pos < min){ pos++; }
        return alphabet.indexOf(aName.charAt(pos)) > alphabet.indexOf(bName.charAt(pos)) ?
            dir:-dir;
    };
};

const typeSort = (dir: number) => {
    return function(a: Plant, b: Plant) {
        const aType = a.type.toLowerCase();
        const bType = b.type.toLowerCase();

        dir = dir || 1;
        return (typeList.indexOf(aType) > typeList.indexOf(bType)) ? dir: -dir;
    }
}

const lightSort = (dir: number) => {
    return function(a: Plant, b: Plant){
        const aLight = a.light.toLowerCase();
        const bLight = b.light.toLowerCase();
        dir = dir || 1;

        return lightList.indexOf(aLight) > lightList.indexOf(bLight) ? dir:-dir;
    };
};

const calculateIdsOfPage = (pageNumber: number, itemsPerPage: number, allIds: number[]) => {
    const minPlantIndex: number = itemsPerPage * (pageNumber - 1);

    let plantIds: number[] = [];
    for (let i = minPlantIndex; i < minPlantIndex + itemsPerPage; i++) plantIds = [...plantIds, allIds[i]];

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
    filterPlantList,
    sortPlantList,
    calculateIdsOfPage,
    groupIds
};

