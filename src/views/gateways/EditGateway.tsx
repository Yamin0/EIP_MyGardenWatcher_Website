import * as React from "react";
import {Modal} from "react-bootstrap";
import Gateway from "../../interfaces/Gateway";
import {GatewayService} from "../../services/GatewayService";

interface IEditGatewayProps {
    gateway: Gateway,
    show: boolean,
    handleClose(): void
    onSuccessForm(msg: string): void
}

interface IEditGatewayState {
    name: string,
    loading: boolean,
    error: string
}

class EditGateway extends React.Component<IEditGatewayProps, IEditGatewayState> {
    constructor(props: any) {
        super(props);
        this.state = {
            name: this.props.gateway.name,
            loading: false,
            error: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidUpdate(prevProps: Readonly<IEditGatewayProps>, prevState: Readonly<IEditGatewayState>, snapshot?: any) {
        if (JSON.stringify(prevProps.gateway) !== JSON.stringify(this.props.gateway)) {
            this.setState({ name: this.props.gateway.name });
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
            GatewayService.editGateway(this.props.gateway.id, this.state.name)
                .then(
                    () => {
                        window.scrollTo(0, 0);
                        this.props.onSuccessForm("Votre boîtier a bien été renommé.");
                        this.setState({loading: false, error: "", name: ""});
                        this.props.handleClose();
                    }, error => {
                        window.scrollTo(0, 0);
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    render() {
        return (
            <Modal className="add-gateway" show={this.props.show} onHide={this.props.handleClose} centered>
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
                    <h5 className="modal-title" id="editGatewayModalLabel">
                        Je modifie les informations de mon boîtier
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
                                id="editGatewayName"
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
                                id="addGatewaySerialCode"
                                className="form-control readonly"
                                type="text"
                                name="serialCode"
                                value={"1234-5678-90ab-cdef-ghi"}
                                readOnly={true}
                            />
                        </div>

                        <div className="form-group">
                            <label className="col-form-label">Boîtier associé</label>
                            <input
                                id="addCarrotSerialNb"
                                className="form-control readonly"
                                type="text"
                                name="serialNb"
                                value={"Boîtier 1"}
                                readOnly={true}
                            />
                        </div>

                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="btn btn-orange"
                            onClick={this.props.handleClose}
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
        )
    }
}

export default EditGateway;
