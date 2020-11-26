import * as React from "react";
import {PlantService} from "../../services/PlantService";
import Plant, {plantInit} from "../../interfaces/Plant";
import {RouteComponentProps, withRouter} from "react-router-dom";
import PlantLink from "./PlantLink";
import {humidityRanges, lightFrenchNames, lightIconNames, tempRanges} from "../../interfaces/Search";
import PlantThumb from "./PlantThumb";

interface RouteInfo {
    id: string,
    name: string
}

interface IPlantDetailProps extends RouteComponentProps<RouteInfo> {
    isAuthenticated: boolean
}

interface IPlantDetailState {
    plant: Plant,
    similar: Plant[],
    isFetching: boolean,
    error: string
}

class PlantDetail extends React.Component<IPlantDetailProps, IPlantDetailState> {
    constructor(props: any) {
        super(props);
        this.state = {
            plant: plantInit,
            similar: [],
            isFetching: false,
            error: "lol"
        };
    }

    componentDidMount() {
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
                    }, () => this.fetchPlantAdvice(this.state.plant.id));
                }, error => {
                    this.setState({ error: error.toString(), isFetching: false })
                });
        });
    }

    private fetchPlantAdvice(id: number) {
        this.setState({ isFetching: true }, () => {
            PlantService.fetchPlantAdvice(id, 3)
                .then(data => {
                    if ((data as number[]).length > 0) {
                        PlantService.fetchPlantList(["id", "name", "minTemp", "maxTemp", "humidity", "light", "image", "description", "type"],
                            (data as number[]).join(";"))
                            .then(data => {
                                let plants: Plant[] = data as Plant[];

                                this.setState({
                                    similar: plants,
                                    isFetching: false,
                                    error: ""
                                });
                            }, error => {
                                this.setState({ error: error.toString(), isFetching: false })
                            });
                    }
                    else {
                        this.setState({
                            similar: [],
                            isFetching: false,
                            error: ""
                        })
                    }
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
                            <div className="col-12 col-md-9 plant-detail-visual">
                                <img src={plant.image} alt={plant.name} className="plant-detail-img"/>
                            </div>

                            <div className="col-12 col-md-3 plant-detail-data">
                                <div className="plant-detail-data-thumb">
                                    <h5 className="plant-detail-data-title">Environnement</h5>
                                </div>
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
                                        title={plant.ph}
                                        src={"/images/icons/icon-ph.png"}
                                        alt={plant.name + "ph" + plant.ph}
                                    />
                                    {plant.ph}
                                </div>
                                <div className="plant-detail-data-thumb last">
                                    <img
                                        className="plant-detail-icon"
                                        title={plant.co2}
                                        src={"/images/icons/icon-co2.png"}
                                        alt={plant.name + "co2" + plant.co2}
                                    />
                                    {plant.co2}
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

                            <div className="row plant-detail-content">
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

                            {
                                !this.state.isFetching &&
                                this.state.error === "" &&
                                this.state.similar.length > 0 &&
                                    <div className="row plant-detail-similar">
                                        <h2 className="col-12 plant-detail-similar-title">Plantes similaires</h2>
                                        {
                                            this.state.similar.map((plant, i) => <PlantThumb key={i.toString()} plant={plant}/>)
                                        }
                                    </div>
                            }
                    </div>
        )
    }
}

export default withRouter(PlantDetail);
