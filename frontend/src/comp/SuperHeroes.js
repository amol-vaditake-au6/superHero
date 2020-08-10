import React, { useEffect } from "react";
import $ from "jquery";

const SuperHero = ({ superHero }) => {
  useEffect(() => {
    $(".callingButh").css("display", "none");
  });
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "100px",
        color: "#ffffff",
      }}
      className={superHero}
    >
      <h3>{superHero} is on the way </h3>
      <img
        src={`./superheroes/${superHero}.gif`}
        height="350px"
        width="500px"
        alt="loading"
      ></img>
    </div>
  );
};

export default SuperHero;
