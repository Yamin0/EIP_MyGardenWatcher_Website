import * as React from "react";
import {Link} from "react-router-dom";
import Plant from "../../interfaces/Plant";
import {lightIconNames} from "../../interfaces/Search";

interface IPlantThumbProps {
    plant: Plant
}

const PlantThumb: React.FunctionComponent<IPlantThumbProps> = ({plant}) => {
    return (
        <div className="col-4 plant-list-thumb" key={plant.id}>
            <h3 className="text-center plant-list-thumb-title">
                {plant.name}
            </h3>
            <Link to={"/plants/" + plant.id + "/" + plant.name} className="plant-list-thumb-link">
                <img src={plant.image} alt={plant.name} className="plant-list-thumb-img"/>
            </Link>

            <div className="row plant-list-thumb-data">
                <div className="col-4 plant-list-thumb-data-thumb">
                    <img className="plant-list-thumb-icon" src="/images/icons/icon-temperature.png" alt="temperature"/>
                    {plant.minTemp}° à {plant.maxTemp}°
                </div>
                <div className="col-4 plant-list-thumb-data-thumb">
                    <img className="plant-list-thumb-icon" src="/images/icons/icon-humidity.png" alt="humidité"/>
                    {plant.humidity}%
                </div>
                <div className="col-4 plant-list-thumb-data-thumb">
                    {
                        lightIconNames.map(name => {
                            if (plant.light.toLowerCase().includes(name))
                                return <img className="plant-list-thumb-icon" src={"/images/icons/light/" + name + ".png"} alt="luminosité" key={plant.name + name}/>
                            return ""
                        })
                    }
                </div>
            </div>
            <div className="module line-clamp col-12">
                <p>{plant.type}</p>
                <p>{plant.description}</p>
            </div>
        </div>
    )
};

export default PlantThumb;
