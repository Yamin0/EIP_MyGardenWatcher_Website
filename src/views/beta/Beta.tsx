import * as React from "react";

const Beta: React.FunctionComponent = () => (
    <div>
        <div className="beta container">
            <h1 className="beta-title main-title text-center">
                Découvrez notre Bêta
            </h1>
            <div className="row">
                <div className="col-md-12 beta-presentation">
                    MyGardenWatcher lance désormais sa phase de Bêta !
                    <br/>
                    Cela signifie que nos produits entrent en phase de test, et
                    nous avons besoin de votre aide pour obtenir des retours concernant notre site Web,
                    notre application mobile et notre outil connecté.
                    <br/>
                </div>
                <div className="col-md-12 beta-links website">
                    Vous êtes actuellement sur notre site Web. Nous espérons que vous l'appréciez, et si vous avez déjà pu en faire un tour complet,
                    n'hésitez pas à nous dire ce que vous en pensez !
                    <br/>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSdY-IFHeRk3T2hCFZlpPFsISIswFkz6NOV34Aw8BkWi2cDjyw/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-orange beta-link"
                    >
                        Je donne mon avis <span className="oi oi-external-link"/>
                    </a>
                </div>

                <div className="col-md-12 beta-download">
                    <h3>Aidez-nous à tester notre application mobile !</h3>
                    Nous avons besoin de vous pour tester notre application mobile !
                    Pour l'installer, cliquez sur le lien suivant à partir de votre téléphone portable ou scannez le QR Code.
                    Un téléchargement se lancera et l'APK (le fichier d'installation de l'application) sera sur votre téléphone.
                    Une fois téléchargé, votre téléphone devrait vous proposer automatiquement d'installer l'application.
                    <br/>
                    <a
                        className="btn btn-green beta-download-btn"
                        href="http://www.mygardenwatcher.fr:3001/file/apk"
                    >
                        Télécharger
                        <span className="oi oi-data-transfer-download"/>
                    </a>
                    <img src="/images/qrcode-app-dl.png" className="beta-download-qrcode img-fluid" alt="QR Code"/>
                </div>

                <div className="col-md-12 row justify-content-center">
                    <div className="beta-links mobile-app">
                        Si vous avez téléchargé et testé notre application mobile,
                        <br/>
                        nous aimerions avoir vos retours !
                        <br/>
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSfSNTFF6QMmjzpfUfuh6WBOF1h5P8TWI3DUKU0zjUQs1ywF6w/viewform?usp=sf_link"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="btn btn-green beta-download-btn"
                        >
                            Par ici <span className="oi oi-external-link"/>
                        </a>
                    </div>
                </div>

                <div className="border-carrot"/>

                <div className="col-md-12 beta-links carrot-iot">
                    <h3>Notre carotte connectée</h3>
                    Malheureusement, notre carotte connectée est en Bêta fermée. Cela signifie que vous ne pouvez pas effectuer de demande sur le site pour la tester, car
                    nous n'avons pas assez de prototypes disponibles pour cela.
                    <br/>
                    <br/>
                    Nous recrutons nos bêta-testeurs dans notre entourage direct ou indirect.
                    Si jamais vous en faites partie, vous pouvez cependant nous demander directement, et si l'un de nos prototypes est disponible,
                    nous serions ravis d'avoir vos retours. La période de test pour l'outil connecté est de minimum une semaine,
                    afin d'avoir un temps de prise en main suffisant pour évaluer ses fonctionnalités principales.
                    <br/>
                    <br/>
                    <br/>
                    <span className="text-btn">Si vous avez eu l'occasion de tester notre carotte connectée, pour l'évaluer, c'est ici !</span>
                    <br/>
                    <a
                        href="https://docs.google.com/forms/d/e/1FAIpQLSeSqEsDY8UB-GZP_zXg9ToQi47eA86XxwzjijCsQKy_-5p51A/viewform?usp=sf_link"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-orange beta-link"
                    >
                        J'évalue la carotte connectée <span className="oi oi-external-link"/>
                    </a>
                </div>
            </div>
        </div>
        <div className="beta container-fluid">
            <div className="row beta-thanks">
                Merci d'avoir pris le temps de vous renseigner sur notre Bêta !
            </div>
        </div>
    </div>
);

export default Beta;
