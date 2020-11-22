import * as React from "react";
import Gateway from "../../interfaces/Gateway";
import {useEffect, useState} from "react";
import {GatewayService} from "../../services/GatewayService";

interface IGatewayListProps {
    gateways: Gateway[]
}

const GatewayThumb: React.FunctionComponent<{gateway: Gateway}> = ({gateway}) => {
    const [status, setStatus] = useState("");
    useEffect(() => {
        GatewayService.aliveGateway(gateway.id).then(data => {
            setStatus(data.state);
        });
    }, [gateway.id]);
    return (
        <div className="gateway-list-thumb">
            <span className="gateway-list-name">
                {gateway.name}
            </span>
            {
                status !== "" &&
                    <div className={"gateway-list-circle " + status}/>
            }
            {
                status === "" &&
                <div className="gateway-list-spinner spinner-border text-dark" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            }
        </div>)
}

const GatewayList: React.FunctionComponent<IGatewayListProps> = ({gateways}) => {
        return (
            <div className="gateway-list col-12">
                <h2 className="gateway-list-title">Boîtiers</h2>
                {
                    gateways.map((gateway) => <GatewayThumb key={"gateway" + gateway.id} gateway={gateway}/>)
                }
            </div>
        )
}

export default GatewayList;
