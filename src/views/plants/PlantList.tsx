import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant from "../../interfaces/Plant";
import { RouteComponentProps, withRouter} from "react-router-dom";
import PlantSearchEngine from "./PlantSearchEngine";
import Search from "../../interfaces/Search";
import PlantThumb from "./PlantThumb";
import Pagination from "../shared/Pagination";
const queryString = require('query-string');

export enum ESortType {
    NAME_ASC,
    NAME_DESC,
    MIN_TEMP_ASC,
    MIN_TEMP_DESC,
    MAX_TEMP_ASC,
    MAX_TEMP_DESC,
    HUM_ASC,
    HUM_DESC,
    SUN_ASC,
    SUN_DESC,
}

const getSortAttrName = (sort: ESortType) => {
    switch (sort) {
        case ESortType.NAME_ASC:
        case ESortType.NAME_DESC: return "name";
        case ESortType.MIN_TEMP_ASC:
        case ESortType.MIN_TEMP_DESC: return "minTemp";
        case ESortType.MAX_TEMP_ASC:
        case ESortType.MAX_TEMP_DESC: return "maxTemp";
        case ESortType.HUM_ASC:
        case ESortType.HUM_DESC: return "humidity";
        case ESortType.SUN_ASC:
        case ESortType.SUN_DESC: return "light";
        default: return "";
    }
}

interface IPlantListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    error: string,
    plants: number[],
    displayedPlants: Plant[],
    sort: ESortType,
    search: Search
}

const itemsPerPage: number = 9;

