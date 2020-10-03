import * as React from "react";
import Carousel from "./Carousel";
import Concept from "./Concept";
import Vision from "./Vision";
import Team from "./Team";
import Solution from "./Solution";

const Home: React.FunctionComponent = () => (
            <div>
                <div className="container-fluid">
                    <Carousel/>
                </div>
                <div className="container">
                    <Concept/>
                </div>
                <div className="container-fluid">
                    <Vision/>
                </div>

                <div className="container">
                    <Solution/>
                    <Team/>
                </div>

            </div>
        );

export default Home;
