import * as React from "react";

const Beta: React.FunctionComponent = () => (
    <div className="beta container">
        <h1 className="beta-title main-title text-center">
            La Bêta MyGardenWatcher
        </h1>
        <div className="row">
            <div className="col-md-12 beta-presentation">
                MyGardenWatcher lance désormais sa phase de Bêta ! Cela signifie que nous collectons vos
                retours concernant notre site Web, notre application mobile et notre outil connecté.
            </div>
            <div className="col-md-12 beta-links">
                Pour nous donner vos retours sur le site Web,
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSdY-IFHeRk3T2hCFZlpPFsISIswFkz6NOV34Aw8BkWi2cDjyw/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="beta-link"
                >
                    c'est ici !
                </a>
                <br/>
                Pour nous donner vos retours sur l'application mobile,
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSfSNTFF6QMmjzpfUfuh6WBOF1h5P8TWI3DUKU0zjUQs1ywF6w/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="beta-link"
                >
                    c'est ici !
                </a>
                <br/>
                Pour nous donner vos retours sur l'outil connecté,
                <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLSeSqEsDY8UB-GZP_zXg9ToQi47eA86XxwzjijCsQKy_-5p51A/viewform?usp=sf_link"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="beta-link"
                >
                    c'est ici !
                </a>

            </div>
        </div>
    </div>
);

export default Beta;
