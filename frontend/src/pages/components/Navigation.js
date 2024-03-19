import React from "react";

import { Link } from "react-router-dom";
import "../../style/home.scss";
import TraitOrange from "./TraitOrange";
function Navigation() {
  return (
    <div className="containerNavigation">
      <div>
        <Link to="/profil">Profil</Link>
        <TraitOrange width="53px" height="2px" margin="10px 0" />
      </div>
      <div>
        <Link to="/repices">Ajout d'une recette</Link>
        <TraitOrange width="190px" height="2px" margin="10px 0" />
      </div>
      <div>
        <Link to="/waterConsumptions">Eau consommée</Link>
        <TraitOrange width="158px" height="2px" margin="10px 0" />
      </div>
      <div>
        <Link to="/steps">Pas réalisés</Link>
        <TraitOrange width="110px" height="2px" margin="10px 0" />
      </div>
      <div>
        <Link to="/contacts">Contact</Link>
        <TraitOrange width="78px" height="2px" margin="10px 0" />
      </div>
    </div>
  );
}

export default Navigation;
