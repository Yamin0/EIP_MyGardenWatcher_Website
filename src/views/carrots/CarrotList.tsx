import * as React from "react";
import { RouteComponentProps, withRouter} from "react-router-dom";
import Pagination from "../shared/Pagination";
import ESortType from "../../interfaces/Sort";
import {CarrotService} from "../../services/CarrotService";
import Carrot, {carrotInit} from "../../interfaces/Carrot";
import CarrotThumb from "./CarrotThumb";
import UserMenu from "../shared/UserMenu";
import AddCarrot from "./AddCarrot";
import EditCarrot from "./EditCarrot";

interface IPlantListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    loading: boolean,
    error: string,
    carrots: Carrot[],
    editCarrot: Carrot,
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
            loading: false,
            error: "",
            carrots: [],
            editCarrot: carrotInit,
            sort: ESortType.NAME_ASC,
        };

        this.fetchAllCarrots = this.fetchAllCarrots.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.updateEditId = this.updateEditId.bind(this);
    }

    // Fetch carrots
    private fetchAllCarrots() {
        this.setState({ isFetching: true }, () => {
            CarrotService.fetchCarrotList()
                .then(data => {
                    let carrots: Carrot[] = data as Carrot[];

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

    //Pagination
    private onPageChange(e: React.MouseEvent, page: number) {
        e.preventDefault();
        this.setState({
            currentPage: page
        })
    }

    private updateEditId(carrot: Carrot) {
        this.setState({editCarrot: carrot});
    }

    componentDidMount() {
        this.fetchAllCarrots();
    }

    render() {
        return (
            <div className="carrot-list container">
                <h1 className="main-title orange text-center">
                    Mes carottes
                </h1>
                <UserMenu/>
                <div className="row">
                    <div className="col-9">
                        {
                            this.state.error !== "" &&
                            <div className="form row carrot-list-error">
                                <div className="error col-12">
                                    <span className="oi oi-warning"/>
                                    {this.state.error}
                                </div>
                            </div>
                        }

                        <div className="row justify-content-between carrot-list-bar">
                            <div className="col-5 row">
                                <label className="col-4">Filtrer</label>
                                <select className="col-8">
                                    <option>Non fonctionnel</option>
                                    <option>Nom croissant</option>
                                    <option>Nom décroissant</option>
                                </select>
                            </div>

                            <button
                                type="button"
                                className="btn btn-green col-3"
                                data-toggle="modal"
                                data-target="#addCarrotModal"
                            >
                                Ajouter une carotte
                            </button>

                        </div>

                        <AddCarrot/>
                        <EditCarrot carrot={this.state.editCarrot}/>

                        {
                            this.state.isFetching &&
                            <p className="text-center">Récupération des données...</p>
                        }

                        {
                            this.state.loading &&
                            <div className="form-loading d-flex align-items-center justify-content-center position-absolute">
                                <div className="spinner-border text-light" role="status">
                                    <span className="sr-only">Loading...</span>
                                </div>
                            </div>
                        }

                        {
                            !this.state.isFetching &&
                            this.state.error === "" &&
                            this.state.carrots.length === 0 &&
                            <div className="row carrot-list-empty">
                                <p className="col-12 text-center">
                                    Vous n'avez pas encore de carotte connectée à votre compte.
                                    <br/>
                                    Vous souhaitez en rajouter une ?
                                </p>
                                <div className="col-12 text-center">
                                    <button
                                        type="button"
                                        className="btn btn-orange"
                                        data-toggle="modal"
                                        data-target="#addCarrotModal"
                                    >
                                        Cliquez ici !
                                    </button>
                                </div>
                            </div>
                        }

                        {
                            !this.state.isFetching
                            && this.state.error === ""
                            &&
                            <div className="row carrot-list-thumbs">
                                {this.state.carrots.map((carrot, i) => {
                                const minCarrotIndex: number = itemsPerPage * (this.state.currentPage - 1);

                                const updateEditIdMapped = () => {
                                    this.updateEditId(carrot);
                                };

                                return (
                                    i >= minCarrotIndex &&
                                    i < minCarrotIndex + itemsPerPage ?
                                        <CarrotThumb key={i} carrot={carrot} updateEditId={updateEditIdMapped}/> : null)
                            })}
                            </div>
                        }
                    </div>

                    {
                        !this.state.isFetching && this.state.totalPages > 1 &&
                        <div className="col-9 row">
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
            </div>
        )
    }
}

export default withRouter(CarrotList);
