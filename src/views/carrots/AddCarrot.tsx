import * as React from "react";
import {UserService} from "../../services/UserService";
import {history} from "../../App";
import {CarrotService} from "../../services/CarrotService";

interface IAddCarrotProps {
}

interface IAddCarrotState {
    name: string,
    loading: boolean,
    error: string
}

class AddCarrot extends React.Component<IAddCarrotProps, IAddCarrotState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            loading: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.checkValidity()) {
            (e.target.parentElement as HTMLElement).classList.add("was-validated");
        }

        const name = e.target.name;
        const value = e.target.value;

        this.setState((state) => ({
            ...state,
            [name]: value,
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            CarrotService.createCarrot(this.state.name)
                .then(
                    () => {
                        window.location.reload();
                    }, error => {
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <div className="modal add-carrot fade" id="addCarrotModal" tabIndex={-1} role="dialog"
                 aria-labelledby="addCarrotModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    <div className="modal-content">
                        {
                            this.state.loading ?
                                <div className="form-loading d-flex align-items-center justify-content-center position-absolute">
                                    <div className="spinner-border text-light" role="status">
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                </div>
                                :
                                ""
                        }

                        <div className="modal-header">
                            <h5 className="modal-title" id="addCarrotModalLabel">
                                Ajouter une carotte à votre compte
                            </h5>
                            <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                <span aria-hidden="true">&times;</span>
                            </button>
                        </div>
                        <form className="form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                            <div className="modal-body">
                                    {
                                        this.state.error !== "" ?
                                            <div className="error">
                                                <span className="oi oi-warning"/>
                                                {this.state.error}
                                            </div>
                                            :
                                            ""
                                    }

                                    <div className="form-group">
                                        <label className="col-form-label">Nom de la carotte</label>
                                        <input
                                            id="carrotName"
                                            className="form-control"
                                            type="text"
                                            name="name"
                                            value={this.state.name}
                                            onChange={this.handleChange}
                                            required={true}
                                        />
                                        <div className="invalid-feedback">
                                            Veuillez indiquer un nom pour votre carotte.
                                        </div>
                                    </div>
                            </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-orange" data-dismiss="modal">
                                        Annuler
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-green"
                                        disabled={this.state.loading}
                                    >
                                        Valider
                                    </button>
                                </div>


                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddCarrot;
