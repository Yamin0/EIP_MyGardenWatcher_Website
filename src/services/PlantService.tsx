import Plant from "../interfaces/Plant";

const fetchPlantList = () => {
    /*    const reqOpt: RequestInit = {
            method: "GET",
            headers: new Headers({ 'Content-Type': 'application/json', 'auth': UserService.getToken() as string }),
        };

        return fetch("http://www.mygardenwatcher.fr:3001/plants", reqOpt)
            .then(handleResponse)
            .then((plants) => {
                console.log(plants);
            }, (err) => {
                alert("fail fetch plants" + err);
                console.log(err);
                return Promise.reject(err);
            })*/

    const plantList: Plant[] = [
        {
            id: 0,
            name: "Carotte",
            temperature: 12.0,
            humidity: 1.2,
            img: "/images/plants/carotte.jpg"
        },
        {
            id: 1,
            name: "Tomate",
            temperature: 15.5,
            humidity: 6,
            img: "/images/plants/tomate.jpg"
        },
        {
            id: 2,
            name: "Pétunia",
            temperature: 8.3,
            humidity: 11,
            img: "/images/plants/petunia.jpg"
        },
        {
            id: 3,
            name: "Magnolia",
            temperature: -4.1,
            humidity: 2,
            img: "/images/plants/magnolia.jpg"
        },
        {
            id: 4,
            name: "Citron",
            temperature: 22.0,
            humidity: 1.2,
            img: "/images/plants/citron.jpg"
        },
        {
            id: 5,
            name: "Fraise",
            temperature: 35.2,
            humidity: 6,
            img: "/images/plants/fraise.jpg"
        },
        {
            id: 6,
            name: "Rose",
            temperature: 11.3,
            humidity: 11,
            img: "/images/plants/rose.jpg"
        },
        {
            id: 7,
            name: "Bleuet",
            temperature: -9.1,
            humidity: 2,
            img: "/images/plants/bleuet.jpg"
        },

    ];

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(plantList);
        }, 1000);
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

