import { useState } from "react";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [annualInterestRate, setAnnualInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [error, setError] = useState("");

  const calculateMortgage = () => {
    // Reset previous results and error
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setError("");

    // Validate inputs
    const principal = parseFloat(loanAmount);
    const interestRate = parseFloat(annualInterestRate);
    const termInYears = parseInt(loanTerm);

    if (
      isNaN(principal) ||
      isNaN(interestRate) ||
      isNaN(termInYears) ||
      principal <= 0 ||
      interestRate <= 0 ||
      termInYears <= 0
    ) {
      setError("Please enter valid numeric values for all inputs.");
      return;
    }

    // Calculate monthly interest rate
    const monthlyInterestRate = interestRate / 100 / 12;
    // Calculate number of payments
    const numberOfPayments = termInYears * 12;

    // Calculate monthly payment using the formula
    const monthlyPayment =
      (principal * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments)) /
      (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    const totalPayment = monthlyPayment * numberOfPayments;
    const totalInterest = totalPayment - principal;

    // Set the results
    setMonthlyPayment(monthlyPayment.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));
  };

  return (
    <div className="container">
      <div className="mortage__wrapper">
        <h1>Mortgage Calculator</h1>
        <div>
          <div className="mortage__input">
            <label>Loan Amount ($):</label>
            <input
              className="form-input"
              type="text"
              value={loanAmount}
              onChange={(e) => setLoanAmount(e.target.value)}
            />
          </div>
          <div className="mortage__input">
            <label>Annual Interest Rate (%):</label>
            <input
              className="form-input"
              type="text"
              value={annualInterestRate}
              onChange={(e) => setAnnualInterestRate(e.target.value)}
            />
          </div>
          <div className="mortage__input">
            <label>Loan Term (in years):</label>
            <input
              className="form-input"
              type="text"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
            />
          </div>
          <button className="mortage__button" onClick={calculateMortgage}>
            Calculate
          </button>
        </div>
      </div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {monthlyPayment && (
        <div className="mortage__result">
          <p>Monthly Payment: ${monthlyPayment}</p>
          <p>Total Payment: ${totalPayment}</p>
          <p>Total Interest Paid: ${totalInterest}</p>
        </div>
      )}
    </div>
  );
};

export default MortgageCalculator;
