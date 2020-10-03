import * as React from "react";
import {history} from "../../App";
import Search, {
    humidityRanges,
    lightFrenchNames,
    lightIconNames,
    searchInit,
    tempRanges
} from "../../interfaces/Search";
import {typeList} from "../../interfaces/Plant";

interface IPlantSearchEngineProps {
    prevSearch: Search,
    createSortSelect(): void
}

interface IPlantSearchEngineState {
    formSearch: Search,
    toggled: boolean
}

class PlantSearchEngine extends React.Component<IPlantSearchEngineProps, IPlantSearchEngineState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formSearch: this.props.prevSearch,
            toggled: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.toggleHide = this.toggleHide.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState((state) => ({
            ...state,
            formSearch: {
                ...state.formSearch,
                [name]: name === "humidity" || name === "temperature" ? parseInt(value) : value,
            }
        }));
    }

    private handleTypeChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = parseInt(e.target.value);
        const searchTypes: number[] = [...this.state.formSearch.type];
        const indexOfValue: number = searchTypes.indexOf(value);

        if (indexOfValue === -1) searchTypes.push(value);
        else searchTypes.splice(indexOfValue, 1);

        this.setState((state) => ({
           formSearch: {
               ...state.formSearch,
               type: searchTypes
           }
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let queryUrl: string = "/plants?";
        let variables: string[] = [];

        if (this.state.formSearch.name && this.state.formSearch.name !== "") variables.push("name=" + this.state.formSearch.name);
        if (this.state.formSearch.temperature && this.state.formSearch.temperature !== -1) variables.push("temperature=" + this.state.formSearch.temperature);
        if (this.state.formSearch.humidity && this.state.formSearch.humidity !== -1) variables.push("humidity=" + this.state.formSearch.humidity);
        if (this.state.formSearch.light && this.state.formSearch.light !== "") variables.push("light=" + this.state.formSearch.light);
        if (this.state.formSearch.type && this.state.formSearch.type.length > 0) variables.push("type=" + this.state.formSearch.type.toString());

        queryUrl += variables.join("&");

        history.push(queryUrl);
        this.setState({
            toggled: false
        });
    }

    private handleClear() {
        this.setState({
            formSearch: searchInit
        })
    }

    private toggleHide() {
        this.setState({
            toggled: !this.state.toggled
        })
    }

    private renderRadioTemperature() {
        let listButtons: React.ReactNode[] = [];

        for (let i = -1; i < tempRanges.length; i++) {
            listButtons.push(
                <div className="form-check form-check-inline" key={i.toString()}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name="temperature"
                        value={i}
                        checked={(i === -1 && !this.state.formSearch.temperature) || this.state.formSearch.temperature === i}
                        onChange={this.handleChange}
                    />
                    <label className="form-check-label">
                        {
                            i !== -1 ?
                                <img
                                    alt={"température: " + tempRanges[i].toString()}
                                    title={"entre " + tempRanges[i][0] + "° et " + tempRanges[i][1] + "°"}
                                    className="plant-list-search-icon"
                                    src={"/images/icons/temperature/" + (i + 1).toString() + ".png"}
                                />
                                : <span className="plant-list-search-icon">Tout</span>
                        }
                    </label>
                </div>
            );
        }

        return listButtons;
    }

    private renderRadioHumidity() {
        let listButtons: React.ReactNode[] = [];

        for (let i = -1; i < humidityRanges.length; i++) {
            listButtons.push(
                <div className="form-check form-check-inline" key={i.toString()}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name="humidity"
                        value={i}
                        checked={(i === -1 && !this.state.formSearch.humidity) || this.state.formSearch.humidity === i}
                        onChange={this.handleChange}
                    />
                    <label className="form-check-label">
                        {
                            i !== -1 ?
                                <img
                                    alt={"humidité " + i.toString()}
                                    title={"de " + humidityRanges[i][0] + "% à " + humidityRanges[i][1] + "% d'humidité"}
                                    className="plant-list-search-icon"
                                    src={"/images/icons/humidity/" + (i + 1).toString() + ".png"}
                                />
                                : <span className="plant-list-search-icon">Tout</span>
                        }
                    </label>
                </div>
            );
        }

        return listButtons;
    }

    private renderRadioLight() {
        let listButtons: React.ReactNode[] = [];

        for (let i = -1; i < lightIconNames.length; i++) {
            listButtons.push(
                <div className="form-check form-check-inline" key={i.toString()}>
                    <input
                        className="form-check-input"
                        type="radio"
                        name="light"
                        value={i === -1 ? "" : lightIconNames[i]}
                        checked={(i === -1 && this.state.formSearch.light === "") || this.state.formSearch.light === lightIconNames[i]}
                        onChange={this.handleChange}
                    />
                    <label className="form-check-label">
                        {
                            i !== -1 ?
                                <img
                                    alt={"light " + i.toString()}
                                    title={lightFrenchNames[i]}
                                    className="plant-list-search-icon"
                                    src={"/images/icons/light/" + lightIconNames[i] + ".png"}
                                />
                                : <span className="plant-list-search-icon">Tout</span>
                        }
                    </label>
                </div>
            );
        }
        return listButtons;
    }

    private renderCheckboxType() {
        let listButtons: React.ReactNode[] = [];

        for (let i = 0; i < typeList.length; i++) {
            listButtons.push(
                <div className="form-check col-3" key={i.toString()}>
                    <input
                        type="checkbox"
                        className="form-check-input"
                        name="type"
                        value={i}
                        checked={this.state.formSearch.type && this.state.formSearch.type.length > 0 && this.state.formSearch.type.includes(i)}
                        onChange={this.handleTypeChange}
                    />
                    <label className="form-check-label">
                        {typeList[i]}
                    </label>
                </div>
            );
        }

        return listButtons;
    }

    render() {
        return (
            <form className="form col-12 plant-list-search row needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                <div className="form-group col-6">
                    <div className="plant-list-search-title">
                        Nom
                    </div>
                    <input
                        className="form-control plant-list-search-input"
                        type="text"
                        name="name"
                        id="SearchName"
                        value={this.state.formSearch.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-6">
                    <div className="plant-list-search-title">
                        Humidité
                    </div>
                    <div className="row justify-content-start">
                        {this.renderRadioHumidity()}
                    </div>
                </div>

                <div id="PlantListHide" className={"plant-list-search-" + (this.state.toggled ? "display" : "hide") + " row"}>

                    <div className="form-group col-6">
                        <div className="plant-list-search-title">
                            Température
                        </div>
                        <div className="row justify-content-start">
                            {this.renderRadioTemperature()}
                        </div>
                    </div>

                    <div className="form-group col-6">
                        <div className="plant-list-search-title">
                            Luminosité
                        </div>
                        <div className="row justify-content-start">
                            {this.renderRadioLight()}
                        </div>
                    </div>

                    <div className="form-group col-12">
                        <div className="plant-list-search-title">
                            Type de plante
                        </div>
                        <div className="plant-list-search-checkboxes row justify-content-start">
                            {this.renderCheckboxType()}
                        </div>
                    </div>
                </div>

                <button
                    type="button"
                    onClick={this.toggleHide}
                    className="btn plant-list-search-toggle col-3"
                >
                    {this.state.toggled ? "Moins de critères" : "Plus de critères"}
                    <span className={"oi oi-chevron-" + (this.state.toggled ? "top" : "bottom")}/>
                </button>

                <div className="col-5 row plant-list-search-submit justify-content-between">
                    <button
                        type="button"
                        onClick={this.handleClear}
                        className="btn btn-orange col-4"
                    >
                        <span className="oi oi-x"/>
                        Effacer
                    </button>

                    <button
                        type="submit"
                        className="btn btn-green col-6"
                    >
                        <span className="oi oi-magnifying-glass"/>
                        Rechercher
                    </button>
                </div>
                <div className="col-12 plant-list-search-tooltips">
                    Survolez les icônes de température, humidité et luminosité avec la souris pour afficher une info-bulle contenant plus de détails.
                </div>
            </form>
        )
    }
}

export default PlantSearchEngine;
