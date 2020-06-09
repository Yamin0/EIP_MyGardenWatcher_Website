import * as React from "react";
import {history} from "../../App";
import Search from "../../interfaces/Search";

interface IPlantSearchEngineProps {
    prevSearch: Search
}

interface IPlantSearchEngineState {
    formSearch: Search
}

class PlantSearchEngine extends React.Component<IPlantSearchEngineProps, IPlantSearchEngineState> {
    constructor(props: any) {
        super(props);
        this.state = {
            formSearch: this.props.prevSearch
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const name = e.target.name;
        const value = e.target.value;

        this.setState((state) => ({
            ...state,
            formSearch: {
                ...state.formSearch,
                [name]: name === "humidity" ? parseInt(value) : value,
            }
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let queryUrl: string = "/plants?";
        let variables: string[] = [];

        if (this.state.formSearch.name && this.state.formSearch.name !== "") variables.push("name=" + this.state.formSearch.name);
        if (this.state.formSearch.temperature && this.state.formSearch.temperature !== 0) variables.push("temperature=" + this.state.formSearch.temperature);
        if (this.state.formSearch.humidity && this.state.formSearch.humidity !== 0) variables.push("humidity=" + this.state.formSearch.humidity);
        if (this.state.formSearch.light && this.state.formSearch.light !== "") variables.push("light=" + this.state.formSearch.light);

        queryUrl += variables.join("&");

        history.push(queryUrl);
    }

    private renderRadioTemperature() {
        let listButtons: React.ReactNode[] = [];

        for (let i = 1; i <= 6; i++) {
            listButtons.push(
                <div className="radio" key={i.toString()}>
                    <label>
                        <input
                            type="radio"
                            name="temperature"
                            value={i}
                            checked={this.state.formSearch.temperature === i}
                            onChange={this.handleChange}
                        />
                        <img alt={"temperature " + i.toString()} className="plant-list-search-icon" src={"/images/icons/temperature/" + i.toString() + ".png"}/>
                    </label>
                </div>
            );
        }

        return listButtons;
    }

    private renderRadioHumidity() {
        let listButtons: React.ReactNode[] = [];

        for (let i = 1; i <= 5; i++) {
            listButtons.push(
                <div className="radio" key={i.toString()}>
                    <label>
                        <input
                            type="radio"
                            name="humidity"
                            value={i}
                            checked={this.state.formSearch.humidity === i}
                            onChange={this.handleChange}
                        />
                        <img alt={"humidity " + i.toString()} className="plant-list-search-icon" src={"/images/icons/humidity/" + i.toString() + ".png"}/>
                    </label>
            </div>
            );
        }

        return listButtons;
    }

    private renderRadioLight() {
        let listButtons: React.ReactNode[] = [];

        for (let i = 1; i <= 3; i++) {
            listButtons.push(
                <div className="radio" key={i.toString()}>
                    <label>
                        <input
                            type="radio"
                            name="light"
                            value={i === 1 ? "none" : (i === 2 ? "partial" : "full")}
                            checked={this.state.formSearch.light === (i === 1 ? "none" : (i === 2 ? "partial" : "full"))}
                            onChange={this.handleChange}
                        />
                        <img alt={"light " + i.toString()} className="plant-list-search-icon" src={"/images/icons/light/" + i.toString() + ".png"}/>
                    </label>
                </div>
            );
        }

        return listButtons;
    }

    render() {
        return (
            <form className="form col-9 plant-list-search row needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                <div className="form-group col-6">
                    <div className="text-center  plant-list-search-name">
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
                    <div className="text-center">
                        Humidité
                    </div>
                    <div className="plant-list-search-buttons">
                        {this.renderRadioHumidity()}
                    </div>
                </div>

                <div className="form-group col-6">
                    <div className="text-center">
                        Température
                    </div>
                    <div className="plant-list-search-buttons">
                        {this.renderRadioTemperature()}
                    </div>
                </div>

                <div className="form-group col-6">
                    <div className="text-center">
                        Luminosité
                    </div>
                    <div className="plant-list-search-buttons">
                        {this.renderRadioLight()}
                    </div>
                </div>

                <button
                    type="submit"
                    className="btn btn-green edit-profile-button col-3"
                >
                    Valider
                </button>
            </form>
        )
    }
}

export default PlantSearchEngine;
