import * as React from "react";
import {CarrotService} from "../../services/CarrotService";
import {PlantService} from "../../services/PlantService";
import Carrot from "../../interfaces/Carrot";

interface IPlantLinkProps {
    plantId: number
}

interface IPlantLinkState {
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
            carrots: [],
            selected: 0,
            loading: false,
            error: "",
            success: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // Fetch carrots
    private fetchAllCarrots() {
        this.setState({ loading: true }, () => {
            CarrotService.fetchCarrotList()
                .then(data => {
                    let carrots: Carrot[] = data as Carrot[];

                    this.setState({
                        carrots,
                        selected: carrots[0].id,
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
            <div className="modal plant-link fade" id="plantLinkModal" tabIndex={-1} role="dialog"
                 aria-labelledby="plantLinkModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered" role="document">
                    {
                        this.state.carrots.length > 0 &&
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
                                <h5 className="modal-title" id="plantLinkModalLabel">
                                    J'ajoute cette plante à une carotte
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                                <a href="/carrots" className="plant-link-carrot-page-go">Gérer mes carottes<span className="oi oi-arrow-circle-right"/></a>
                            </div>
                            <form className="form plant-link-form needs-validation" onSubmit={this.handleSubmit} noValidate={true}>
                                <div className="modal-body">
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
                                                    console.log(carrot);
                                                    return <option value={carrot.id} key={carrot.id}>{carrot.name}</option>
                                                    }
                                                )
                                            }
                                        </select>
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
                    }

                    {
                        this.state.carrots.length === 0 &&
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="plantLinkModalLabel">
                                    Vous n'avez pas de carottes disponibles.
                                </h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                Vous n'avez aucune carotte connectée à votre compte utilisateur.
                                <br/>
                                Vous en avez une ? Pour l'ajouter, c'est
                                <a href="/carrots" className="plant-link-carrot-page">ici</a>.
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-orange" data-dismiss="modal">
                                    Annuler
                                </button>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default PlantLink;
