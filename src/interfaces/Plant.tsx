export default interface Plant {
    id: number,
    name: string,
    minTemp: number,
    maxTemp: number,
    humidity: number,
    light: string,
    ph: string,
    co2: string,
    image: string,
    description: string,
    link: string,
    type: string,
    caracteristics: string
}

export const plantInit: Plant = {
    id: 0,
    name: "",
    minTemp: 0,
    maxTemp: 0,
    humidity: 0,
    light: "",
    ph: "",
    co2: "",
    image: "",
    description: "",
    link: "",
    type: "",
    caracteristics: ""
};

export const typeList: string[] = [
    "arbre à fleurs",
    "arbuste à fleurs",
    "arbre feuillu",
    "arbuste feuillu",
    "arbre fruitier",
    "arbuste fruitier",
    "arbre topiaire",
    "arbuste topiaire",
    "aromatiques et condiments",
    "conifère ou résineux",
    "herbes et graminées",
    "légume racine",
    "légume ancien",
    "autres légumes",
    "palmier",
    "plante à feuillage décoratif",
    "plante à fleurs",
    "plante à fruits décoratifs",
    "plante à tisane",
    "plante comestible",
    "autre",
];

export const lightList: string[] = [
    "none",
    "none:partial",
    "partial",
    "partial:full",
    "full",
    "none:partial:full"
];
