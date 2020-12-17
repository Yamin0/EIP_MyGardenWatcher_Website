import Gateway from "../../interfaces/Gateway";
import * as React from "react";
import {useEffect, useState} from "react";
import {GatewayService} from "../../services/GatewayService";

interface IGatewayThumbProps {
    gateway: Gateway,
    openEditModal(): void,
    openDeleteModal(): void
}

const GatewayThumb: React.FunctionComponent<IGatewayThumbProps> = ({gateway, openEditModal, openDeleteModal}) => {
    const [status, setStatus] = useState("");

    const alive = () => {
        setStatus("");
        GatewayService.aliveGateway(gateway.id).then(data => {
            setStatus(data.state);
        });
    }

    useEffect(() => {
        alive();
    }, [gateway.id]);

    return (
        <div className="gateway-list-thumb d-flex justify-content-between align-items-center">
            <button
                type="button"
                className="btn gateway-list-thumb-btn-reload"
                onClick={alive}
            >
                <span className="oi oi-reload"/>
            </button>
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
            <button
                type="button"
                className="btn btn-green gateway-list-thumb-btn-edit"
                onClick={openEditModal}
            >
                <span className="oi oi-pencil"/>
            </button>
            <button
                type="button"
                className="btn btn-orange gateway-list-thumb-btn-delete"
                onClick={openDeleteModal}
            >
                <span className="oi oi-trash"/>
            </button>
        </div>)
}

export default GatewayThumb;