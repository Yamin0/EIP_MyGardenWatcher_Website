import * as React from "react";
import Pagination from "../shared/Pagination";
import {CarrotService} from "../../services/CarrotService";
import Carrot, {carrotInit} from "../../interfaces/Carrot";
import CarrotThumb from "./CarrotThumb";
import UserMenu from "../shared/UserMenu";
import AddCarrot from "./AddCarrot";
import EditCarrot from "./EditCarrot";
import DeleteCarrot from "./DeleteCarrot";
import {GatewayService} from "../../services/GatewayService";
import Gateway, {gatewayInit} from "../../interfaces/Gateway";
import GatewayList from "../gateways/GatewayList";
import AddGateway from "../gateways/AddGateway";
import EditGateway from "../gateways/EditGateway";
import DeleteGateway from "../gateways/DeleteGateway";

interface ICarrotListProps {
    disconnect(): void
}

interface ICarrotListState {
    currentPage: number,
    totalPages: number,
    isFetching: boolean,
    loading: boolean,
    error: string,
    success: boolean,
    successMsg: string,
    carrots: Carrot[],
    gateways: Gateway[],
    editCarrot: Carrot,
    editCarrotModalOpen: boolean,
    deleteCarrot: Carrot,
    deleteCarrotModalOpen: boolean
    editGateway: Gateway,
    editGatewayModalOpen: boolean,
    deleteGateway: Gateway,
    deleteGatewayModalOpen: boolean
}

const itemsPerPage: number = 6;