class PlantList extends React.Component<RouteComponentProps, IPlantListState> {
    constructor(props: any) {
        super(props);

        const parsed = queryString.parse(this.props.location.search);
        if (parsed.humidity) parsed.humidity = parseInt(parsed.humidity);
        if (parsed.temperature) parsed.temperature = parseInt(parsed.temperature);

        this.state = {
            currentPage: 1,
            totalPages: 1,
            isFetching: false,
            error: "",
            plants: [],
            displayedPlants: [],
            sort: ESortType.NAME_ASC,
            search: parsed
        };

        this.fetchAllPlants = this.fetchAllPlants.bind(this);
        this.fetchPagePlants = this.fetchPagePlants.bind(this);
        this.filterTemperature = this.filterTemperature.bind(this);
        this.filterHumidity = this.filterHumidity.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    // React Life Cycle
    componentDidMount(): void {
        console.log("lol");
        this.parseSearchQuery();
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<IPlantListState>, snapshot?: any) {
        if (JSON.stringify(prevProps.location.search) !== JSON.stringify(this.props.location.search)) {
            this.parseSearchQuery();
        }
    }

    // Fetch plants
    private fetchAllPlants() {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantList(["id", "name", getSortAttrName(this.state.sort), ...Object.keys(this.state.search)]).then(data => {

                let plants: Plant[] = data as Plant[];

                plants = this.filterPlants(plants);
                plants = this.sortPlants(plants, this.state.sort);

                this.setState({
                    plants: plants.map(plant => plant.id),
                    currentPage: 1,
                    totalPages: Math.trunc(plants.length / itemsPerPage) + (plants.length % itemsPerPage > 0 ? 1 : 0),
                    isFetching: false,
                    error: ""
                }, this.fetchPagePlants);
            }, error => {
                this.setState({ error: error.toString(), isFetching: false })
            });
        });
    }

    private fetchPagePlants() {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantList(["id", "name", "minTemp", "maxTemp", "humidity", "light", "image", "description"],
                PlantService.calculateIdsOfPage(
                    this.state.currentPage,
                    itemsPerPage,
                    this.state.plants)
                    .join(";"))
                .then(data => {
                    let plants: Plant[] = data as Plant[];
                    plants = this.sortPlants(plants, this.state.sort);

                    this.setState({
                        displayedPlants: plants,
                        isFetching: false,
                        error: ""
                    });
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    // Search engine management
    private parseSearchQuery() {
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.humidity) parsed.humidity = parseInt(parsed.humidity);
        if (parsed.temperature) parsed.temperature = parseInt(parsed.temperature);

        this.setState({
            search: parsed as Search
        }, this.fetchAllPlants);
    }

    private filterPlants(plants: Plant[]) {
        Object.keys(this.state.search).forEach((key) => {
            switch (key) {
                case "temperature":  plants = plants.filter(this.filterTemperature); break;
                case "humidity":  plants = plants.filter(this.filterHumidity); break;
                case "light":
                    plants = plants.filter(plant => {
                        return plant.light.toLowerCase().includes(this.state.search.light.toLowerCase())
                    });
                    break;
                case "name":
                    plants = plants.filter(plant => {
                        return plant.name.toLowerCase().includes(this.state.search.name.toLowerCase())
                    });
                    break;
                default: break;
            }
        });
        return plants;
    }

    private filterTemperature(plant: Plant) {
        switch (this.state.search.temperature) {
            case 1: break;
            case 2: break;
            case 3: break;
            case 4: break;
            case 5: break;
            case 6: break;
            default: return true;
        }
    }

    private filterHumidity(plant: Plant) {
        switch (this.state.search.temperature) {
            case 1: break;
            case 2: break;
            case 3: break;
            case 4: break;
            case 5: break;
            case 6: break;
            default: break;
        }
    }

    // Sort management
    private createSortSelect() {
        return <div className="col-2">
            Trier par:
            <select className="plant-list-search-select" value={this.state.sort} onChange={this.onSelectChange}>
                <option value={ESortType.NAME_ASC}>Nom croissant</option>
                <option value={ESortType.NAME_DESC}>Nom décroissant</option>
                <option value={ESortType.MIN_TEMP_ASC}>Température min croissante</option>
                <option value={ESortType.MIN_TEMP_DESC}>Température min décroissante</option>
                <option value={ESortType.MAX_TEMP_ASC}>Température max croissante</option>
                <option value={ESortType.MAX_TEMP_DESC}>Température max décroissante</option>
                <option value={ESortType.HUM_ASC}>Humidité croissante</option>
                <option value={ESortType.HUM_DESC}>Humidité décroissante</option>
                <option value={ESortType.SUN_ASC}>Luminosité croissante</option>
                <option value={ESortType.SUN_DESC}>Luminosité décroissante</option>
            </select>
        </div>

    }

    private onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(e.target.value);

        if (value !== this.state.sort) {
            this.setState({ isFetching: true }, () => {
                PlantService.fetchPlantList(["id", getSortAttrName(value)], this.state.plants.join(";")).then(data => {
                    let plants: Plant[] = data as Plant[];
                    plants = this.sortPlants(plants, value);

                    this.setState({
                        sort: value,
                        plants: plants.map(plant => plant.id),
                        isFetching: false,
                    }, this.fetchPagePlants);
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
            });
        }
    }

    private sortPlants(plants: Plant[], sort: ESortType) {
        switch (sort) {
            case ESortType.NAME_ASC: plants = plants.sort(this.nameSort(1)); break;
            case ESortType.NAME_DESC: plants = plants.sort(this.nameSort(-1)); break;
            case ESortType.MIN_TEMP_ASC: plants = plants.sort((a, b) => a.minTemp - b.minTemp); break;
            case ESortType.MIN_TEMP_DESC: plants = plants.sort((a, b) => b.minTemp - a.minTemp); break;
            case ESortType.MAX_TEMP_ASC: plants = plants.sort((a, b) => a.maxTemp - b.maxTemp); break;
            case ESortType.MAX_TEMP_DESC: plants = plants.sort((a, b) => b.maxTemp - a.maxTemp); break;
            case ESortType.HUM_ASC: plants = plants.sort((a, b) => a.humidity - b.humidity); break;
            case ESortType.HUM_DESC: plants = plants.sort((a, b) => b.humidity - a.humidity); break;
            case ESortType.SUN_ASC: plants = plants.sort(this.lightSort(1)); break;
            case ESortType.SUN_DESC: plants = plants.sort(this.lightSort(-1)); break;
            default: break;
        }

        return plants;
    }

    private nameSort(dir: number){
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZaàâäbcçdeéèêëfghiïîjklmnñoôöpqrstuûüvwxyÿz';
        return function(a: Plant, b: Plant){
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

    private lightSort(dir: number) {
        const lightValues: string[] = ["none", "none:partial","partial", "partial:full", "full", "none:partial:full"];
        return function(a: Plant, b: Plant){
            const aLight = a.light.toLowerCase();
            const bLight = b.light.toLowerCase();
            dir = dir || 1;

            return lightValues.indexOf(aLight) > lightValues.indexOf(bLight) ? dir:-dir;
        };
    }

    //Pagination
    private onPageChange(e: React.MouseEvent, page: number) {
        e.preventDefault();
        this.setState({
            currentPage: page
        }, this.fetchPagePlants)
    }

    render() {
        return (
            <div className="plant-list container">
                <h1 className="main-title text-center">
                    Nos plantes
                </h1>
                <div className="row plant-list-bar justify-content-between">
                    <PlantSearchEngine prevSearch={this.state.search}/>
                    {this.createSortSelect()}
                </div>
                <div className="row">
                    {
                        this.state.isFetching ?
                            <p>Récupération des données...</p>
                            : ""
                    }

                    {
                        this.state.error !== "" ?
                            <div className="form">
                                <div className="error">
                                    <span className="oi oi-warning"/>
                                    {this.state.error}
                                </div>
                            </div>
                            :
                            ""
                    }

                    {
                        !this.state.isFetching
                        && this.state.error === ""
                        && this.state.displayedPlants.map((plant, i) => <PlantThumb key={i.toString()} plant={plant}/>)
                    }
                </div>

                {
                    !this.state.isFetching &&
                    <div className="row">
                        <nav aria-label="">
                            <Pagination
                                currentPage={this.state.currentPage}
                                totalPages={this.state.totalPages}
                                onPageChange={this.onPageChange}
                            />
                        </nav>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(PlantList);
