import React from "react";
import Header from "./components/Header";
import Calculator from "./components/Calculator";

function MortgageCalculator() {
    return (
        <>
        <Header />
        <div className="body-container">
            <div className="calculator-results-container">
                <Calculator/>
            </div>
        </div>
        </>
    )
}

export default MortgageCalculator;