import * as React from "react";
import {CarrotService} from "../../services/CarrotService";
import {PlantService} from "../../services/PlantService";
import Carrot from "../../interfaces/Carrot";
import {Modal} from "react-bootstrap";

interface IPlantLinkProps {
    plantId: number
}

interface IPlantLinkState {
    show: boolean,
    carrots: Carrot[],
    selected: number,
    loading: boolean,
    error: string,
    success: boolean
}

class PlantLink extends React.Component<IPlantLinkProps, IPlantLinkState> {
    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            carrots: [],
            selected: -1,
            loading: false,
            error: "",
            success: false
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

    // Fetch carrots
    private fetchAllCarrots() {
        this.setState({ loading: true }, () => {
            CarrotService.fetchCarrotList()
                .then(data => {
                    let carrots: Carrot[] = data as Carrot[];
                    this.setState({
                        carrots,
                        selected: carrots && carrots.length > 0 ? carrots[0].id : -1,
                        loading: false,
                        error: ""
                    });

                }, error => {
                    this.setState({ error: error.toString(), loading: false })
                });
        });
    }

    private handleChange(e: React.ChangeEvent<HTMLSelectElement>) {
        const value = parseInt(e.target.value);

        this.setState({
            selected: value
        });
    }

    private handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (!e.currentTarget.checkValidity()) {
            (e.currentTarget as HTMLElement).classList.add("was-validated");
        } else {
            this.setState({ loading: true });
            PlantService.linkPlantToCarrot(this.props.plantId, this.state.selected)
                .then(
                    () => {
                        this.setState({loading: false, success: true}, () => {
                            setTimeout(() => {
                                this.setState({success: false});
                            }, 5000);
                        });
                    }, error => {
                        this.setState({ error: error.toString(), loading: false })
                    }
                );
        }
    }

    componentDidMount() {
        this.fetchAllCarrots();
    }

    render() {
        return (
            <div className="plant-detail-carrot-link">
                <button
                    type="button"
                    className="btn btn-orange plant-detail-carrot-link-btn"
                    onClick={this.handleShow}
                >
                    Ajouter cette plante
                </button>

                <Modal className="plant-link" show={this.state.show} onHide={this.handleClose} centered>
                    {
                        this.state.carrots.length > 0 &&
                        <>
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
                                    J'ajoute cette plante à une carotte
                                </h5>
                                <a href="/carrots" className="plant-link-carrot-page-go">Gérer mes carottes<span className="oi oi-arrow-circle-right"/></a>
                            </Modal.Header>
                            <form className="form plant-link-form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                                <Modal.Body>
                                    {
                                        this.state.success &&
                                        <div className="success">
                                            Cette plante a bien été liée à la carotte {this.state.carrots[this.state.carrots.findIndex(c => c.id === this.state.selected)].name} !
                                            <span className="oi oi-thumb-up"/>
                                        </div>
                                    }

                                    {
                                        this.state.error !== "" &&
                                        <div className="error">
                                            <span className="oi oi-warning"/>
                                            {this.state.error}
                                        </div>
                                    }

                                    <div className="form-group">
                                        <label className="col-form-label">Sélectionnez la carotte</label>
                                        <select
                                            className="form-control"
                                            value={this.state.selected}
                                            onChange={this.handleChange}
                                        >
                                            {
                                                this.state.carrots.map(carrot => {
                                                        return <option value={carrot.id} key={carrot.id}>{carrot.name}</option>
                                                    }
                                                )
                                            }
                                        </select>
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
                        </>
                    }

                    {
                        this.state.carrots.length === 0 &&
                        <>
                            <Modal.Header closeButton>
                                <h5 className="modal-title">
                                    Vous n'avez pas de carottes disponibles.
                                </h5>
                            </Modal.Header>
                            <Modal.Body>
                                Vous n'avez aucune carotte connectée à votre compte utilisateur.
                                <br/>
                                Vous en avez une ? Pour l'ajouter, c'est
                                <a href="/carrots" className="plant-link-carrot-page">ici</a>.
                            </Modal.Body>
                            <Modal.Footer>
                                <button
                                    type="button"
                                    className="btn btn-orange"
                                    onClick={this.handleClose}
                                >
                                    Annuler
                                </button>
                            </Modal.Footer>
                        </>
                    }
                </Modal>
            </div>

        )
    }
}

export default PlantLink;
