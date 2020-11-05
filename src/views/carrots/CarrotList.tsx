import * as React from "react";
import Pagination from "../shared/Pagination";
import {CarrotService} from "../../services/CarrotService";
import Carrot, {carrotInit} from "../../interfaces/Carrot";
import CarrotThumb from "./CarrotThumb";
import UserMenu from "../shared/UserMenu";
import AddCarrot from "./AddCarrot";
import EditCarrot from "./EditCarrot";
import DeleteCarrot from "./DeleteCarrot";

interface IPlantListProps {
    disconnect(): void
}

interface IPlantListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    loading: boolean,
    error: string,
    success: boolean,
    successMsg: string,
    carrots: Carrot[],
    editCarrot: Carrot,
    editModalOpen: boolean,
    deleteCarrot: Carrot,
    deleteModalOpen: boolean
}

const itemsPerPage: number = 6;

class CarrotList extends React.Component<IPlantListProps, IPlantListState> {
    constructor(props: any) {
        super(props);

        this.state = {
            currentPage: 1,
            totalPages: 1,
            isFetching: false,
            loading: false,
            error: "",
            success: false,
            successMsg: "",
            carrots: [],
            editCarrot: carrotInit,
            editModalOpen: false,
            deleteCarrot: carrotInit,
            deleteModalOpen: false
        };

        this.fetchAllCarrots = this.fetchAllCarrots.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.handleEditModalOpen = this.handleEditModalOpen.bind(this);
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
        this.handleDeleteModalOpen = this.handleDeleteModalOpen.bind(this);
        this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
        this.onSuccessForm = this.onSuccessForm.bind(this);
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

    private handleEditModalOpen(carrot: Carrot) {
        this.setState({editCarrot: carrot, editModalOpen: true});
    }

    private handleEditModalClose() {
        this.setState({editModalOpen: false});
    }

    private handleDeleteModalOpen(carrot: Carrot) {
        this.setState({deleteCarrot: carrot, deleteModalOpen: true});
    }

    private handleDeleteModalClose() {
        this.setState({deleteModalOpen: false});
    }

    private onSuccessForm(msg: string) {
        this.setState({
            success: true,
            successMsg: msg
        }, () => {
            this.fetchAllCarrots();
            setTimeout(() => {
                this.setState({success: false});
            }, 5000)
        });
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
                <div className="row">
                    <UserMenu disconnect={this.props.disconnect}/>
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

                        {
                            this.state.success &&
                            <div className="form row">
                                <div className="success col-12">
                                    {this.state.successMsg}
                                    <span className="oi oi-thumb-up"/>
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

                            <AddCarrot onSuccessForm={this.onSuccessForm}/>
                        </div>

                        <EditCarrot
                            carrot={this.state.editCarrot}
                            onSuccessForm={this.onSuccessForm}
                            show={this.state.editModalOpen}
                            handleClose={this.handleEditModalClose}
                        />

                        <DeleteCarrot
                            carrot={this.state.deleteCarrot}
                            show={this.state.deleteModalOpen}
                            handleClose={this.handleDeleteModalClose}
                            onSuccessForm={this.onSuccessForm}
                        />

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
                                    <br/>
                                    <br/>
                                    Cliquez sur le bouton "Ajouter une carotte" qui est juste au dessus !
                                </p>
                            </div>
                        }

                        {
                            !this.state.isFetching
                            && this.state.error === ""
                            &&
                            <div className="row carrot-list-thumbs">
                                {this.state.carrots.map((carrot, i) => {
                                const minCarrotIndex: number = itemsPerPage * (this.state.currentPage - 1);

                                const mapEditModal = () => {
                                    this.handleEditModalOpen(carrot);
                                };

                                const mapDeleteModal = () => {
                                    this.handleDeleteModalOpen(carrot);
                                };

                                return (
                                    i >= minCarrotIndex &&
                                    i < minCarrotIndex + itemsPerPage ?
                                        <CarrotThumb
                                            key={i}
                                            carrot={carrot}
                                            openEditModal={mapEditModal}
                                            openDeleteModal={mapDeleteModal}
                                        />
                                        : null)
                            })}
                            </div>
                        }
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
                    </div>
                </div>
            </div>
        )
    }
}

export default CarrotList;
