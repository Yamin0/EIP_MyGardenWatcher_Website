import * as React from "react";
import {history} from "../../App";
import Search, {lightValues} from "../../interfaces/Search";

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
                [name]: value,
            }
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        let queryUrl: string = "/plants?";
        if (this.state.formSearch.name !== "") queryUrl += "name=" + this.state.formSearch.name;
        if (this.state.formSearch.minTemp !== "") queryUrl += "&minTemp=" + this.state.formSearch.minTemp;
        if (this.state.formSearch.maxTemp !== "") queryUrl += "&maxTemp=" + this.state.formSearch.maxTemp;
        if (this.state.formSearch.humidity !== "") queryUrl += "&humidity=" + this.state.formSearch.humidity;
        if (this.state.formSearch.light !== "") queryUrl += "&light=" + this.state.formSearch.light;

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
                        value={this.state.formSearch.name}
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
                        value={this.state.formSearch.minTemp}
                        onChange={this.handleChange}
                    />
                    <input
                        className="form-control plant-list-search-input col-md-4"
                        type="number"
                        name="maxTemp"
                        id="SearchMaxTemp"
                        value={this.state.formSearch.maxTemp}
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
                        value={this.state.formSearch.humidity}
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
                        value={this.state.formSearch.light}
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
