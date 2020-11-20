import * as React from "react";
import Fade from "react-reveal/Fade";
import Slide from "react-reveal/Slide";

const Vision: React.FunctionComponent = () => {
    return (
        <div className="row vision" id="vision">
            <h2 className="vision-title col-md-12">Notre vision</h2>

            <div className="col-md-12 vision-content row justify-content-around">
                <Slide left>
                    <div className="col-4 vision-content-text">
                        <p>
                            Nous avons fait un constat : la société actuelle s'urbanise et accélère de plus en plus.
                            le stress devient quotidien et notre environnement se numérise.
                        </p>
                        <p>
                            Nous perdons le contact avec l'extérieur, le rapport à la nature,
                            et le confinement n'a fait qu'empirer les choses.
                        </p>
                        <p className="topline">
                            Pour palier à ce manque, des mouvements de retour au vert émergent.
                        </p>
                        <p>
                            Les gens ont besoin de déconnecter, se détendre, prendre le temps de respirer.
                            Cet état d'esprit popularise des activités pour améliorer le
                            bien-être comme le yoga, la randonnée ou les jardins partagés.
                        </p>
                    </div>
                </Slide>
                <Slide right>
                    <div className="col-4 vision-content-text dark">
                        <p>
                            Chez <span className="logo">MyGardenWatcher</span>, nous nous inscrivons dans cette démarche d'épanouissement personnel
                            et de recherche de qualité de l'environnement.
                        </p>
                        <p>
                            Nous souhaitons notamment favoriser le démarrage d'activités liée à la nature, et en particulier au jardin.
                        </p>
                        <p className="topline">
                            C'est pourquoi nous proposons des solutions d'assistance au jardinage.
                        </p>
                        <p>
                            Notre première solution est un outil connecté d'assistance au jardinage.
                            Si vous n'avez pas le temps, les connaissances, ou juste pas la main verte,
                            nous vous aiderons à démarrer aisément et sans frustration.
                        </p>
                    </div>
                </Slide>
            </div>
            <Fade>
                <div className="col-8 vision-subtitle">
                    Nous contribuons ainsi à rendre le jardinage accessible à un plus grand nombre.
                </div>
            </Fade>
        </div>
    )
};

export default Vision;
