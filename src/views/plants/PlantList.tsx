import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant from "../../interfaces/Plant";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface RouteInfo {
    pageNumber: string;
}

interface IPlantListProps extends RouteComponentProps<RouteInfo> {
    checkToken(): void
}

interface IPlantListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    plants: Plant[],
    filteredPlants: Plant[],
    sort: string,
    search: string
}

class PlantList extends React.Component<IPlantListProps, IPlantListState> {
    constructor(props: any) {
        super(props);
        this.state = {
            currentPage: 1,
            totalPages: 0,
            isFetching: false,
            plants: [],
            filteredPlants: [],
            sort: "alpha_asc",
            search: ""
        };
        this.onSelectChange = this.onSelectChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    componentDidMount(): void {
        if (this.props.match.params.pageNumber) {
            this.setState({
                currentPage: parseInt(this.props.match.params.pageNumber)
            })
        }
        this.props.checkToken();
        this.fetchPlants();
    }

    private fetchPlants() {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantList().then(data => {
                let sortedData: Plant[] = (data as Plant[]).sort((a, b) => a.name.localeCompare(b.name));
                this.setState({
                    plants: sortedData,
                    filteredPlants: sortedData,
                    totalPages: Math.trunc(sortedData.length / 9) + (sortedData.length % 9 > 0 ? 1 : 0),
                    isFetching: false
                });
            });
        });
    }

    private onSelectChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = e.target.value;

        if (value !== this.state.sort) {
            let sortedList: Plant[] = this.state.plants.sort((a, b) => a.name.localeCompare(b.name));
            if (value === "alpha_desc")
                sortedList = sortedList.reverse();

            let filteredSortedList: Plant[] = this.state.filteredPlants.sort((a, b) => a.name.localeCompare(b.name));
            if (value === "alpha_desc")
                filteredSortedList = filteredSortedList.reverse();

            this.setState({
                sort: e.target.value,
                plants: sortedList,
                filteredPlants: filteredSortedList
            });
        }
    }

    private handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
        const searchString: string = e.target.value;
        let filteredData: Plant[] = [ ...this.state.plants ];

        filteredData = filteredData.filter((plant) => plant.name.toLowerCase().indexOf(searchString) !== -1);
        this.setState({
            search: searchString,
            filteredPlants: filteredData
        });
    }

    private createPagination() {
        let pages: React.ReactNode[] = [];

        for (let i = 1; i <= this.state.totalPages; i++) {
            pages.push(i === this.state.currentPage ?
                <li className="page-item active" key={i.toString()}>
                    <span className="page-link">
                        {i}
                        <span className="sr-only">(current)</span>
                    </span>
                </li>
                :
                <li className="page-item" key={i.toString()}><a className="page-link" href={"/plants/" + i}>{i}</a></li>)
        }

        return pages
    }

    private paginatePlants() {
        const minPlantId: number = 9 * (this.state.currentPage - 1);

        const paginatedPlants: Plant[] = this.state.filteredPlants.slice(minPlantId, minPlantId + 9);

        return paginatedPlants;
    }

    render() {
        return (
            <div className="plant-list container">
                <h1 className="main-title orange text-center">
                    Nos plantes
                </h1>
                <div className="row plant-list-bar justify-content-between">
                    <div className="col-5 plant-list-search row">
                        <label htmlFor="search" className="col-form-label col-md-4">
                            Rechercher
                        </label>
                        <input
                            className="form-control plant-list-search-input col-md-8"
                            type="text"
                            name="search"
                            id="search"
                            value={this.state.search}
                            onChange={this.handleSearch}
                        />
                    </div>
                    <div className="col-2">
                        Trier par:
                        <select className="plant-list-search-select" value={this.state.sort} onChange={this.onSelectChange}>
                            <option value="alpha_asc">Nom croissant</option>
                            <option value="alpha_desc">Nom décroissant</option>
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
                        this.paginatePlants().map((plant, id) =>
                            id < 9 ?
                            <div className="col-4 plant-list-thumb" key={plant.id}>
                                <h3 className="text-center plant-list-thumb-title">
                                    {plant.name}
                                </h3>
                                <a className="plant-list-thumb-link" href={plant.link}>
                                    <img src={plant.image} alt={plant.name} className="plant-list-thumb-img"/>
                                </a>

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
                            </div>:"")
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
                                        <a className="page-link" href={"/plants/" + (this.state.currentPage - 1)} aria-label="Previous">
                                            <span aria-hidden="true">&laquo;</span>
                                            <span className="sr-only">Previous</span>
                                        </a>
                                    </li>
                                }

                                {this.createPagination()}

                                {
                                    this.state.currentPage !== this.state.totalPages &&
                                    <li className="page-item">
                                        <a className="page-link" href={"/plants/" + (this.state.currentPage + 1)} aria-label="Next">
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
