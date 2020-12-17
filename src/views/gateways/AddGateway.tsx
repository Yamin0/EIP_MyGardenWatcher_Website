import * as React from "react";
import {Modal} from "react-bootstrap";
import {GatewayService} from "../../services/GatewayService";

interface IAddGatewayProps {
    onSuccessForm(msg: string): void,
}

interface IAddGatewayState {
    name: string,
    serialCode: string,
    show: boolean,
    loading: boolean,
    error: string
}

class AddGateway extends React.Component<IAddGatewayProps, IAddGatewayState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: "",
            serialCode: "",
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
            GatewayService.createGateway(this.state.name, this.state.serialCode)
                .then(
                    () => {
                        window.scrollTo(0, 0);
                        this.props.onSuccessForm("Vous avez ajouté à votre compte le boîtier " + this.state.name + " !");
                        this.setState({loading: false, error: "", name: "", serialCode: "", show: false});
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
                    className="btn btn-orange gateway-list-add-btn col-12"
                    onClick={this.handleShow}
                >
                    Ajouter un boîtier
                </button>

                <Modal className="add-gateway" show={this.state.show} onHide={this.handleClose} centered>
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
                            J'ajoute un boîtier à mon compte
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
                                <label className="col-form-label">Nom du boîtier</label>
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
                                    Veuillez indiquer un nom pour votre boîtier.
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="col-form-label">Numéro de série du boîtier</label>
                                <input
                                    id="addCarrotSerialNb"
                                    className="form-control"
                                    type="text"
                                    name="serialCode"
                                    value={this.state.serialCode}
                                    onChange={this.handleChange}
                                    required={true}
                                />
                                <div className="invalid-feedback">
                                    Veuillez indiquer le numéro de série renseigné sur la notice de votre boîtier.
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

export default AddGateway;