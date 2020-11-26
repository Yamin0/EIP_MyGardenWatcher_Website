import * as React from "react";

const Concept: React.FunctionComponent =  () => {
    return (
        <div className="row concept" id="concept">
            <h2 className="concept-title col-md-12">Le concept</h2>

            <div className="col-md-12 row justify-content-around concept-content">
                <div className="col-12 col-md-6 concept-content-text">
                    Grâce à notre outil connecté en forme de carotte et son application mobile intuitive,
                    nous vous accompagnons chaque jour pour faire de votre jardinage un vrai loisir !
                </div>
                <div className="col-12 col-md-6 concept-content-text">
                    Avec notre système de rappels et de notifications, vous êtes informés en temps réel lorsque vos
                    plantes nécessitent votre attention, et vous savez directement ce dont elles ont besoin.
                </div>
                <div className="col-12 concept-tip concept-content-text">
                    <br/>
                    Nous mettons à votre disposition des données pertinentes et des conseils ciblés afin de vous aider à faire pousser vos plantes dans un environnement
                    optimal à leur bien-être.
                </div>
                <img src="/images/way-to-use-schema.png" alt="Way to use" className="img-fluid concept-way-to-use"/>
                <div className="col-md-12 concept-subtitle">
                    Désormais, même sans avoir la main verte, vous pouvez jardiner et obtenir des résultats !
                </div>
            </div>
            <h3 className="concept-video-title text-center col-md-12">Notre projet en vidéo</h3>

            <iframe title="MyGardenWatcher Présentation" className="concept-video" src="https://www.youtube.com/embed/KS7dqE9BfLM" frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen></iframe>

            <div className="border-carrot"/>
        </div>
    )
};

export default Concept;
