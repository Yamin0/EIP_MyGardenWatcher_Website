import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant, {plantInit} from "../../interfaces/Plant";
import {RouteComponentProps, withRouter} from "react-router-dom";
import PlantLink from "./PlantLink";
import {humidityRanges, lightFrenchNames, lightIconNames, tempRanges} from "../../interfaces/Search";

interface RouteInfo {
    id: string,
    name: string
}

interface IPlantDetailProps extends RouteComponentProps<RouteInfo> {
    isAuthenticated: boolean
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
            error: "lol"
        };
    }

    componentDidMount(): void {
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
                        <div className="plant-detail container">
                            <div className="form">
                                <div className="error">
                                    <span className="oi oi-warning"/>
                                    {this.state.error}
                                </div>
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
                                    {
                                        tempRanges.map((range, idx) => {
                                            if (plant.minTemp >= range[0] && plant.minTemp <= range[1])
                                                return <img
                                                    key={idx.toString()}
                                                    className="plant-detail-icon"
                                                    title={"minimum " + plant.minTemp + "°"}
                                                    src={"/images/icons/temperature/" + (idx + 1).toString() + ".png"}
                                                    alt={plant.name + "temperature " + idx.toString()}
                                                />
                                            return ""
                                        })
                                    }

                                    {plant.minTemp}°
                                    à

                                    {
                                        tempRanges.map((range, idx) => {
                                            if (plant.maxTemp >= range[0] && plant.maxTemp <= range[1])
                                                return <img
                                                    key={idx.toString()}
                                                    className="plant-detail-icon margin-left"
                                                    title={"maximum " + plant.maxTemp + "°"}
                                                    src={"/images/icons/temperature/" + (idx + 1).toString() + ".png"}
                                                    alt={plant.name + "temperature " + idx.toString()}
                                                />
                                            return ""
                                        })
                                    }

                                    {plant.maxTemp}°
                                </div>
                                <div className="plant-detail-data-thumb">
                                    {
                                        humidityRanges.map((range, idx) => {
                                            if (plant.humidity >= range[0] && plant.humidity <= range[1])
                                                return <img
                                                    key={idx.toString()}
                                                    className="plant-detail-icon"
                                                    title={plant.humidity.toString() + "% d'humidité"}
                                                    src={"/images/icons/humidity/" + (idx + 1).toString() + ".png"}
                                                    alt={plant.name + "humidité " + idx.toString()}
                                                />
                                            return ""
                                        })
                                    }
                                    {plant.humidity}% d'humidité
                                </div>
                                <div className="plant-detail-data-thumb light" style={{height: plant.light.split(":").length * 45}}>
                                    {
                                        lightIconNames.map((name, idx) => {
                                            if (plant.light.toLowerCase().includes(name))
                                                return <img
                                                    title={lightFrenchNames[idx]}
                                                    className="plant-detail-icon"
                                                    src={"/images/icons/light/" + name + ".png"}
                                                    alt="luminosité"
                                                    key={plant.name + name}
                                                />
                                            return ""
                                        })
                                    }
                                    <span>
                                    {
                                        lightIconNames.map((name, idx) => {
                                            if (plant.light.toLowerCase().includes(name))
                                                return lightFrenchNames[idx]
                                            return ""
                                        }).filter(n => n !== "").join(" à ")
                                    }
                                    </span>
                                </div>
                                <div className="plant-detail-data-thumb">
                                    <img
                                        className="plant-detail-icon"
                                        title={"pH entre 6 et 7"}
                                        src={"/images/icons/icon-ph.png"}
                                        alt={plant.name + "ph6à7"}
                                    />
                                    6 à 7
                                </div>
                                <div className="plant-detail-data-thumb">
                                    <img
                                        className="plant-detail-icon"
                                        title={"ppm entre 100 et 400"}
                                        src={"/images/icons/icon-co2.png"}
                                        alt={plant.name + "co2-100à400ppm"}
                                    />
                                    100 à 400 ppm
                                </div>

                                <div className="plant-detail-more">
                                    <a href={plant.link} target="_blank" rel="noopener noreferrer" className="plant-detail-link">En savoir plus <span className="oi oi-external-link"/></a>
                                </div>
                                {
                                    this.props.isAuthenticated &&
                                    <PlantLink plantId={this.state.plant.id}/>
                                }
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
