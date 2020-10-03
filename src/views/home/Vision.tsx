import * as React from "react";

const Vision: React.FunctionComponent<{}> = () => {
    return (
        <div className="row vision" id="vision">
            <h2 className="vision-title col-md-12">Notre vision</h2>

            <div className="col-md-12 vision-content row">

                <div className="col-6">
                    <p>
                        Nous avons fait un constat : la société actuelle tend de plus en plus à s'urbaniser, à se concentrer
                        dans les villes et à accélérer le rythme.
                    </p>
                    <p>
                        Nous évoluons à 100 à l'heure dans un espace réduit et le stress s'intègre dans
                        notre quotidien.
                    </p>
                    <p style={{fontStyle: "italic", fontSize: "16px", color: "#95A6B1"}}>
                        Notre environnement se numérise, tout devient connecté, technologique.
                    </p>
                    <p>
                        Nous perdons le contact humain, le rapport à la nature, à l'environnement,
                        et la situation actuelle avec le Coronavirus et le confinement n'a fait qu'empirer les choses.
                    </p>
                    <p style={{color: "#91C37D", fontSize: "20px"}}>
                        Mais au travers de tout cela, des mouvements de renouement à la nature émergent.
                    </p>
                    <p>
                        Nous avons besoin de déconnecter, déstresser, prendre le temps de respirer, pour nous recentrer sur nous-mêmes.
                        <br/>
                        Cet état d'esprit popularise des mouvements positifs qui encouragent à améliorer notre
                        bien-être comme le yoga, l'éco-responsabilité, le retour au vert.
                    </p>
                </div>
                <div className="col-6">
                    <p>
                        Chez <span style={{fontFamily: "Lobster", fontSize: "24px", color: "#00A84E"}}>MyGardenWatcher</span>, nous souhaitons nous inscrire dans cette démarche d'épanouissement personnel
                        et de recherche de qualité de l'environnement.
                    </p>
                    <p>
                        Pour cela, nous souhaitons accompagner toute personne qui éprouve des
                        difficultés à pratiquer des activités de bien-être.
                        <br/>
                        <br/>
                    </p>
                    <p style={{color: "#FF9000", fontSize: "20px"}}>
                        C'est pourquoi nous proposons des solutions d'assistance aux loisirs personnels.
                    </p>
                    <p>
                        Notre tout premier produit nous permet d'accompagner les personnes qui souhaitent jardiner
                        mais qui n'ont pas forcément le temps, les connaissances ou tout simplement pas la main verte,
                        pour les faire progresser plus aisément et sans frustration.
                    </p>
                    <p style={{fontSize: "26px", fontWeight: "bold", color: "#FF7300", textShadow: "1px 1px 5px black"}}>
                        <br/>
                        Nous contribuons ainsi à rendre le jardinage accessible à un plus grand nombre.
                    </p>
                </div>
            </div>
        </div>
    )
};

export default Vision;
