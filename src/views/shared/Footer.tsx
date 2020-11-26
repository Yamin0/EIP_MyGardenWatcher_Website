import * as React from "react";
import {Link} from "react-router-dom";

interface ISocialNetwork {
    title: string,
    link: string,
    image: string,
    isInternalPage: boolean
}

const socialNetworks: ISocialNetwork[] = [
    {
        title: "Notre Facebook",
        link: "https://www.facebook.com/mygardenwatcher",
        image: "/images/icons/icon-facebook.png",
        isInternalPage: false
    },
    {
        title: "Notre Twitter",
        link: "https://twitter.com/mygardenwatcher",
        image: "/images/icons/icon-twitter.png",
        isInternalPage: false
    },
    {
        title: "Notre Instagram",
        link: "https://www.instagram.com/mygardenwatcher",
        image: "/images/icons/icon-instagram.png",
        isInternalPage: false
    },
    {
        title: "Nous contacter",
        link: "/contact",
        image: "/images/icons/icon-mail.png",
        isInternalPage: true
    },
];

const Footer: React.FunctionComponent<{}> =  () => {
    return (
        <footer>
            <div className="row footer">
                <div className="footer-section d-flex justify-content-center">
                    {
                        socialNetworks.map((s, i) =>
                            <div className="footer-elem social" key={i}>
                                {
                                    s.isInternalPage ?
                                        <Link to={s.link}>
                                            <img src={s.image} alt={s.title}/>
                                            <span className="d-none d-sm-inline-block">
                                                {s.title}
                                            </span>
                                        </Link>
                                        :
                                        <a href={s.link} target="_blank" rel="noopener noreferrer">
                                            <img src={s.image} alt={s.title}/>
                                            <span className="d-none d-sm-inline-block">
                                                {s.title}
                                            </span>
                                        </a>
                                }
                                </div>
                        )
                    }
                </div>

                <div className="footer-section text-center d-lg-flex justify-content-sm-center">
                    <div className="footer-elem">
                        <a href="/#">
                            Mentions légales
                        </a>
                    </div>
                    <span className="d-none d-sm-inline-block">
                    -
                    </span>
                    <div className="footer-elem">
                        <a href="/#">
                            Conditions générales d'utilisation
                        </a>
                    </div>
                    <span className="d-none d-sm-inline-block">
                    -
                    </span>
                    <div className="footer-elem">
                        © My Garden Watcher 2019 - Réalisation : Delph & Coco
                    </div>

                </div>
            </div>
        </footer>
    )
};

export default Footer;
