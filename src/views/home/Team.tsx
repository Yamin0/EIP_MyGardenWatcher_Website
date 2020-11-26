import * as React from "react";
import Fade from 'react-reveal/Fade';

interface ITeamMember {
    fullName: string,
    role: string,
    image: string,
    link: string,
}

const teamMembers: ITeamMember[] = [
    {
        fullName: "Léo Colin Vimard",
        role: "Développeur API - Base de Données",
        image: "/images/team-members/leo.jpg",
        link: "https://www.linkedin.com/in/l%C3%A9o-colin-vimard-526951164/",
    },
    {
        fullName: "Delphine Godet",
        role: "Développeuse Front-End - Web Designer",
        image: "/images/team-members/delphine.jpg",
        link: "https://www.linkedin.com/in/delphine-godet-4250b0121/",
    },
    {
        fullName: "Kylian Colson",
        role: "Ingénieur Réseau IoT",
        image: "/images/team-members/kylian.jpg",
        link: "https://www.linkedin.com/in/kylian-colson/",
    },
    {
        fullName: "Raphaël Goulmot",
        role: "Electronicien",
        image: "/images/team-members/raphael.jpg",
        link: "https://www.linkedin.com/in/rapha%C3%ABl-goulmot-405762138/",
    },
    {
        fullName: "Flavian Feugueur",
        role: "Développeur API",
        image: "/images/team-members/flavian.jpg",
        link: "https://www.linkedin.com/in/flavian-feugueur-1326b1138/",
    },
    {
        fullName: "Hugo Tallineau",
        role: "Développeur Mobile Back-End",
        image: "/images/team-members/hugo.jpg",
        link: "https://www.linkedin.com/in/hugo-tallineau-41123a1b3/",
    },
    {
        fullName: "Nathan Tual",
        role: "Développeur Mobile Front-End - Graphiste Prototypes 3D",
        image: "/images/team-members/nathan.jpg",
        link: "https://www.linkedin.com/in/nathan-tual-79535213a/",
    },
    {
        fullName: "Megan Cavel",
        role: "Chargée de Communication",
        image: "/images/team-members/megan.jpg",
        link: "https://www.linkedin.com/in/megan-cavel-948788178/",
    },
];

const Team: React.FunctionComponent = () => {
    return (
        <div className="row team" id="team">

            <h2 className="team-title col-12">L'équipe</h2>
            <Fade>
            {
                teamMembers.map((s, i) =>
                    <div key={i} className="col-12 col-md-4 col-xl-3 team-member" itemScope itemType="https://schema.org/Person">
                        <a href={s.link} target="_blank" className="team-member-link" rel="noopener noreferrer">
                            <img src={s.image} className="team-member-img" alt={s.fullName}/>
                        </a>
                        <p className="team-member-name" itemProp="name">
                            {s.fullName}
                        </p>
                        <p className="team-member-post" itemProp="role">
                            {s.role}
                        </p>
                    </div>
                )
            }
            </Fade>
        </div>)
};

export default Team;
