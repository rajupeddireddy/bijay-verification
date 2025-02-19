import React from "react";
import bijayLogo from "../../assets/images/bijayfinance_logo.png";

import "./index.css";

export default function Header() {
  return (
    <div className="header">
      <img src={bijayLogo} alt="image" />
    </div>
  );
}
