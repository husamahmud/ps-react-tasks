import React from "react";
import "../App.css";

const Header = () => {
    return (
        <header> 
            <div className="header-container">
                <div>
                <h1 className="main-title">Mortgage Calculator</h1>
                <p className="sub-title">United States <span className="para">:</span></p>
                </div>
                <ul className="links">
                    <li className="header-links">Overview</li>
                    <li className="header-links">Rates</li>
                    <li className="header-links">Refinance</li>
                    <li className="header-links">Relief</li>
                    <li className="header-links active">Calculator</li>
                </ul>
            </div>
        </header>
    )
}

export default Header;