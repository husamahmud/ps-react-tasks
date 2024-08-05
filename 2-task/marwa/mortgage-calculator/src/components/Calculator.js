import React, { useState } from "react";
import "../App.css";
import Results from "./Results";

const Calculator = () => {
    const [loanAmount, setLoanAmount] = useState("");
    const [loanTerm, setLoanTerm] = useState("");
    const [interestRate, setInterest] = useState("");
    const [monthlyPayment, setMonthlyPayment] = useState(null);
    const [totalPayment, setTotalPayment] = useState(null);
    const [totalInterest, setTotalInterest] = useState(null);
    const [error, setError] = useState("");

    const isValidInputs = () => {
        const loanAmountNum = parseFloat(loanAmount);
        const interestRateNum = parseFloat(interestRate);
        const loanTermNum = parseFloat(loanTerm);

        if (
            isNaN(loanAmountNum) || 
            isNaN(interestRateNum) || 
            isNaN(loanTermNum) ||
            loanAmountNum <= 0 || 
            interestRateNum <= 0 || 
            loanTermNum <= 0
        ) {
            setError("Please enter valid numeric values for all fields.");
            return false;
        }
        setError("");
        return true;
    };

    const calculateMortgage = () => {
        if (!isValidInputs()) {
            setMonthlyPayment(null);
            setTotalPayment(null);
            setTotalInterest(null);
            return;
        }

        const p = parseFloat(loanAmount);
        const r = parseFloat(interestRate) / 100 / 12;
        const n = parseFloat(loanTerm) * 12;
        const m = p * r * (Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);

        if (isFinite(m)) {
            const totalPayment = m * n;
            const totalInterest = totalPayment - p;

            setMonthlyPayment(m.toFixed(2));
            setTotalPayment(totalPayment.toFixed(2));
            setTotalInterest(totalInterest.toFixed(2));
        } else {
            setError("Error calculating mortgage. Please check your inputs.");
            setMonthlyPayment(null);
            setTotalPayment(null);
            setTotalInterest(null);
        }
    };

    return (
        <div className="calculator-results-container">
            <div className="calculator-container">
                <h2 className="calculator-title">Calculator</h2>
                <div className="calculator-body">
                    <div className="head">
                        <p className="calc-head calc-head-left">Monthly payment</p>
                        <p className="calc-head calc-head-right">Purchase budget</p>
                    </div>

                    <div className="calc-inputs">
                        <div className="input-group loan-amount">
                            <input 
                                type="number"
                                id="loanAmount"
                                value={loanAmount}
                                onChange={(e) => setLoanAmount(e.target.value)}
                                className="calc-input" 
                                placeholder="$ 240,000"
                                required
                            />
                        </div>
                        <div className="input-group">
                            <input 
                                type="number"
                                id="loanTerm"
                                value={loanTerm}
                                onChange={(e) => setLoanTerm(e.target.value)}
                                className="calc-input loan-term"
                                placeholder="30-years Fixed"
                                required
                            />
                            <input 
                                type="number"
                                id="interestRate"
                                value={interestRate}
                                onChange={(e) => setInterest(e.target.value)}
                                className="calc-input interest"
                                placeholder="7.143 %"
                                required
                            />
                        </div>
                        <button onClick={calculateMortgage} className="calcBtn">Calculate</button>
                    </div>
                </div>
            </div>
            <div className="results-container">
                    {error && <p className="error">{error}</p>}
                    <Results 
                        monthlyPayment={monthlyPayment}
                        totalPayment={totalPayment}
                        totalInterest={totalInterest}
                    />
            </div>
        </div>
    );
};

export default Calculator;
