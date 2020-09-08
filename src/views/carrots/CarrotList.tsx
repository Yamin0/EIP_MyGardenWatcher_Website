import * as React from "react";
import { RouteComponentProps, withRouter} from "react-router-dom";
import Pagination from "../shared/Pagination";
import ESortType, {getSortAttrName} from "../../interfaces/Sort";
import {CarrotService} from "../../services/CarrotService";
import Carrot from "../../interfaces/Carrot";
import CarrotThumb from "./CarrotThumb";
import UserMenu from "../shared/UserMenu";

interface IPlantListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    error: string,
    carrots: Carrot[],
    sort: ESortType,
}

const itemsPerPage: number = 6;

class CarrotList extends React.Component<RouteComponentProps, IPlantListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1,
            isFetching: false,
            error: "",
            carrots: [],
            sort: ESortType.NAME_ASC,
        };

        this.fetchAllCarrots = this.fetchAllCarrots.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
    }

    // Fetch carrots
    private fetchAllCarrots() {
        this.setState({ isFetching: true }, () => {
            CarrotService.fetchCarrotList()
                .then(data => {
                    console.log(data);
                    let carrots: Carrot[] = data as Carrot[];

//                    plants = PlantService.sortPlantList(plants, this.state.sort);

                    this.setState({
                        carrots: carrots,
                        currentPage: 1,
                        totalPages: Math.trunc(carrots.length / itemsPerPage) + (carrots.length % itemsPerPage > 0 ? 1 : 0),
                        isFetching: false,
                        error: ""
                    });
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    // Sort management
/*    private createSortSelect() {
        return <div className="plant-list-search-sort col-5">
            Trier par:
            <select className="plant-list-search-select" value={this.state.sort} onChange={this.onSelectChange}>
                <option value={ESortType.NAME_ASC}>Nom croissant</option>
                <option value={ESortType.NAME_DESC}>Nom décroissant</option>
                <option value={ESortType.TYPE_ASC}>Nombre de plantes croissant</option>
                <option value={ESortType.TYPE_DESC}>Nombre de plantes croissant</option>
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
    }*/

    //Pagination
    private onPageChange(e: React.MouseEvent, page: number) {
        e.preventDefault();
        this.setState({
            currentPage: page
        })
    }

    componentDidMount() {
        this.fetchAllCarrots();
    }

    render() {
        return (
            <div className="plant-list container">
                <h1 className="main-title text-center">
                    Mes carottes
                </h1>
                <UserMenu/>

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
                        this.state.carrots.length === 0 &&
                        <p>Vous n'avez pas encore de carotte connectée à votre compte.
                        <br/>
                        Vous souhaitez en rajouter une ?
                            <button>Cliquez ici !</button>
                        </p>
                    }

                    {
                        !this.state.isFetching
                        && this.state.error === ""
                        && this.state.carrots.map((carrot, i) =>
                            i >= this.state.currentPage * (itemsPerPage - 1) &&
                            i < this.state.currentPage * itemsPerPage ?
                            <CarrotThumb key={i.toString()} carrot={carrot}/> : null)
                    }
                </div>

                {
                    !this.state.isFetching && this.state.totalPages > 1 &&
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

                <div className="row">
                    <p>Cette page est en cours de réalisation.</p>
                </div>
            </div>
        )
    }
}

export default withRouter(CarrotList);
