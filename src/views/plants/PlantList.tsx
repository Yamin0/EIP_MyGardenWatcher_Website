import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant from "../../interfaces/Plant";
import {Link, RouteComponentProps, withRouter} from "react-router-dom";
import PlantSearchEngine from "./PlantSearchEngine";
import Search, {searchInit} from "../../interfaces/Search";
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

        this.state = {
            currentPage: 1,
            totalPages: 1,
            isFetching: false,
            error: "",
            plants: [],
            displayedPlants: [],
            sort: ESortType.NAME_ASC,
            search: searchInit
        };

        this.parseSearchQuery = this.parseSearchQuery.bind(this);
        this.fetchAllPlants = this.fetchAllPlants.bind(this);
        this.fetchPagePlants = this.fetchPagePlants.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
    }

    componentDidMount(): void {
        this.parseSearchQuery();
        this.fetchAllPlants(this.fetchPagePlants);
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<IPlantListState>, snapshot?: any) {
        if (JSON.stringify(prevProps.location.search) !== JSON.stringify(this.props.location.search)) {
            this.parseSearchQuery();
            this.fetchAllPlants(this.fetchPagePlants);
        }
    }

    private parseSearchQuery() {
        const parsed = queryString.parse(this.props.location.search);

        this.setState({
            search: parsed as Search
        }, () => console.log(this.state.search));
    }

    private fetchAllPlants(callback: () => void) {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantList(["id", "name", ...Object.keys(this.state.search)]).then(data => {

                let plants: Plant[] = data as Plant[];

                Object.keys(this.state.search).forEach((key) => {
                    console.log(key);
                    plants.filter((plant) => {
//                        console.log(plant[key]);
                        return false;
                    });
                });

                plants = plants.sort((a, b) => {
//                        return a.name.localeCompare(b.name, 'en', {sensitivity: 'base'});
                        if (a < b) return -1;
                        else if (a > b) return 1;
                        return 0;
                    });

                console.log(plants);
                this.setState({
                    plants: plants.map(plant => plant.id),
                    totalPages: Math.trunc(plants.length / itemsPerPage) + (plants.length % itemsPerPage > 0 ? 1 : 0),
                    isFetching: false,
                    error: ""
                }, callback);
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
                const plants: Plant[] = data as Plant[];
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

    private sortPlants() {
        // call api par attr pour order => PlantService, remplace onSelectChange
        // modifie uniquement this.state.plants
        // puis appelle fetchPagePlants
    }

    //voué a dégager
    private onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;

        if (parseInt(value) !== this.state.sort) {
/*            let sortedList: Plant[] = this.state.plants.sort((a, b) => a.name.localeCompare(b.name));
            if (value === "alpha_desc")
                sortedList = sortedList.reverse();*/

//            let filteredSortedList: Plant[] = this.state.filteredPlants.sort((a, b) => a.name.localeCompare(b.name));
//            if (value === "alpha_desc")
//                filteredSortedList = filteredSortedList.reverse();

            this.setState({
                sort: parseInt(e.target.value),
//                plants: sortedList,
//                filteredPlants: filteredSortedList
            });
        }
    }

    private onPageChange(e: React.MouseEvent, page: number) {
        e.preventDefault();
        this.setState({
            currentPage: page
        }, () => {
            this.fetchAllPlants(this.fetchPagePlants);
        })

    }

    private createPagination() {
        let pages: React.ReactNode[] = [];

        if (this.state.totalPages === 1)
            return pages;

        let status: boolean = false;
        for (let i = 1; i <= this.state.totalPages; i++) {
            if (i < 5 || (i > this.state.currentPage - 3 && i < this.state.currentPage + 3) || i > this.state.totalPages - 3) {
                status = false;
                pages.push(i === this.state.currentPage ?
                    <li className="page-item active" key={i.toString()}>
                    <span className="page-link">
                        {i}
                        <span className="sr-only">(current)</span>
                    </span>
                    </li>
                    :
                    <li className="page-item" key={i.toString()}>
                        <a className="page-link" href="#" onClick={e => this.onPageChange(e, i)}>{i}</a>
                    </li>
                )

            } else {
                if (!status) {
                    status = true;
                    pages.push(<li className="page-item" key={i.toString()}>
                        <span className="page-link disabled">
                            ...
                        </span>
                    </li>)
                }
            }
        }

        return pages
    }

    render() {
        return (
            <div className="plant-list container">
                <h1 className="main-title text-center">
                    Nos plantes
                </h1>
                <div className="row plant-list-bar justify-content-between">
                    <PlantSearchEngine prevSearch={this.state.search}/>
                    <div className="col-2">
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
                        !this.state.isFetching && this.state.error === "" && this.state.displayedPlants.map((plant) =>
                            <div className="col-4 plant-list-thumb" key={plant.id}>
                                <h3 className="text-center plant-list-thumb-title">
                                    {plant.name}
                                </h3>
                                <Link to={"/plants/" + plant.id + "/" + plant.name} className="plant-list-thumb-link">
                                    <img src={plant.image} alt={plant.name} className="plant-list-thumb-img"/>
                                </Link>

                                <div className="row plant-list-thumb-data">
                                    <div className="col-4 plant-list-thumb-data-thumb">
                                        <img className="plant-list-thumb-icon" src="/images/icons/icon-temperature.png" alt="temperature"/>
                                        {plant.minTemp}° à {plant.maxTemp}°
                                    </div>
                                    <div className="col-4 plant-list-thumb-data-thumb">
                                        <img className="plant-list-thumb-icon" src="/images/icons/icon-humidity.png" alt="humidité"/>
                                        {plant.humidity}%
                                    </div>
                                    <div className="col-4 plant-list-thumb-data-thumb">
                                        <img className="plant-list-thumb-icon" src="/images/icons/icon-light.png" alt="luminosité"/>
                                        {plant.light}
                                    </div>
                                </div>
                                <div className="module line-clamp col-12">
                                    <p>{plant.description}</p>
                                </div>
                            </div>)
                    }
                </div>

                {
                    !this.state.isFetching &&
                    <div className="row">
                        <nav aria-label="...">
                            <ul className="pagination">
                                {
                                    this.state.currentPage !== 1 &&
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => this.onPageChange(e, this.state.currentPage - 1)} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                }

                                {this.createPagination()}

                                {
                                    this.state.currentPage !== this.state.totalPages &&
                                    <li className="page-item">
                                        <a className="page-link" href="#" onClick={e => this.onPageChange(e, this.state.currentPage + 1)} aria-label="Next">
                                            <span aria-hidden="true">&raquo;</span>
                                            <span className="sr-only">Next</span>
                                        </a>
                                    </li>
                                }
                            </ul>
                        </nav>
                    </div>
                }
            </div>
        )
    }
}

export default withRouter(PlantList);
