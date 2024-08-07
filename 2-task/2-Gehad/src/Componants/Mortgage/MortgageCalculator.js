import React, { useState, useEffect } from "react";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [result, setResult] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "loanAmount":
        setLoanAmount(value);
        break;
      case "interestRate":
        setInterestRate(value);
        break;
      case "loanTerm":
        setLoanTerm(value);
        break;
      default:
        break;
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!loanAmount || isNaN(loanAmount) || parseFloat(loanAmount) <= 0) {
      newErrors.loanAmount = "Please enter a valid loan amount";
    }
    if (!interestRate || isNaN(interestRate) || parseFloat(interestRate) <= 0) {
      newErrors.interestRate = "Please enter a valid interest rate";
    }
    if (!loanTerm || isNaN(loanTerm) || parseFloat(loanTerm) <= 0) {
      newErrors.loanTerm = "Please enter a valid loan term";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateMortgage = () => {
    if (!validateForm()) return;

    const P = parseFloat(loanAmount);
    const r = parseFloat(interestRate) / 100 / 12;
    const n = parseFloat(loanTerm) * 12;

    const monthlyPayment =
      (P * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPayment = monthlyPayment * n;
    const totalInterest = totalPayment - P;

    setResult({
      monthlyPayment: monthlyPayment.toFixed(2),
      totalPayment: totalPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
    });
  };

  const clearForm = () => {
    setLoanAmount("");
    setInterestRate("");
    setLoanTerm("");
    setErrors({});
    setResult(null);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-4xl w-full">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="w-full md:w-1/2 space-y-4">
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold mb-6">Mortgage Calculator</h2>
              <label className="mb-1 font-medium">Loan Amount ($)</label>
              <input
                type="number"
                name="loanAmount"
                value={loanAmount}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter loan amount"
              />
              <div className="h-5 text-red-500 text-sm">
                {errors.loanAmount}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">
                Annual Interest Rate (%)
              </label>
              <input
                type="number"
                name="interestRate"
                value={interestRate}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter annual interest rate"
              />
              <div className="h-5 text-red-500 text-sm">
                {errors.interestRate}
              </div>
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-medium">Loan Term (years)</label>
              <input
                type="number"
                name="loanTerm"
                value={loanTerm}
                onChange={handleInputChange}
                className="p-2 border rounded focus:outline-none focus:ring-2 focus:ring-slate-500"
                placeholder="Enter loan term in years"
              />
              <div className="h-5 text-red-500 text-sm">{errors.loanTerm}</div>
            </div>
            <div className="flex justify-between">
              <button
                onClick={calculateMortgage}
                className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition duration-300"
              >
                Calculate
              </button>
              <button
                onClick={clearForm}
                className="bg-slate-900 text-white px-4 py-2 rounded hover:bg-slate-700 transition duration-300"
              >
                Clear
              </button>
            </div>
          </div>
          <div className="w-full md:w-1/2 bg-slate-900 rounded p-12 justify-center text-white">
            <h3 className="font-bold mb-4 text-xl">Results:</h3>
            {result ? (
              <div className="space-y-2">
                <p className="flex justify-between">
                  <span>Monthly Payment:</span>
                  <span className="font-semibold">
                    ${result.monthlyPayment}
                  </span>
                </p>
                <p className="flex justify-between">
                  <span>Total Payment:</span>
                  <span className="font-semibold">${result.totalPayment}</span>
                </p>
                <p className="flex justify-between">
                  <span>Total Interest Paid:</span>
                  <span className="font-semibold">${result.totalInterest}</span>
                </p>
              </div>
            ) : (
              <p className="text-gray-400 py-2 italic text-lg">
                Enter values and click Calculate to see results.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MortgageCalculator;
