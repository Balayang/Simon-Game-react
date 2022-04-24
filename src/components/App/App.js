import React from "react";
import { ColorCard } from "../ColorCard/ColorCard";

import "./../../styles/normalize.css";
import "../../styles/app.css";

export const App = () => {
  const [hidden, setHidden] = React.useState(undefined);
  const [score, setScore] = React.useState(0);

  // jenom placeholder (ve skutecnosti to bude state)
  const flash = false;

  const onClick = (color) => {
    console.log(`clicked on ${color} button...`);
  };

  return (
    <>
      {/* section je klasicky html tag a ten sam o sobe nema hidden propu */}
      {/* https://developer.mozilla.org/en-US/docs/Web/HTML/Element/section */}
      <section hidden={hidden} className="intro">
        <h1 className="title">SIMON</h1>
        <h2 className="sublititle">Do what Simon says!</h2>
        <p className="instructions">
          Follow the lights and patterns as long as you can...
        </p>
        <p onClick={() => setHidden(true)} className="btn btnStart">
          Start
        </p>
      </section>
      <section className="container">
        <div className="gameBoard">
          {["green", "red", "blue", "yellow"].map((color) => (
            <ColorCard
              color={color}
              flash={flash}
              // todle je taky placeholder, takto to prida jedno skore, kdyz kliknes na jednu barvu
              // ten druhy onClick je pro console log barvy na kterou jsi klikla
              onClick={() => setScore((prevScore) => prevScore + 1)}
              // onClick={() => onClick(color)}
            />
          ))}
        </div>
        <section className="scoreBoard">
          {/* todle prijde opravit :D */}
          <button className="btn quit" onClick={() => setHidden(false)}>
            Quit
          </button>
          <p className="scoreCount">Score: {score}</p>
        </section>
      </section>
    </>
  );
};
