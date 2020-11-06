import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant from "../../interfaces/Plant";
import { RouteComponentProps, withRouter} from "react-router-dom";
import PlantSearchEngine from "./PlantSearchEngine";
import PlantThumb from "./PlantThumb";
import Pagination from "../shared/Pagination";
import {sortList, sortNames} from "../../interfaces/Sort";

interface IPlantListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    error: string,
    plants: number[],
    displayedPlants: Plant[],
    sort: string,
    search: string
}

const itemsPerPage: number = 15;

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
            sort: sortList[0],
            search: this.props.location.search
        };

        this.saveNewPlants = this.saveNewPlants.bind(this);
        this.searchPlants = this.searchPlants.bind(this);
        this.fetchPagePlants = this.fetchPagePlants.bind(this);
        this.onSelectChange = this.onSelectChange.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.createSortSelect = this.createSortSelect.bind(this);
    }

    // React Life Cycle
    componentDidMount(): void {
        this.handleSearchQuery();
    }

    componentDidUpdate(prevProps: Readonly<RouteComponentProps>, prevState: Readonly<IPlantListState>, snapshot?: any) {
        if (JSON.stringify(prevProps.location.search) !== JSON.stringify(this.props.location.search) || prevState.sort !== this.state.sort) {
            this.handleSearchQuery();
        }
    }

    // Search engine management
    private handleSearchQuery() {
        let search: string = this.props.location.search;
        this.setState({
            search: search,
        }, () => {
            this.searchPlants();
        });
    }

    private saveNewPlants(data: any) {
        let plantIds: number[] = data as number[];

        this.setState({
            plants: plantIds,
            currentPage: 1,
            totalPages: Math.trunc(plantIds.length / itemsPerPage) + (plantIds.length % itemsPerPage > 0 ? 1 : 0),
            isFetching: false,
            error: ""
        }, this.fetchPagePlants);
    }

    private searchPlants() {
        this.setState({ isFetching: true }, () => {
            let search: string = this.props.location.search;
            search += search === "" ? "?" : "&";
            search += "sort=" + this.state.sort;

            PlantService.searchPlantList(search)
                .then(data => {
                    let plantIds: number[] = data as number[];

                    this.saveNewPlants(plantIds);
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
                        plants.sort((a, b) => this.state.plants.indexOf(a.id) - this.state.plants.indexOf(b.id));

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
        else {
            this.setState({
                displayedPlants: []
            })
        }
    }

    private createSortSelect() {
        return <div className="form-group row col-5">
            <label className="form-label plant-list-search-sort-title col-7">
                Trier les plantes par:
            </label>
            <select className="form-control col-5 plant-list-search-select" value={this.state.sort} onChange={this.onSelectChange}>
                {
                    sortList.map((s, i) => <option key={i} value={s}>{sortNames[i]}</option>
                    )
                }
            </select>
        </div>

    }

    private onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;

        if (value !== this.state.sort) {
            this.setState({sort: value});
        }
    }

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
                    Les plantes
                </h1>
                <h2 className="plant-list-subtitle text-center">
                    Parcourez la liste des plantes et trouvez celle qui vont convient grâce à notre moteur de recherche
                </h2>
                <div className="row plant-list-make-search">
                    Recherchez votre plante idéale
                </div>
                <div className="row plant-list-bar">
                    <PlantSearchEngine prevSearch={this.state.search} createSortSelect={this.createSortSelect}/>
                </div>
                {
                    !this.state.isFetching &&
                    this.state.error === "" &&
                    <div className="row no-gutters plant-list-result">
                        <div className="col-7">
                            Résultat de la recherche: {this.state.plants.length} plantes
                        </div>
                        {this.createSortSelect()}
                    </div>
                }

                <div className="row plant-list-body">
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
