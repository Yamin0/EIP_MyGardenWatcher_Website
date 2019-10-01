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
                <div className="footer-section">
                    {
                        socialNetworks.map((s, i) =>
                            <div className="footer-elem social" key={i}>
                                <img src={s.image} alt={s.title}/>
                                {
                                    s.isInternalPage ?
                                        <Link to={s.link}>{s.title}</Link>
                                        :
                                        <a href={s.link} target="_blank" rel="noopener noreferrer">
                                            {s.title}
                                        </a>
                                }
                                </div>
                        )
                    }
                </div>

                <div className="footer-section">
                    <div className="footer-elem">
                        <a href="/#">
                            Mentions légales
                        </a>
                    </div>
                    -
                    <div className="footer-elem">
                        <a href="/#">
                            Conditions générales d'utilisation
                        </a>
                    </div> -
                    <div className="footer-elem">
                        © My Garden Watcher 2019 - Réalisation : Delph & Coco
                    </div>

                </div>
            </div>
        </footer>
    )
};

export default Footer;
