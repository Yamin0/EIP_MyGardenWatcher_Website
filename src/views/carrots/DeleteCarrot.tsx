import * as React from "react";
import {Modal} from "react-bootstrap";
import {CarrotService} from "../../services/CarrotService";
import Carrot from "../../interfaces/Carrot";

interface IDeleteCarrotProps {
    carrot: Carrot,
    show: boolean,
    handleClose(): void,
    onSuccessForm(msg: string): void
}

interface IDeleteCarrotState {
    loading: boolean,
    error: string
}

class DeleteCarrot extends React.Component<IDeleteCarrotProps, IDeleteCarrotState> {
    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            error: ""
        };
        this.handleDeleteCarrot = this.handleDeleteCarrot.bind(this);
    }

    private handleDeleteCarrot(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({loading: true});
        CarrotService.deleteCarrot(this.props.carrot.id)
            .then(
                () => {
                    this.props.handleClose();
                    window.scrollTo(0, 0);
                    this.setState({loading: false, error: ""});
                    this.props.onSuccessForm("La carotte " + this.props.carrot.name + " a bien été supprimée de votre compte.");
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
                        Voulez-vous vraiment supprimer la carotte {this.props.carrot.name} ?
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

                    Toutes les données collectées jusque là par cette carotte seront effacées, ainsi que les plantes qui lui sont liées.
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
                        onClick={this.handleDeleteCarrot}
                    >
                        Supprimer définitivement
                    </button>
                </Modal.Footer>

            </Modal>
        )
    }
}

export default DeleteCarrot;