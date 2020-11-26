import * as React from "react";
import Slide from "react-reveal/Slide";
import Zoom from "react-reveal/Zoom";

const Solution: React.FunctionComponent = () => {
    return (
        <div className="row solution" id="solution">
            <h2 className="solution-title col-md-12">Notre solution</h2>

            <h4 className="solution-subtitle col-md-12">Un assistant connecté au jardinage de loisir</h4>

            <Zoom>
                <div className="col-12 row solution-products">
                    <div className="col-12 col-md-6 text-center">
                        <h3 className="solution-products-title orange">La carotte connectée</h3>
                        <div className="solution-products-text">
                            <p>
                                Nous vous proposons un outil connecté en forme de carotte.
                            </p>
                            <p>
                                Elle s'installe dans la terre à côté de vos plantes.
                            </p>
                            <p>
                                Elle contient des capteurs qui vont relever les données de votre environnement pour que nous puissions les traiter.
                            </p>
                        </div>
                        <div>
                            <img src="/images/flat/flat-phone.png" className="solution-products-img" alt="phone"/>
                        </div>
                    </div>
                    <div className="col-12 col-md-6 text-center">
                        <h3 className=" solution-products-title green">Le boîtier de transmission</h3>
                        <div className="solution-products-text">
                            <p>
                                Notre solution inclut un boîtier qui s'installe dans votre maison.
                            </p>
                            <p>
                                Ce boîtier nécessite une alimentation électrique ainsi qu'une connexion filaire à Internet.
                            </p>
                            <p>
                                Ce boîtier établira la connexion entre vos carottes et nos serveurs.
                            </p>
                        </div>
                        <div>
                            <img src="/images/flat/flat-carrot.png" className="solution-products-img" alt="phone"/>
                        </div>
                    </div>
                </div>
            </Zoom>
            <h2 className="solution-second-title text-center col-md-12">Comment ça marche ?</h2>
            <Slide left className="col-12 row">
            <div className="col-12 solution-step account">
                    <div className="solution-step-text">
                        <h3>Créez votre compte utilisateur !</h3>
                        <p>
                            Vous pouvez créer un compte utilisateur sur notre site Web ou notre application mobile.
                        </p>
                        <a className="btn btn-orange solution-step-btn" href="/download-app">Télécharger l'application mobile</a>
                        <p>
                            C'est avec ce compte que vous pourrez gérer vos carottes connectées et visualiser la croissance de vos plantes.
                        </p>
                        <a className="d-none d-md-inline-block btn btn-green" href="/register">Je crée mon compte</a>
                    </div>
                    <img src="/images/flat/flat-plant-select.png" className="solution-step-img"
                         alt="Select your plants"/>
                </div>
            </Slide>
            <Slide right className="col-12 row">
                <div className="col-12 solution-step connect">
                    <img src="/images/flat/flat-plant-select.png" className="solution-step-img d-none d-md-block"
                         alt="Select your plants"/>
                    <div className="solution-step-text">
                        <h3>Connectez votre boîtier et vos carottes !</h3>
                        <p>
                            Après avoir branché votre boîtier, connectez le à votre compte en utilisant l'application mobile.
                        </p>
                        <p>
                            Vous pourrez ensuite ajouter vos carottes sur l'application mobile ou le site Web.
                        </p>
                        <a className="d-none d-md-inline-block btn btn-green" href="/carrots">J'ajoute une carotte</a>
                    </div>
                    <img src="/images/flat/flat-plant-select.png" className="solution-step-img d-block d-md-none"
                         alt="Select your plants"/>
                </div>
            </Slide>
            <Slide left className="col-12 row">
                <div className="col-12 solution-step select">
                    <div className="solution-step-text">
                        <h3>Choississez vos plantations !</h3>
                        <p>
                            Une fois vos carottes ajoutées, choisissez les plantes que vous allez faire pousser.
                        </p>
                        <p>
                            Nous mettons à votre disposition une liste de plantes alimentée régulièrement et contenant plus de 3000 plantes.
                        </p>
                        <p>
                            Vous pouvez lier une plante à l'une de vos carottes depuis la page détail de cette plante.
                        </p>
                        <a className="btn btn-green" href="/plants">Voir les plantes</a>
                    </div>
                    <img src="/images/flat/flat-plant-select.png" className="solution-step-img"
                         alt="Select your plants"/>
                </div>
            </Slide>

            <Slide right className="col-12 row">
                <div className="col-12 solution-step search">
                    <img src="/images/flat/flat-help-select.png" className="solution-step-img d-none d-md-block"
                         alt="We can help you"/>
                    <div className="solution-step-text">
                        <h3>Nous pouvons vous aider !</h3>
                        <p>
                            Vous ne savez pas quelles plantes faire pousser ? Nous sommes là pour vous aider !
                        </p>
                        <p>
                            Notre site Web dispose d'un moteur de recherche performant pour trouver la plante adaptée à votre environnement.
                        </p>
                        <p>
                            Nous mettons également à votre disposition des conseils ciblés en lien avec les plantes que vous faites pousser.
                        </p>
                        <br/>
                    </div>
                    <img src="/images/flat/flat-help-select.png" className="solution-step-img d-block d-md-none"
                         alt="We can help you"/>
                </div>
            </Slide>

            <Slide left className="col-12 row">
                <div className="col-12 solution-step config">
                    <div className="solution-step-text">
                        <h3>Configurez vos alertes !</h3>
                        <p>
                            Sur notre application mobile, vous pouvez configurer des alertes.
                        </p>
                        <p>
                            Pour chacune d'entre-elles, vous pouvez y lier une ou plusieurs plantes liées à vos carottes.
                        </p>
                        <p>
                            Le jour et l'heure prévue, vous recevez une notification sur votre téléphone pour prendre soin de vos plantes de manière adaptée.
                        </p>
                    </div>
                    <img src="/images/flat/flat-reminder-config.png" className="solution-step-img"
                         alt="Configure your reminders"/>
                </div>
            </Slide>

            <Slide bottom className="col-12 row">
                <div className="col-12 solution-conclusion">
                    Ainsi, vous pouvez faire pousser vos plantes en toute sérénité !
                </div>
            </Slide>
        </div>
    )
};

export default Solution;
