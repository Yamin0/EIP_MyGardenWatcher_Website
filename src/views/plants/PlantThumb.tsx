import * as React from "react";
import {Link} from "react-router-dom";
import Plant from "../../interfaces/Plant";
import {humidityRanges, lightFrenchNames, lightIconNames} from "../../interfaces/Search";

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
                    {
                        humidityRanges.map((range, idx) => {
                            if (plant.humidity >= range[0] && plant.humidity <= range[1])
                                return <img
                                    key={idx.toString()}
                                    className="plant-list-thumb-icon"
                                    title={"de " + range[0] + "% à " + range[1] + "% d'humidité"}
                                    src={"/images/icons/humidity/" + (idx + 1).toString() + ".png"}
                                    alt={plant.name + "humidité " + idx.toString()}
                                />
                            return ""
                        })
                    }
                </div>
                <div className="col-4 plant-list-thumb-data-thumb">
                    {
                        lightIconNames.map((name, idx) => {
                            if (plant.light.toLowerCase().includes(name))
                                return <img
                                    title={lightFrenchNames[idx]}
                                    className="plant-list-thumb-icon"
                                    src={"/images/icons/light/" + name + ".png"}
                                    alt="luminosité"
                                    key={plant.name + name}
                                />
                            return ""
                        })
                    }
                </div>
            </div>
            <div className="plant-list-thumb-type">
                {plant.type}
            </div>

            <div className="module line-clamp col-12">
                {plant.description}
            </div>
        </div>
    )
};

export default PlantThumb;
