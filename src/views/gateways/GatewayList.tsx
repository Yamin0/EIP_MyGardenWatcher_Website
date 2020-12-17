import * as React from "react";
import Gateway from "../../interfaces/Gateway";
import GatewayThumb from "./GatewayThumb";

interface IGatewayListProps {
    gateways: Gateway[],
    handleEditModalOpen(gateway: Gateway): void,
    handleDeleteModalOpen(gateway: Gateway): void
}

const GatewayList: React.FunctionComponent<IGatewayListProps> = ({gateways, handleEditModalOpen, handleDeleteModalOpen}) => {
        return (
            <div className="gateway-list col-12">
                <h2 className="gateway-list-title">Boîtiers</h2>
                {
                    gateways.map((gateway, i) => {
                        const mapEditModal = () => {
                            handleEditModalOpen(gateway);
                        };

                        const mapDeleteModal = () => {
                            handleDeleteModalOpen(gateway);
                        };

                        return <GatewayThumb key={"gateway" + gateway.id} gateway={gateway} openDeleteModal={mapDeleteModal} openEditModal={mapEditModal}/>
                    })
                }
            </div>
        )
}

export default GatewayList;
