import * as React from "react";

const DownloadApp: React.FunctionComponent = () => (
    <div>
        <div className="download-app container">
            <h1 className="download-app-title main-title text-center">
                Téléchargez notre application mobile
            </h1>
            <div className="row">
                <div className="col-12 download-app-text">
                    Pour installer notre application mobile, cliquez sur le lien suivant à partir de votre téléphone portable ou scannez le QR Code.
                    <br/>
                    <br className="d-block d-md-none"/>
                    Un téléchargement se lancera et l'APK (le fichier d'installation de l'application) sera sur votre téléphone.
                    Une fois téléchargé, votre téléphone devrait vous proposer automatiquement d'installer l'application.
                    <br/>
                    <div className="row justify-content-center align-items-center download-app-dl">
                        <div className="col-12 col-md-4 download-app-div">
                            <a
                                className="btn btn-green download-app-btn"
                                href="https://www.mygardenwatcher.fr:2929/file/apk"
                            >
                                Télécharger
                                <span className="oi oi-data-transfer-download"/>
                            </a>
                        </div>
                        <div className="col-12 col-md-4 download-app-div">
                            <img src="/images/qrcode-app-dl.png" className="download-app-qrcode img-fluid" alt="QR Code"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default DownloadApp;
