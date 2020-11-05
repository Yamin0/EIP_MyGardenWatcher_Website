import * as React from "react";
import {CarrotService} from "../../services/CarrotService";
import {Modal} from "react-bootstrap";

interface IAddCarrotProps {
    onSuccessForm(msg: string): void
}

interface IAddCarrotState {
    name: string,
    serialNb: string,
    gateway: string,
    show: boolean,
    loading: boolean,
    error: string
}

class AddCarrot extends React.Component<IAddCarrotProps, IAddCarrotState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            serialNb: "",
            gateway: "",
            show: false,
            loading: false,
            error: ""
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    private handleShow() {
        this.setState({show: true});
    }

    private handleClose() {
        this.setState({show: false});
    }

    private handleChange(e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) {
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
                        window.scrollTo(0, 0);
                        this.props.onSuccessForm("La carotte " + this.state.name + " a bien été ajoutée à votre compte !");
                        this.setState({loading: false, error: "", name: "", serialNb: "", gateway: "", show: false});
                    }, error => {
                        window.scrollTo(0, 0);
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <>
                <button
                    type="button"
                    className="btn btn-green carrot-list-add-btn col-3"
                    onClick={this.handleShow}
                >
                    Ajouter une carotte
                </button>

                <Modal className="add-carrot" show={this.state.show} onHide={this.handleClose} centered>
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

                <Modal.Header closeButton>
                    <h5 className="modal-title">
                        J'ajoute une carotte à mon compte
                    </h5>
                </Modal.Header>
                <form className="form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                    <Modal.Body>
                        {
                            this.state.error !== "" &&
                            <div className="error">
                                <span className="oi oi-warning"/>
                                {this.state.error}
                            </div>
                        }

                        <div className="form-group">
                            <label className="col-form-label">Nom de la carotte</label>
                            <input
                                id="addCarrotName"
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

                        <div className="form-group">
                            <label className="col-form-label">Numéro de série de la carotte</label>
                            <input
                                id="addCarrotSerialNb"
                                className="form-control"
                                type="text"
                                name="serialNb"
                                value={this.state.serialNb}
                                onChange={this.handleChange}
                                required={true}
                            />
                            <div className="invalid-feedback">
                                Veuillez indiquer le numéro de série renseigné sur la notice de votre carotte.
                            </div>
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">Boîtier associé</label>
                            <select
                                id="addCarrotGateway"
                                className="form-control"
                                name="gateway"
                                value={this.state.gateway}
                                onChange={this.handleChange}
                                required={true}
                            >
                                <option value="">...</option>
                                <option value="1">Boîtier 1</option>
                                <option value="2">Boîtier 2</option>
                                <option value="3">Boîtier 3</option>
                            </select>
                            <div className="invalid-feedback">
                                Veuillez sélectionner le boîtier auquel votre carotte sera associée.
                            </div>
                        </div>

                    </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-orange"
                        onClick={this.handleClose}
                    >
                        Annuler
                    </button>
                    <button
                        type="submit"
                        className="btn btn-green"
                        disabled={this.state.loading}
                    >
                        Valider
                    </button>
                </Modal.Footer>
                </form>
            </Modal>
            </>
        )
    }
}

export default AddCarrot;