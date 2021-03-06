import * as React from "react";
import {CarrotService} from "../../services/CarrotService";
import {Modal} from "react-bootstrap";
import Gateway from "../../interfaces/Gateway";

interface IAddCarrotProps {
    onSuccessForm(msg: string): void,
    gateways: Gateway[]
}

interface IAddCarrotState {
    name: string,
    serialCode: string,
    gatewayId: number,
    show: boolean,
    loading: boolean,
    error: string
}

class AddCarrot extends React.Component<IAddCarrotProps, IAddCarrotState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            serialCode: "",
            gatewayId: -1,
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
            [name]: name === "gatewayId" ? (value === "" ? -1 : parseInt(value)) : value,
        }));
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            CarrotService.createCarrot(this.state.name, this.state.gatewayId, this.state.serialCode)
                .then(
                    () => {
                        window.scrollTo(0, 0);
                        this.props.onSuccessForm("La carotte " + this.state.name + " a bien été ajoutée à votre compte !");
                        this.setState({loading: false, error: "", name: "", serialCode: "", gatewayId: -1, show: false});
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
                                className="form-control"
                                type="text"
                                name="serialCode"
                                value={this.state.serialCode}
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
                                className="form-control"
                                name="gatewayId"
                                value={this.state.gatewayId}
                                onChange={this.handleChange}
                                required={true}
                            >
                                <option value="">...</option>
                                {
                                    this.props.gateways.map((gateway) =>
                                        <option key={"gateway" + gateway.id} value={gateway.id}>{gateway.name}</option>)
                                }
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