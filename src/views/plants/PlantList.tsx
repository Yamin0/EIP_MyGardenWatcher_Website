import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant from "../../interfaces/Plant";

interface IPlantListProps {
    checkToken(): void
}

interface IPlantListState {
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
        this.props.checkToken();
        this.fetchUsers();
    }

    private fetchUsers() {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantList().then(data => {
                let sortedData: Plant[] = (data as Plant[]).sort((a, b) => a.name.localeCompare(b.name));
                this.setState({
                    plants: sortedData,
                    filteredPlants: sortedData,
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

            this.setState({
                sort: e.target.value,
                plants: sortedList
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

    render() {

        console.log(this.state.plants);
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
                        this.state.filteredPlants.map((plant) =>
                            <div className="col-3 plant-list-thumb" key={plant.id}>
                                <h3 className="text-center plant-list-thumb-title">
                                    {plant.name}
                                </h3>
                                <img src={plant.img} alt={plant.name} className="img-thumbnail plant-list-thumb-img"/>
                                <span className="float-left">Température: {plant.temperature}</span>
                                <span className="float-right">Humidité: {plant.humidity}</span>
                            </div>)
                    }
                </div>
            </div>
        )
    }
}

export default PlantList;
