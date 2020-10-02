import * as React from "react";

const Concept: React.FunctionComponent<{}> =  () => {
    return (
        <div className="row concept" id="concept">
            <h2 className="concept-title col-md-12">Le concept</h2>

            <div className="col-md-12 concept-content">
                Grâce à notre outil connecté en forme de carotte et son application mobile intuitive,
                nous vous accompagnons chaque jour pour faire de votre jardinage un vrai loisir !
                <br/>
                <br/>
                Nous mettons à votre disposition des conseils ciblés ainsi que des données certifiées par des
                professionnels de l'agronomie afin de vous aider à faire pousser vos plantes dans un environnement
                optimal à leur bien-être.
                <br/>
                <br/>
                Avec notre système de rappels et de notifications, vous êtes informés en temps réel lorsque vos
                plantes nécessitent votre attention, et vous savez directement ce dont elles ont besoin.
                <br/>
                <br/>
                Désormais, même sans avoir la main verte, vous pouvez jardiner et obtenir des résultats !
            </div>
        </div>
    )
};

export default Concept;
