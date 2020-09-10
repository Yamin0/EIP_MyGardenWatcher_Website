import * as React from "react";
import Carrot from "../../interfaces/Carrot";
import {CarrotService} from "../../services/CarrotService";
import {PlantService} from "../../services/PlantService";

interface ICarrotThumbProps {
    carrot: Carrot,
    updateEditId(): void
}

interface ICarrotThumbState {
    carrot: Carrot,
    toggled: boolean,
    isFetching: boolean,
    loading: boolean,
    error: string,
}

class CarrotThumb extends React.Component<ICarrotThumbProps, ICarrotThumbState> {
    constructor(props: any) {
        super(props);

        this.state = {
            carrot: this.props.carrot,
            toggled: false,
            isFetching: false,
            loading: false,
            error: ""
        };

        this.fetchCarrotDetail = this.fetchCarrotDetail.bind(this);
        this.handleDeleteCarrot = this.handleDeleteCarrot.bind(this);
        this.togglePlants = this.togglePlants.bind(this);
        this.handleDeletePlantLink = this.handleDeletePlantLink.bind(this);
    }

    private fetchCarrotDetail() {
        this.setState({ isFetching: true }, () => {
            CarrotService.fetchCarrotDetail(this.state.carrot.id)
                .then(data => {
                    const carrot: Carrot = data as Carrot;

                    this.setState({
                        carrot,
                        isFetching: false
                    });
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    private togglePlants() {
        this.setState((state) => ({
            ...state,
            toggled: !state.toggled
        }), () => {
            if (this.state.toggled)
                this.fetchCarrotDetail();
        });
    }

    private handleDeletePlantLink(e: React.MouseEvent<HTMLButtonElement>, plantId: number) {
        e.preventDefault();
        this.setState({loading: true});
        PlantService.deletePlantFromCarrot(this.state.carrot.id, plantId)
            .then(
                () => {
                    this.setState({loading: false}, this.fetchCarrotDetail);
                },
                error => {
                    this.setState({error: error.toString(), loading: false});
                }
            )
    }

    private handleDeleteCarrot(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({loading: true});
        CarrotService.deleteCarrot(this.state.carrot.id)
            .then(
                () => {
                    window.location.reload();
                },
                error => {
                    this.setState({error: error.toString(), loading: false});
                }
            )
    }

    render() {
        return (
            <div className="col-4 carrot-thumb">
                <div className="carrot-thumb-wrapper">
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
                        this.state.loading &&
                        <div className="form-loading d-flex align-items-center justify-content-center position-absolute">
                            <div className="spinner-border text-light" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    }

                    <h3 className="text-center carrot-thumb-title">
                        <img src="/images/logos/mgw-carrot-classic.png" className="img-fluid carrot-thumb-img" alt=""/>
                        {this.state.carrot.name}
                    </h3>
                    <div className="row no-gutters carrot-thumb-sensor-data">
                        <div className="col-5 text-right carrot-thumb-sensor-data-name">
                            <img className="plant-list-thumb-icon" src="/images/icons/icon-temperature.png" alt="temperature"/>
                        </div>
                        <div className="col-5 carrot-thumb-sensor-data-value">
                            20°
                        </div>
                        <div className="col-5 text-right carrot-thumb-sensor-data-name">
                            <img className="plant-list-thumb-icon" src="/images/icons/icon-humidity.png" alt="humidité"/>
                        </div>
                        <div className="col-5 carrot-thumb-sensor-data-value">
                            50%
                        </div>
                        <div className="col-5 text-right carrot-thumb-sensor-data-name">
                            <img className="plant-list-thumb-icon" src="/images/icons/light/full.png" alt="luminosité"/>
                        </div>
                        <div className="col-5 carrot-thumb-sensor-data-value">
                            1lx
                        </div>
                    </div>

                    <div className="row">
                        <button
                            type="button"
                            onClick={this.togglePlants}
                            className="btn carrot-thumb-toggle col-12"
                        >
                            {this.state.toggled ? "Masquer les plantes liées" : "Voir les plantes liées"}
                            <span className={"oi oi-chevron-" + (this.state.toggled ? "top" : "bottom")}/>
                        </button>

                        {
                            this.state.isFetching &&
                            <p className="text-center">Récupération des données...</p>
                        }

                        {
                            this.state.toggled &&
                                <div>
                                    {
                                        !this.state.isFetching &&
                                        (this.state.carrot.plants &&
                                        this.state.carrot.plants.length > 0 ?
                                            this.state.carrot.plants.map(p => {

                                                const handleDeleteId = (e: React.MouseEvent<HTMLButtonElement>) => this.handleDeletePlantLink(e, p.id)

                                                return (
                                                    <div>
                                                        {p.name}
                                                        <button type="button" className="btn carrot-thumb-btn-delete-plant" onClick={handleDeleteId}>
                                                            <span className="oi oi-trash"/>
                                                        </button>
                                                    </div>
                                                )}) :
                                            "No data")
                                    }
                                </div>
                        }

                    </div>

                    <div className="row carrot-thumb-btns">
                        <button
                            type="button"
                            className="btn btn-green carrot-thumb-btn-edit"
                            data-toggle="modal"
                            data-target="#editCarrotModal"
                            onClick={this.props.updateEditId}
                        >
                            <span className="oi oi-pencil"/>
                        </button>
                        <button type="button" className="btn btn-orange carrot-thumb-btn-delete" onClick={this.handleDeleteCarrot}>
                            <span className="oi oi-trash"/>
                        </button>
                    </div>
                </div>
            </div>
        )

    }
}

export default CarrotThumb;
