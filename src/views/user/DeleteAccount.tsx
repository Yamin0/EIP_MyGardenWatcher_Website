import * as React from "react";
import {Modal} from "react-bootstrap";
import {UserService} from "../../services/UserService";

interface IDeleteAccountProps {
    disconnect(): void
}

interface IDeleteAccountState {
    show: boolean,
    loading: boolean,
    error: string
}

class DeleteAccount extends React.Component<IDeleteAccountProps, IDeleteAccountState> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            loading: false,
            error: ""
        };
        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleDeleteAccount = this.handleDeleteAccount.bind(this);
    }

    private handleShow() {
        this.setState({show: true});
    }

    private handleClose() {
        this.setState({show: false});
    }

    private handleDeleteAccount(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        this.setState({loading: true});
        UserService.deleteAccount()
            .then(this.props.disconnect,
                error => {
                    this.setState({error: error.toString(), loading: false});
                }
            )
    }

    render() {
        return (
            <>
                <div className="row">
                    <button
                        type="button"
                        className="btn btn-orange edit-profile-delete"
                        onClick={this.handleShow}
                    >
                        Supprimer mon compte
                    </button>
                </div>

                <Modal className="delete-account" show={this.state.show} onHide={this.handleClose} centered>
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
                            Êtes-vous sûr de vouloir supprimer votre compte utilisateur ?
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

                        Attention, c'est une suppression définitive, vous ne pourrez plus récupérer votre compte par la suite.
                    </Modal.Body>
                    <Modal.Footer>
                        <button
                            type="button"
                            className="btn btn-green"
                            onClick={this.handleClose}
                        >
                            Annuler
                        </button>
                        <button
                            type="button"
                            className="btn btn-orange"
                            disabled={this.state.loading}
                            onClick={this.handleDeleteAccount}
                        >
                            Supprimer définitivement
                        </button>
                    </Modal.Footer>

                </Modal>
            </>
        )
    }
}

export default DeleteAccount;