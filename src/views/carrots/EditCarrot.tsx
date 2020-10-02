import * as React from "react";
import {CarrotService} from "../../services/CarrotService";
import Carrot from "../../interfaces/Carrot";

interface IEditCarrotProps {
    carrot: Carrot
}

interface IEditCarrotState {
    name: string,
    loading: boolean,
    error: string
}

class EditCarrot extends React.Component<IEditCarrotProps, IEditCarrotState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: this.props.carrot.name,
            loading: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<IEditCarrotProps>, prevState: Readonly<IEditCarrotState>, snapshot?: any) {
        if (JSON.stringify(prevProps.carrot) !== JSON.stringify(this.props.carrot)) {
            this.setState({ name: this.props.carrot.name });
        }
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
            CarrotService.editCarrot(this.props.carrot.id, this.state.name)
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
            <div className="modal add-carrot fade" id="editCarrotModal" tabIndex={-1} role="dialog"
                 aria-labelledby="editCarrotModalLabel" aria-hidden="true">
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
                            <h5 className="modal-title" id="editCarrotModalLabel">
                                Je modifie les informations de ma carotte
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
                                        id="editCarrotName"
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

export default EditCarrot;
