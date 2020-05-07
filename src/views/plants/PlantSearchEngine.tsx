import * as React from "react";
import {history} from "../../App";

const lightValues: string[] = [
    "",
    "low",
    "partial",
    "full",
    "low:partial",
    "partial:full"
];

interface IPlantSearchEngineProps {
}

interface IPlantSearchEngineState {
    name: string,
    minTemp: string,
    maxTemp: string,
    humidity: string,
    light: string,
}

class PlantSearchEngine extends React.Component<IPlantSearchEngineProps, IPlantSearchEngineState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            minTemp: "",
            maxTemp: "",
            humidity: "",
            light: lightValues[0]
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
        const name = e.target.name;
        const value = e.target.value;
        console.log(name + ": " + value);

        this.setState((state) => ({
            ...state,
            [name]: value,
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let queryUrl: string = "/plants?";
        if (this.state.name !== "") queryUrl += "name=" + this.state.name;
        if (this.state.minTemp !== "") queryUrl += "&minTemp=" + this.state.minTemp;
        if (this.state.maxTemp !== "") queryUrl += "&maxTemp=" + this.state.maxTemp;
        if (this.state.humidity !== "") queryUrl += "&humidity=" + this.state.humidity;
        if (this.state.light !== "") queryUrl += "&light=" + this.state.light;

        history.push(queryUrl);
    }

    render() {
        return (
            <form className="form col-9 plant-list-search row needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                <div className="form-group col-6 row">
                    <label htmlFor="SearchName" className="col-form-label col-md-4">
                        Nom
                    </label>
                    <input
                        className="form-control plant-list-search-input col-md-8"
                        type="text"
                        name="name"
                        id="SearchName"
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-6 row">
                    <label htmlFor="SearchMinTemp" className="col-form-label col-md-4">
                        Température
                    </label>
                    <input
                        className="form-control plant-list-search-input col-md-4"
                        type="number"
                        name="minTemp"
                        id="SearchMinTemp"
                        value={this.state.minTemp}
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-control plant-list-search-input col-md-4"
                        type="number"
                        name="maxTemp"
                        id="SearchMaxTemp"
                        value={this.state.maxTemp}
                        onChange={this.handleChange}
                    />
                </div>
                <div className="form-group col-6 row">
                    <label htmlFor="SearchHumidity" className="col-form-label col-md-4">
                        Humidité
                    </label>
                    <input
                        className="form-control plant-list-search-input col-md-8"
                        type="number"
                        name="humidity"
                        id="SearchHumidity"
                        value={this.state.humidity}
                        onChange={this.handleChange}
                    />
                </div>

                <div className="form-group col-6 row">
                    <label htmlFor="SearchLight" className="col-form-label col-md-4">
                        Lumière
                    </label>

                    <select
                        className="form-control plant-list-search-input col-md-8"
                        name="light"
                        id="Light"
                        value={this.state.light}
                        required={true}
                        onChange={this.handleChange}
                    >
                        {lightValues.map((elem, i) => {
                            if (elem === "")
                                return <option value={elem} key={i}>-- Choisir une valeur --</option>
                            return <option value={elem} key={i}>{elem}</option>
                        })}
                    </select>
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
