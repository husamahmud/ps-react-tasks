import React, { useState } from "react";
import "./styles/MortgageCalculator.css";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(200000);
  const [interestRate, setInterestRate] = useState(3.5);
  const [loanTerm, setLoanTerm] = useState(30);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  const calculateMortgage = () => {
    const principal = loanAmount;
    const monthlyRate = interestRate / 100 / 12;
    const numberOfPayments = loanTerm * 12;

    const numerator =
      principal * monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments);
    const denominator = Math.pow(1 + monthlyRate, numberOfPayments) - 1;
    const monthlyPayment = numerator / denominator;

    setMonthlyPayment(monthlyPayment.toFixed(2));
  };

  return (
    <div className="mortgage-calculator">
      <h2 className="mortgage-calculator__title">Mortgage Calculator</h2>
      <div className="mortgage-calculator__input-group">
        <label className="mortgage-calculator__label">
          Loan Amount: $
          <input
            type="number"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            className="mortgage-calculator__input"
          />
        </label>
      </div>
      <div className="mortgage-calculator__input-group">
        <label className="mortgage-calculator__label">
          Interest Rate: %
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
            className="mortgage-calculator__input"
          />
        </label>
      </div>
      <div className="mortgage-calculator__input-group">
        <label className="mortgage-calculator__label">
          Loan Term (years):
          <input
            type="number"
            value={loanTerm}
            onChange={(e) => setLoanTerm(e.target.value)}
            className="mortgage-calculator__input"
          />
        </label>
      </div>
      <button
        onClick={calculateMortgage}
        className="mortgage-calculator__button"
      >
        Calculate
      </button>
      <div className="mortgage-calculator__result">
        <h3>Monthly Payment: ${monthlyPayment}</h3>
      </div>
    </div>
  );
};

export default MortgageCalculator;
