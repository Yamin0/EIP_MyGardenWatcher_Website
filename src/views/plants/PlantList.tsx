import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant from "../../interfaces/Plant";
import { RouteComponentProps, withRouter} from "react-router-dom";
import PlantSearchEngine from "./PlantSearchEngine";
import Search, {searchInit} from "../../interfaces/Search";
import PlantThumb from "./PlantThumb";
import Pagination from "../shared/Pagination";
import ESortType, {getSortAttrName} from "../../interfaces/Sort";
const queryString = require('query-string');

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

const itemsPerPage: number = 12;

class PlantList extends React.Component<RouteComponentProps, IPlantListState> {
    constructor(props: any) {
        super(props);

        let parsed = queryString.parse(this.props.location.search);
        if (parsed.humidity) parsed.humidity = parseInt(parsed.humidity);
        if (parsed.temperature) parsed.temperature = parseInt(parsed.temperature);
        if (parsed.type) parsed.type = (parsed.type as string).split(",").map(str => parseInt(str));

        if (Object.keys(parsed).length === 0) parsed = searchInit;

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
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.createSortSelect = this.createSortSelect.bind(this);
    }

    // React Life Cycle
    componentDidMount(): void {
        this.parseSearchQuery();
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<IPlantListState>, snapshot?: any) {
        if (JSON.stringify(prevProps.location.search) !== JSON.stringify(this.props.location.search)) {
            this.parseSearchQuery();
        }
    }

    // Search engine management
    private parseSearchQuery() {
        const parsed = queryString.parse(this.props.location.search);
        if (parsed.humidity) parsed.humidity = parseInt(parsed.humidity);
        if (parsed.temperature) parsed.temperature = parseInt(parsed.temperature);
        if (parsed.type) parsed.type = (parsed.type as string).split(",").map(str => parseInt(str));

        this.setState({
            search: parsed as Search
        }, this.fetchAllPlants);
    }

    // Fetch plants
    private fetchAllPlants() {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantList(["id", getSortAttrName(this.state.sort),
                ...Object.keys(this.state.search)])
                .then(data => {
                let plants: Plant[] = data as Plant[];

                plants = PlantService.filterPlantList(this.state.search, plants);
                plants = PlantService.sortPlantList(plants, this.state.sort);

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
        if (this.state.plants.length !== 0) {
            this.setState({ isFetching: true }, () => {
                PlantService.fetchPlantList(["id", "name", "minTemp", "maxTemp", "humidity", "light", "image", "description", "type"],
                    PlantService.calculateIdsOfPage(
                        this.state.currentPage,
                        itemsPerPage,
                        this.state.plants)
                        .join(";"))
                    .then(data => {
                        let plants: Plant[] = data as Plant[];
                        plants = PlantService.sortPlantList(plants, this.state.sort);

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
    }

    // Sort management
    private createSortSelect() {
        return <div className="plant-list-search-sort col-5">
            Trier par:
            <select className="plant-list-search-select" value={this.state.sort} onChange={this.onSelectChange}>
                <option value={ESortType.NAME_ASC}>Nom croissant</option>
                <option value={ESortType.NAME_DESC}>Nom décroissant</option>
                <option value={ESortType.TYPE_ASC}>Type de plante croissant</option>
                <option value={ESortType.TYPE_DESC}>Type de plante décroissant</option>
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
                PlantService.fetchPlantList(["id", getSortAttrName(value)],PlantService.groupIds(this.state.plants)).then(data => {
                    let plants: Plant[] = data as Plant[];
                    plants = PlantService.sortPlantList(plants, value);

                    this.setState({
                        sort: value,
                        currentPage: 1,
                        plants: plants.map(plant => plant.id),
                        isFetching: false,
                        error: ""
                    }, this.fetchPagePlants);
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
            });
        }
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
                    <PlantSearchEngine prevSearch={this.state.search} createSortSelect={this.createSortSelect}/>
                </div>
                <div className="row">
                    {
                        this.state.isFetching &&
                        <p>Récupération des données...</p>
                    }

                    {
                        this.state.error !== "" &&
                        <div className="form">
                            <div className="error">
                                <span className="oi oi-warning"/>
                                {this.state.error}
                            </div>
                        </div>
                    }

                    {
                        !this.state.isFetching &&
                        this.state.error === "" &&
                        this.state.plants.length === 0 &&
                        <p>Aucun résultat ne correspond à votre recherche.</p>
                    }

                    {
                        !this.state.isFetching &&
                        this.state.error === "" &&
                        this.state.displayedPlants.length > 0 &&
                        this.state.displayedPlants.map((plant, i) => <PlantThumb key={i.toString()} plant={plant}/>)
                    }
                </div>

                {
                    !this.state.isFetching &&
                    this.state.totalPages > 1 &&
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
