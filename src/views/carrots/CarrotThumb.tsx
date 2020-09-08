import * as React from "react";
import Carrot from "../../interfaces/Carrot";

interface ICarrotThumbProps {
    carrot: Carrot
}

const CarrotThumb: React.FunctionComponent<ICarrotThumbProps> = ({carrot}) => {
    return (
        <div className="col-4 plant-list-thumb" key={carrot.id}>
            <h3 className="text-center plant-list-thumb-title">
                {carrot.name}
            </h3>
        </div>
    )
};

export default CarrotThumb;
