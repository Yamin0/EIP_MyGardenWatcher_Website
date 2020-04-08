import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant, {plantInit} from "../../interfaces/Plant";
import {RouteComponentProps, withRouter} from "react-router-dom";

interface RouteInfo {
    id: string,
    name: string
}

interface IPlantDetailProps extends RouteComponentProps<RouteInfo> {
    checkToken(): void
}

interface IPlantDetailState {
    plant: Plant,
    isFetching: boolean,
    error: string
}

class PlantDetail extends React.Component<IPlantDetailProps, IPlantDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            plant: plantInit,
            isFetching: false,
            error: ""
        };
    }

    componentDidMount(): void {
        console.log(this.props.match.params.id);
        this.fetchPlant(parseInt(this.props.match.params.id));
    }

    private fetchPlant(id: number) {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantDetail(id)
                .then(data => {
                    this.setState({
                        plant: data as Plant,
                        isFetching: false,
                        error: ""
                    });
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    render() {

        const {plant} = this.state;

        return (
                this.state.isFetching ?
                    <div className="container">
                        <div className="row">
                            <p className="plant-detail-fetching">Chargement des informations...</p>

                        </div>
                    </div>
                    :
                    this.state.error !== "" ?
                        <div className="form">
                            <div className="error">
                                <span className="oi oi-warning"/>
                                {this.state.error}
                            </div>
                        </div>
                        :
                        <div className="plant-detail container">

                        <h1 className="main-title text-center">
                            {plant.name}
                        </h1>

                        <div className="row">
                            <div className="col-9 plant-detail-visual">
                                <img src={plant.image} alt={plant.name} className="plant-detail-img"/>
                            </div>

                            <div className="col-3 plant-detail-data">
                                <div className="plant-detail-data-thumb">
                                    <img className="plant-detail-icon" src="/images/icons/icon-temperature.png" alt="temperature"/>
                                    {plant.minTemp}° à {plant.maxTemp}°
                                </div>
                                <div className="plant-detail-data-thumb">
                                    <img className="plant-detail-icon" src="/images/icons/icon-humidity.png" alt="humidité"/>
                                    {plant.humidity}%
                                </div>
                                <div className="plant-detail-data-thumb">
                                    <img className="plant-detail-icon" src="/images/icons/icon-light.png" alt="luminosité"/>
                                    {plant.light}
                                </div>
                                <div className="plant-detail-more">
                                    <a href={plant.link} target="_blank" rel="noopener noreferrer" className="plant-detail-link">En savoir plus <span className="oi oi-external-link"/></a>
                                </div>
                            </div>
                        </div>

                        <div className="col-12 plant-detail-text">
                            <h3 className="plant-detail-subtitle green">Description</h3>
                            <p>{plant.description}</p>
                        </div>
                        <div className="border-carrot"/>
                        <div className="col-12 plant-detail-text left">
                            <h3 className="plant-detail-subtitle orange">Caractéristiques</h3>
                            <p>{plant.caracteristics}</p>
                        </div>
                    </div>
        )
    }
}

export default withRouter(PlantDetail);
