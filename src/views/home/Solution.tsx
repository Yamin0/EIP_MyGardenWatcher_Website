import * as React from "react";

const Process: React.FunctionComponent<{}> = () => (
    <div className="process row">
        <div className="process-element connect col-md-6">
            <img src="/images/visuel-connect.jpg" className="process-element-img"
                 alt="Connect your carrot"/>
                <div className="overlay">
                    <div className="process-element-text">
                        Vous connectez votre carotte à notre application sur votre téléphone
                    </div>
                </div>
        </div>

        <div className="process-element select col-md-6">
            <img src="/images/visuel-select.jpg" className="process-element-img"
                 alt="Select the plants you're about to garden"/>
                <div className="overlay">
                    <div className="process-element-text">
                        Vous sélectionnez vos plantes et configurez vos notifications
                    </div>
                </div>
        </div>

        <div className="col-md-6 align-self-center process-element grow">
            <img src="/images/visuel-pousse.jpg" className="process-element-img"
                 alt="We notify when it needs you and it grow up !"/>
                <div className="overlay">
                    <div className="process-element-text">
                        Vous recevez un message quand votre plante a besoin de vous et ça y est, elle pousse !
                    </div>
                </div>
        </div>
    </div>
);

const Solution: React.FunctionComponent<{}> = () => {
    return (
        <div className="row solution" id="solution">
            <h2 className="solution-title col-md-12">Notre solution</h2>

            <h4 className="solution-subtitle col-md-12">Un assistant connecté au jardinage de loisir</h4>

            <Process/>

            <div className="border-carrot"/>

            <div className="col-md-12 solution-connect">
                <img src="/images/flat/flat-carrot.png" className="solution-connect-img" alt="carrot"/>
                    <div className="solution-connect-text">
                        <h3>Donnez vie à votre carotte !</h3>

                        Vous connectez votre carotte en bluetooth à notre application, via votre smartphone. N'oubliez
                        pas de lui donner un nom !
                    </div>

                    <img src="/images/dots.png" className="solution-connect-dots" alt="dots"/>
                    <img src="/images/flat/flat-phone.png" className="solution-connect-img" alt="phone"/>
            </div>
            <div className="col-md-12 solution-step select">
                <div className="solution-step-text">
                    <h3>Choississez vos plantations !</h3>
                    Vous sélectionnez les plantes que vous allez faire pousser avec votre carotte dans notre
                    application.
                    <br/>
                    Notre base de données est alimentée régulièrement et toutes nos informations sont certifiées par des
                    ingénieurs agronomes.
                </div>
                <img src="/images/flat/flat-plant-select.png" className="solution-step-img"
                     alt="Select your plants"/>
            </div>

            <div className="col-md-12 solution-step search">
                <img src="/images/flat/flat-help-select.png" className="solution-step-img"
                     alt="We can help you"/>
                <div className="solution-step-text">
                    <h3>Nous pouvons vous aider !</h3>
                    Notre application peut vous proposer différents types de plantes adaptés à votre environnement,
                    grâce à un moteur de recherche performant.
                    <br/>
                </div>
            </div>

            <div className="col-md-12 solution-step config">
                <div className="solution-step-text">
                    <h3>Configurez vos rappels </h3>
                    Vous pourrez sélectionner les types de rappels que vous souhaitez avoir, leur fréquence, leur
                    horaire...
                    <br/>
                </div>
                <img src="/images/flat/flat-reminder-config.png" className="solution-step-img"
                     alt="Configure your reminders"/>
            </div>

            <div className="col-xs-12 solution-step receive">
                <img src="/images/flat/flat-receive-notif.png" className="solution-step-img"
                     alt="You receive notifications"/>
                <div className="solution-step-text">
                    <h3>Vous recevez des notifications !</h3>
                    Selon les rappels que vous avez configuré, votre téléphone vous envoie des notifications lorsque vos
                    plantes ont besoin de vous.
                    <br/>
                </div>
            </div>

            <div className="col-md-12 solution-step advice">
                <div className="solution-step-text">
                    <h3>Besoin de renseignements ?</h3>
                    Vous pouvez consulter nos fiches de renseignements et de conseils dédiées à chacune des plantes sur
                    lesquelles nous disposons d'informations vérifiées.
                    <br/>
                </div>
                <img src="/images/flat/flat-plant-info.png" className="solution-step-img"
                     alt="Need informations ?"/>
            </div>

            <div className="col-md-12 solution-step share">
                <img src="/images/flat/flat-share-result.png" className="solution-step-img"
                     alt="Share your results"/>
                <div className="solution-step-text">
                    <h3>Montrez nous vos résultats !</h3>
                    Vous pouvez renseigner la croissance de vos plantes et poster des photos directement dans notre
                    application, pour partager vos réussites.
                    <br/>
                </div>
            </div>

        </div>
    )
};

export default Solution;
