import * as React from "react";
import Carrot from "../../interfaces/Carrot";

interface ICarrotThumbProps {
    carrot: Carrot
    handleDeleteCarrot(e: React.MouseEvent<HTMLButtonElement>): void
}

const CarrotThumb: React.FunctionComponent<ICarrotThumbProps> = ({carrot, handleDeleteCarrot}) => {
    console.log(carrot.name);
    return (
        <div className="col-4 carrot-thumb" key={carrot.id}>
            <div className="carrot-thumb-wrapper">
                <h3 className="text-center carrot-thumb-title">
                    <img src="/images/logos/mgw-carrot-classic.png" className="img-fluid carrot-thumb-img" alt=""/>
                    {carrot.name}
                </h3>
                <div className="row">
                    <button type="button" className="btn btn-green carrot-thumb-btn-edit" onClick={handleDeleteCarrot}>
                        <span className="oi oi-pencil"/>
                    </button>
                    <button type="button" className="btn btn-orange carrot-thumb-btn-delete" onClick={handleDeleteCarrot}>
                        <span className="oi oi-trash"/>
                    </button>
                </div>
            </div>
        </div>
    )
};

export default CarrotThumb;