class CarrotList extends React.Component<ICarrotListProps, ICarrotListState> {
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
            gateways: [],
            editCarrot: carrotInit,
            editCarrotModalOpen: false,
            deleteCarrot: carrotInit,
            deleteCarrotModalOpen: false,
            editGateway: gatewayInit,
            editGatewayModalOpen: false,
            deleteGateway: gatewayInit,
            deleteGatewayModalOpen: false
        };

        this.fetchAllGateways = this.fetchAllGateways.bind(this);
        this.fetchAllCarrots = this.fetchAllCarrots.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.handleEditCarrotModalOpen = this.handleEditCarrotModalOpen.bind(this);
        this.handleEditCarrotModalClose = this.handleEditCarrotModalClose.bind(this);
        this.handleDeleteCarrotModalOpen = this.handleDeleteCarrotModalOpen.bind(this);
        this.handleDeleteCarrotModalClose = this.handleDeleteCarrotModalClose.bind(this);
        this.handleEditGatewayModalOpen = this.handleEditGatewayModalOpen.bind(this);
        this.handleEditGatewayModalClose = this.handleEditGatewayModalClose.bind(this);
        this.handleDeleteGatewayModalOpen = this.handleDeleteGatewayModalOpen.bind(this);
        this.handleDeleteGatewayModalClose = this.handleDeleteGatewayModalClose.bind(this);
        this.onSuccessForm = this.onSuccessForm.bind(this);
    }

    // Fetch gateways
    private fetchAllGateways(callback: () => void) {
        this.setState({ isFetching: true }, () => {
            GatewayService.fetchGatewayList()
                .then(data => {
                    let gateways: Gateway[] = data as Gateway[];
                    this.setState({
                        gateways: gateways,
                        isFetching: false,
                        error: ""
                    }, callback);
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    // Fetch carrots
    private fetchAllCarrots() {
        if (this.state.gateways.length > 0) {
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
    }

    //Pagination
    private onPageChange(e: React.MouseEvent, page: number) {
        e.preventDefault();
        this.setState({
            currentPage: page
        })
    }

    // Carrot modal handling
    private handleEditCarrotModalOpen(carrot: Carrot) {
        this.setState({editCarrot: carrot, editCarrotModalOpen: true});
    }

    private handleEditCarrotModalClose() {
        this.setState({editCarrotModalOpen: false});
    }

    private handleDeleteCarrotModalOpen(carrot: Carrot) {
        this.setState({deleteCarrot: carrot, deleteCarrotModalOpen: true});
    }

    private handleDeleteCarrotModalClose() {
        this.setState({deleteCarrotModalOpen: false});
    }

    // Gateway modal handling
    private handleEditGatewayModalOpen(gateway: Gateway) {
        this.setState({editGateway: gateway, editGatewayModalOpen: true});
    }

    private handleEditGatewayModalClose() {
        this.setState({editGatewayModalOpen: false});
    }

    private handleDeleteGatewayModalOpen(gateway: Gateway) {
        this.setState({deleteGateway: gateway, deleteGatewayModalOpen: true});
    }

    private handleDeleteGatewayModalClose() {
        this.setState({deleteGatewayModalOpen: false});
    }

    private onSuccessForm(msg: string) {
        this.setState({
            success: true,
            successMsg: msg
        }, () => {
            this.fetchAllGateways(this.fetchAllCarrots);
            setTimeout(() => {
                this.setState({success: false});
            }, 5000)
        });
    }

    componentDidMount() {
        this.fetchAllGateways(this.fetchAllCarrots);
    }

    render() {
        return (
            <div className="carrot-list container">
                <div className="row justify-content-end">
                    <h1 className="col-9 main-title orange text-center">
                        Mes carottes
                    </h1>
                </div>
                <div className="row">
                    <div className="col-3 row carrot-list-side">
                        <UserMenu disconnect={this.props.disconnect}/>
                        {
                            this.state.gateways && this.state.gateways.length > 0 &&
                            <GatewayList
                                gateways={this.state.gateways}
                                handleDeleteModalOpen={this.handleDeleteGatewayModalOpen}
                                handleEditModalOpen={this.handleEditGatewayModalOpen}
                            />
                        }
                        <div className="col-12">
                            <AddGateway onSuccessForm={this.onSuccessForm}/>
                        </div>
                    </div>
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

                        {
                            this.state.gateways && this.state.gateways.length > 0 &&
                            <div className="row justify-content-end carrot-list-bar">
                                <AddCarrot onSuccessForm={this.onSuccessForm} gateways={this.state.gateways}/>
                            </div>
                        }
                        {
                            this.state.gateways.length > 0 &&
                            <>
                                <EditGateway
                                    gateway={this.state.editGateway}
                                    onSuccessForm={this.onSuccessForm}
                                    show={this.state.editGatewayModalOpen}
                                    handleClose={this.handleEditGatewayModalClose}
                                />

                                <DeleteGateway
                                    gateway={this.state.deleteGateway}
                                    show={this.state.deleteGatewayModalOpen}
                                    handleClose={this.handleDeleteGatewayModalClose}
                                    onSuccessForm={this.onSuccessForm}
                                />
                            </>
                        }

                        {
                            this.state.carrots.length > 0 &&
                                <>
                                    <EditCarrot
                                        carrot={this.state.editCarrot}
                                        onSuccessForm={this.onSuccessForm}
                                        show={this.state.editCarrotModalOpen}
                                        handleClose={this.handleEditCarrotModalClose}
                                        gatewayName={this.state.gateways.find(g => g.id === this.state.editCarrot.gatewayId)?.serialCode || ""}
                                    />

                                    <DeleteCarrot
                                        carrot={this.state.deleteCarrot}
                                        show={this.state.deleteCarrotModalOpen}
                                        handleClose={this.handleDeleteCarrotModalClose}
                                        onSuccessForm={this.onSuccessForm}
                                    />
                                </>
                        }
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
                            this.state.gateways.length === 0 &&
                            <div className="row carrot-list-no-gateway">
                                <p className="col-12 text-justify">
                                    Vous n'avez pas encore de boîtier lié à votre compte.
                                    <br/>
                                    Un boîtier est nécessaire pour pouvoir ajouter et gérer vos carottes.
                                    <br/>
                                    <br/>
                                    Si vous branchez votre boîtier à une connexion Internet filaire (par câble réseau), vous pouvez ajouter un boîtier à votre compte via notre site Internet, en cliquant sur le bouton
                                     "Ajouter une boîtier" sur la gauche, sous le menu de navigation de l'espace client.
                                    <br/>
                                    <br/>
                                    Si vous souhaitez connecter votre boîtier en Wifi, vous devrez utiliser l'application mobile pour le configurer.
                                    <br/>
                                    Vous pouvez télécharger l'application mobile en cliquant sur le bouton ci-dessous ou en scannant le QR code.
                                </p>
                                <div className="col-md-12 text-center">
                                    <a
                                        className="btn btn-green carrot-list-no-gateway-download-btn"
                                        href="http://www.mygardenwatcher.fr:3001/file/apk"
                                    >
                                        Télécharger l'application mobile
                                        <span className="oi oi-data-transfer-download"/>
                                    </a>
                                    <img src="/images/qrcode-app-dl.png" className="carrot-list-no-gateway-download-qrcode img-fluid" alt="QR Code"/>
                                </div>
                            </div>

                        }

                        {
                            !this.state.isFetching &&
                            this.state.error === "" &&
                            this.state.gateways.length > 0 &&
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
                                    this.handleEditCarrotModalOpen(carrot);
                                };

                                const mapDeleteModal = () => {
                                    this.handleDeleteCarrotModalOpen(carrot);
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
