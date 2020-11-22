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
import Gateway from "../../interfaces/Gateway";
import GatewayList from "./GatewayList";

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
    editModalOpen: boolean,
    deleteCarrot: Carrot,
    deleteModalOpen: boolean
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
            editModalOpen: false,
            deleteCarrot: carrotInit,
            deleteModalOpen: false
        };

        this.fetchAllGateways = this.fetchAllGateways.bind(this);
        this.firstGateway = this.firstGateway.bind(this);
        this.fetchAllCarrots = this.fetchAllCarrots.bind(this);
        this.onPageChange = this.onPageChange.bind(this);
        this.handleEditModalOpen = this.handleEditModalOpen.bind(this);
        this.handleEditModalClose = this.handleEditModalClose.bind(this);
        this.handleDeleteModalOpen = this.handleDeleteModalOpen.bind(this);
        this.handleDeleteModalClose = this.handleDeleteModalClose.bind(this);
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

    private firstGateway() {
        GatewayService.createGateway("test", "gdfcdxdvf")
            .then(data => {
                let gateway: Gateway = data as Gateway;
                this.setState({
                    gateways: [gateway],
                    isFetching: false,
                    error: ""
                });
                }, error => {
                this.setState({ error: error.toString(), isFetching: false })
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
                            <GatewayList gateways={this.state.gateways}/>
                        }
                        {
                            this.state.gateways.length === 0 &&
                            process.env.NODE_ENV === 'development' &&
                                <button onClick={this.firstGateway}>
                                    Créer un gateway
                                </button>
                        }
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
                            this.state.carrots.length > 0 &&
                                <>
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
                                <p className="col-12 text-center">
                                    Vous n'avez pas encore de boîtier lié à votre compte. Un boîtier est nécessaire pour pouvoir ajouter et gérer vos carottes.
                                    Vous ne pouvez pas configurer de boîtier sur le site Web. Pour cela, vous devez télécharger l'application mobile.
                                    <br/>
                                    <br/>
                                    Vous pouvez la télécharger en cliquant sur le bouton ci-dessous ou en scannant le QR code.
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
