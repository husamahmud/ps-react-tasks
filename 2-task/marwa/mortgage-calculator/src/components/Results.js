import React from "react";

const Results = ({ monthlyPayment, totalPayment, totalInterest }) => {
    if (monthlyPayment == null || totalPayment == null || totalInterest == null) {
        return (
            <div className="results-container">
                <h2 className="results-title">Results</h2>
                <p className="results-message">Please enter valid numeric values for all fields to see the results.</p>
            </div>
        );
    }

    return (
        <div className="results-container">
            <h2 className="results-title">Results</h2>
            <div className="results-body">
                <div className="results-row">
                    <p className="results-row-left">Monthly Payment</p>
                    <p className="results-row-right">${monthlyPayment}</p>
                </div>
                <div className="results-row">
                    <p className="results-row-left">Total Payment</p>
                    <p className="results-row-right">${totalPayment}</p>
                </div>
                <div className="results-row">
                    <p className="results-row-left">Total Interest</p>
                    <p className="results-row-right">${totalInterest}</p>
                </div>
            </div>
        </div>
    );
};

export default Results;
