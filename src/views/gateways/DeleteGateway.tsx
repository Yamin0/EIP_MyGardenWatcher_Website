import * as React from "react";
import {Modal} from "react-bootstrap";
import {CarrotService} from "../../services/CarrotService";
import Carrot from "../../interfaces/Carrot";
import Gateway from "../../interfaces/Gateway";
import {GatewayService} from "../../services/GatewayService";

interface IDeleteGatewayProps {
    gateway: Gateway,
    show: boolean,
    handleClose(): void,
    onSuccessForm(msg: string): void
}

interface IDeleteGatewayState {
    loading: boolean,
    error: string
}

class DeleteGateway extends React.Component<IDeleteGatewayProps, IDeleteGatewayState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            error: ""
        };
        this.handleDeleteGateway = this.handleDeleteGateway.bind(this);
    }

    private handleDeleteGateway(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({loading: true});
        GatewayService.deleteGateway(this.props.gateway.id)
            .then(
                () => {
                    this.props.handleClose();
                    window.scrollTo(0, 0);
                    this.setState({loading: false, error: ""});
                    this.props.onSuccessForm("Le boîtier " + this.props.gateway.name + " a bien été supprimé de votre compte.");
                },
                error => {
                    window.scrollTo(0, 0);
                    this.setState({error: error.toString(), loading: false});
                }
            )
    }

    render() {
        return (
            <Modal className="delete-account" show={this.props.show} onHide={this.props.handleClose} centered>
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
                        Voulez-vous vraiment supprimer le boîtier {this.props.gateway.name} ?
                    </h5>
                </Modal.Header>
                <Modal.Body>
                    {
                        this.state.error !== "" &&
                        <div className="error">
                            <span className="oi oi-warning"/>
                            {this.state.error}
                        </div>
                    }

                    Toutes les données collectées jusque là avec ce Gateway seront effacées, ainsi que les carottes qui lui sont liées.
                    Vous ne pourrez plus accéder à ces informations.
                </Modal.Body>
                <Modal.Footer>
                    <button
                        type="button"
                        className="btn btn-green"
                        onClick={this.props.handleClose}
                    >
                        Annuler
                    </button>
                    <button
                        type="button"
                        className="btn btn-orange"
                        disabled={this.state.loading}
                        onClick={this.handleDeleteGateway}
                    >
                        Supprimer définitivement
                    </button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default DeleteGateway;