import * as React from "react";
import Carrot from "../../interfaces/Carrot";
import {CarrotService} from "../../services/CarrotService";
import {PlantService} from "../../services/PlantService";
import {OverlayTrigger, Popover} from "react-bootstrap";
import SensorData, {sensorDataInit} from "../../interfaces/SensorData";

interface ICarrotThumbProps {
    carrot: Carrot,
    openEditModal(): void,
    openDeleteModal(): void
}

interface ICarrotThumbState {
    carrot: Carrot,
    sensorData: SensorData[],
    status: string,
    toggled: boolean,
    hasPlants: boolean,
    isFetching: boolean,
    loading: boolean,
    error: string,
}

class CarrotThumb extends React.Component<ICarrotThumbProps, ICarrotThumbState> {
    constructor(props: any) {
        super(props);

        this.state = {
            carrot: this.props.carrot,
            sensorData: [sensorDataInit],
            status: "",
            toggled: false,
            hasPlants: false,
            isFetching: false,
            loading: false,
            error: ""
        };

        this.fetchCarrotDetail = this.fetchCarrotDetail.bind(this);
        this.fetchSensorData = this.fetchSensorData.bind(this);
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
                        hasPlants: carrot.plants && carrot.plants.length > 0,
                        isFetching: false
                    }, this.fetchSensorData);
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    private fetchSensorData() {
        this.setState({ isFetching: true }, () => {
            CarrotService.sensorData(this.state.carrot.id)
                .then(data => {
                    let sensorData: SensorData[] = data as SensorData[];
                    if (sensorData.length === 0) sensorData = [sensorDataInit];

                    this.setState({
                        sensorData: sensorData,
                        isFetching: false
                    });
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    private aliveCarrot() {
        CarrotService.aliveCarrot(this.props.carrot.gatewayId, this.props.carrot.id).then(data => {
            this.setState({
                status: data.state
            })
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

    componentDidMount() {
        this.fetchCarrotDetail();
        this.aliveCarrot();
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
                        <span className="carrot-thumb-name">
                            {this.state.carrot.name}
                        </span>
                        {
                            this.state.status !== "" &&
                            <div className={"carrot-thumb-circle " + this.state.status}/>
                        }
                        {
                            this.state.status === "" &&
                            <div className="carrot-thumb-spinner spinner-border text-dark" role="status">
                                <span className="sr-only">Loading...</span>
                            </div>
                        }
                    </h3>
                    <div className="row no-gutters carrot-thumb-sensor-data">
                        <div className="col-5 text-right carrot-thumb-sensor-data-name">
                            <img className="plant-list-thumb-icon" src="/images/icons/icon-temperature.png" alt="temperature"/>
                        </div>
                        <div className="col-5 carrot-thumb-sensor-data-value">
                            {this.state.sensorData[0].temperature}°
                        </div>
                        <div className="col-5 text-right carrot-thumb-sensor-data-name">
                            <img className="plant-list-thumb-icon" src="/images/icons/icon-humidity.png" alt="humidité"/>
                        </div>
                        <div className="col-5 carrot-thumb-sensor-data-value">
                            {this.state.sensorData[0].humidity}%
                        </div>
                        <div className="col-5 text-right carrot-thumb-sensor-data-name">
                            <img className="plant-list-thumb-icon" src="/images/icons/light/full.png" alt="luminosité"/>
                        </div>
                        <div className="col-5 carrot-thumb-sensor-data-value">
                            {this.state.sensorData[0].luminosity}lx
                        </div>
                    </div>

                    {
                        this.state.hasPlants ?
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
                                this.state.isFetching && this.state.toggled &&
                                <p className="text-center">Récupération des données...</p>
                            }

                            {
                                this.state.toggled &&
                                <div className="carrot-thumb-plant-list">
                                    {
                                        !this.state.isFetching &&
                                        (this.state.carrot.plants &&
                                        this.state.carrot.plants.length > 0 ?
                                            this.state.carrot.plants.map(p => {

                                                const handleDeleteId = (e: React.MouseEvent<HTMLButtonElement>) => this.handleDeletePlantLink(e, p.id)

                                                return (
                                                    <div className="row no-gutters" key={p.id}>
                                                        <div className="col-12 text-center">
                                                            {p.name}
                                                            <button type="button" className="btn carrot-thumb-btn-delete-plant" onClick={handleDeleteId}>
                                                                <span className="oi oi-trash"/>
                                                            </button>
                                                        </div>
                                                        <div className="col-5 text-center">
                                                            <img className="carrot-thumb-icon" src="/images/icons/icon-temperature.png" alt="temperature"/>
                                                        </div>
                                                        <div className="col-5">
                                                            {p.minTemp}° à {p.maxTemp}°
                                                        </div>
                                                        <div className="col-5 text-center">
                                                            <img className="plant-list-thumb-icon" src="/images/icons/icon-humidity.png" alt="humidité"/>
                                                        </div>
                                                        <div className="col-5">
                                                            {p.humidity}%
                                                        </div>
                                                        <div className="col-5 text-center">
                                                            <img className="plant-list-thumb-icon" src="/images/icons/light/full.png" alt="luminosité"/>
                                                        </div>
                                                        <div className="col-5">
                                                            {p.light}
                                                        </div>
                                                    </div>
                                                )}) :
                                            "No data")
                                    }
                                </div>
                            }

                        </div>
                            :
                            <div className="row">
                                <p className="text-center carrot-thumb-no-plant">
                                    Vous n'avez pas encore de plante liée à cette carotte.
                                </p>
                                <OverlayTrigger
                                    trigger="click"
                                    placement={"right"}
                                    overlay={
                                        <Popover id="popover-basic">
                                            <Popover.Title>
                                                Comment lier une plante à ma carotte ?
                                            </Popover.Title>
                                            <Popover.Content>
                                                Vous devez d'abord trouver la plante qui vous intéresse. Vous pouvez la rechercher sur <a href="/plants"> la page des plantes</a>.
                                                <br/>
                                                <br/>
                                                Cliquez sur la plante qui vous intéresse pour accéder à sa page détail. Sur la droite de cette page, il y aura un bouton pour lier votre plante à une carotte.
                                            </Popover.Content>
                                        </Popover>
                                    }
                                >
                                    <p className="tooltip-btn">?</p>
                                </OverlayTrigger>
                            </div>
                    }

                    <div className="row carrot-thumb-btns">
                        <button
                            type="button"
                            className="btn btn-green carrot-thumb-btn-edit"
                            onClick={this.props.openEditModal}
                        >
                            <span className="oi oi-pencil"/>
                        </button>
                        <button
                            type="button"
                            className="btn btn-orange carrot-thumb-btn-delete"
                            onClick={this.props.openDeleteModal}
                        >
                            <span className="oi oi-trash"/>
                        </button>
                    </div>
                </div>
            </div>
        )

    }
}

export default CarrotThumb;
