import * as React from "react";
import {Carousel} from "react-bootstrap";

interface ICarouselSlide {
    className: string,
    title: string,
    subtitle: string,
    description: string,
    link: string,
    linkText: string,
    colorTitle: string,
    colorDescription: string,
    colorLink: string,
}

interface ICarouselSlideProps {
    slide: ICarouselSlide,
    index: number
}

interface ICarouselIndicatorsProps {
    length: number
}

const slides: ICarouselSlide[] = [
    {
        className: "beta-mgw",
        title: "Lancement de la bêta",
        subtitle: "",
        description: "MyGardenWatcher lance sa Bêta ! Donnez nous vos retours sur notre site Web, téléchargez notre application mobile et testez notre carotte connectée !",
        link: "/beta",
        linkText: "Découvrir la Bêta",
        colorTitle: " orange",
        colorDescription: "",
        colorLink: " orange",
    },
    {
        className: "main",
        title: "My Garden Watcher",
        subtitle: "Gardez un oeil sur vos plantations",
        description: "Grâce à notre outil connecté en forme de carotte et son application mobile intuitive, nous vous accompagnons chaque jour pour faire de votre jardinage un vrai loisir !",
        link: "",
        linkText: "",
        colorTitle: "",
        colorDescription: " orange",
        colorLink: "",
    },
    {
        className: "forward",
        title: "Final Forward",
        subtitle: "",
        description: "Présentation de notre tout premier prototype au dernier jour de la piscine Forward d'Epitech en décembre 2018, devant un jury de professionnels ainsi que les étudiants de 1e et 2e année.",
        link: "https://www.facebook.com/epitech.rennes.35000/posts/2540625769297716/",
        linkText: "Retour en images",
        colorTitle: " green",
        colorDescription: "",
        colorLink: " green",
    },
    {
        className: "epitech-exp",
        title: "Epitech Experience",
        subtitle: "",
        description: "Première présentation publique de notre projet au Poool, les locaux de la French Tech Rennes Saint-Malo, pour l'Epitech Expérience. " +
            "Pour l'occasion, des professionnels, les étudiants d'Epitech ainsi que les parents ont été invités à venir voir les projets de notre promotion.",
        link: "https://www.facebook.com/epitech.rennes.35000/videos/1312408955576826/",
        linkText: "Retour en vidéo",
        colorTitle: " orange",
        colorDescription: "",
        colorLink: " orange",
    },
    {
        className: "tech-inn",
        title: "Tech Inn'Vitré",
        subtitle: "",
        description: "Notre équipe était présente au Tech Inn'Vitré, le salon des usages numériques, pour sa 2e édition début mars 2019. " +
            "A cette occasion, nous avons pu échanger avec de nombreux visiteurs, notamment plusieurs makers. " +
            "Trois jours riches en retours et en conseils !",
        link: "http://techinn.vitrecommunaute.bzh/",
        linkText: "Retrouvez la programmation de l'événement",
        colorTitle: " orange",
        colorDescription: "",
        colorLink: " orange",
    },
    {
        className: "mf-nantes",
        title: "Makeme Fest Nantes",
        subtitle: "",
        description: "Après Tech Inn'Vitré, nous nous sommes rendus à Nantes début avril pour Makeme Fest Nantes, l'évènement dédié à la communauté des Makers ouvert à tout public.",
        link: "http://nantes.makemefest.fr/",
        linkText: "Découvrez l'événement",
        colorTitle: " green",
        colorDescription: "",
        colorLink: " green",
    },
    {
        className: "mf-angers",
        title: "Makeme Fest Angers",
        subtitle: "",
        description: "Notre tour des festivals Makers continue avec Makeme Fest Angers, fin-avril. " +
            "Nous avons pu rencontrer le public angevin à la Foire d'Angers pour parler de notre projet, dans un cadre très agréable !",
        link: "https://www.youtube.com/watch?v=aRsdj_rlCpg",
        linkText: "Revivez l'évènement en vidéo",
        colorTitle: " green",
        colorDescription: "",
        colorLink: " green",
    },
    {
        className: "nmc",
        title: "Nantes Maker Campus",
        subtitle: "",
        description: "",
        link: "https://www.youtube.com/watch?v=_nUKtOOAgxQ",
        linkText: "Revivez l'évènement",
        colorTitle: " orange",
        colorDescription: "",
        colorLink: " orange",
    },

];

const CarouselSlide: React.FunctionComponent<ICarouselSlideProps> = ({slide, index}) => (
    <Carousel.Item>
    </Carousel.Item>
);

const CarouselIndicators: React.FunctionComponent<ICarouselIndicatorsProps> = ({length}) => {
    const indicators: React.ReactNode[] = [];

    for (let i = 0; i < length; i++) {
        indicators.push(
            <li
                key={i}
                data-target="#mgw-carousel"
                data-slide-to={i.toString()}
                className={i === 0 ? "active" : ""}
            />
        );
    }

    return (
        <ol className="carousel-indicators">
            {indicators}
        </ol>);
};

const HomeCarousel: React.FunctionComponent =  () => {
    return (
            <Carousel id="mgw-carousel">
                {slides.map((slide, i) => <Carousel.Item key={i} interval={3000}>
                    <div className={"row header " + slide.className}>
                        <div className="col-sm-12 header-title">
                            {
                                slide.subtitle ?
                                    <h1 className="header-title-main">{slide.title}</h1>
                                    :
                                    <h2 className={"header-title-medium" + slide.colorTitle}>{slide.title}</h2>
                            }
                            {
                                slide.subtitle !== "" &&
                                <h2 className="header-title-sub">{slide.subtitle}</h2>
                            }
                            <p className={"header-description" + slide.colorDescription}>{slide.description}</p>
                            {
                                slide.link !== "" &&
                                <a className={"header-link" + slide.colorLink} href={slide.link}
                                   target={!slide.link.includes("http") ? "_self" : "_blank"} rel="noopener noreferrer">
                                    {slide.linkText}
                                </a>
                            }
                        </div>
                    </div>
                </Carousel.Item>)}
            </Carousel>
    )
};

export default HomeCarousel;
