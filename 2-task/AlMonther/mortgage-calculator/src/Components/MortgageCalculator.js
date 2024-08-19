import React, { useState } from 'react';

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState('');
  const [interestRate, setInterestRate] = useState('');
  const [loanTerm, setLoanTerm] = useState('');
  const [repaymentType, setRepaymentType] = useState('repayment');
  const [monthlyPayment, setMonthlyPayment] = useState(null);
  const [totalPayment, setTotalPayment] = useState(null);
  const [totalInterest, setTotalInterest] = useState(null);
  const [calculations, setCalculations] = useState([]);
  const [error, setError] = useState('');

  const calculateMortgage = () => {
    if (loanAmount === '' || interestRate === '' || loanTerm === '') {
      setError('Please fill in all the fields.');
      return;
    }

    if (!isValidInput(loanAmount, 'positive number')) {
      setError('Please enter a valid loan amount.');
      return;
    }

    if (!isValidInput(interestRate, 'percentage between 0% and 100%')) {
      setError('Please enter a valid interest rate.');
      return;
    }

    if (!isValidInput(loanTerm, 'positive number')) {
      setError('Please enter a valid loan term.');
      return;
    }

    setError('');

    const principal = parseFloat(loanAmount);
    const annualInterestRate = parseFloat(interestRate) / 100;
    const months = parseInt(loanTerm) * 12;

    let monthlyPayment;
    let totalPayment;
    let totalInterest;

    switch (repaymentType) {
      case 'repayment':
        monthlyPayment = principal * (annualInterestRate / 12) * (Math.pow(1 + annualInterestRate / 12, months)) / (Math.pow(1 + annualInterestRate / 12, months) - 1);
        totalPayment = monthlyPayment * months;
        totalInterest = totalPayment - principal;
        break;
      case 'interest-only':
        monthlyPayment = principal * (annualInterestRate / 12);
        totalPayment = monthlyPayment * months;
        totalInterest = monthlyPayment * months - principal;
        break;
      default:
        setError('Invalid repayment type. Please choose either "repayment" or "interest-only".');
        return;
    }

    setMonthlyPayment(monthlyPayment.toFixed(2));
    setTotalPayment(totalPayment.toFixed(2));
    setTotalInterest(totalInterest.toFixed(2));

    const calculation = {
      loanAmount,
      interestRate,
      loanTerm,
      repaymentType,
      monthlyPayment,
      totalPayment,
      totalInterest,
    };

    setCalculations((calculations) => [...calculations, calculation]);
  };

  const clearFields = () => {
    setLoanAmount('');
    setInterestRate('');
    setLoanTerm('');
    setRepaymentType('repayment');
    setMonthlyPayment(null);
    setTotalPayment(null);
    setTotalInterest(null);
    setError('');
  };

  const isValidInput = (value, type) => {
    switch (type) {
      case 'positive number':
        return !isNaN(parseFloat(value)) && parseFloat(value) > 0;
      case 'percentage between 0% and 100%':
        return !isNaN(parseFloat(value)) && parseFloat(value) >= 0 && parseFloat(value) <= 100;
      default:
        return false;
    }
  };

  const handleRepaymentTypeChange = (event) => {
    setRepaymentType(event.target.value);
  };

  return (
  <>
    <div className="flex flex-col md:flex-row justify-center items-center h-screen bg-blue-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full md:w-1/3 relative">
        <h1 className="text-2xl font-bold mb-4">Mortgage Calculator</h1>
        <button className="absolute top-4 right-4 text-blue-500" onClick={clearFields}>Clear All</button>
        <div className="mb-4">
          <label className="block mb-2 font-medium">Mortgage Amount</label>
          <input
            type="text"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="£"
            className="w-full p-2 border border-gray-300 rounded"
          />
          {error.includes('loan amount') && <p className="text-red-500">{error}</p>}
        </div>
        <div className="flex space-x-4 mb-4">
          <div className="w-1/2">
            <label className="block mb-2 font-medium">Mortgage Term</label>
            <input
              type="text"
              value={loanTerm}
              onChange={(e) => setLoanTerm(e.target.value)}
              placeholder="years"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.includes('loan term') && <p className="text-red-500">{error}</p>}
          </div>
          <div className="w-1/2">
            <label className="block mb-2 font-medium">Interest Rate</label>
            <input
              type="text"
              value={interestRate}
              onChange={(e) => setInterestRate(e.target.value)}
              placeholder="%"
              className="w-full p-2 border border-gray-300 rounded"
            />
            {error.includes('interest rate') && <p className="text-red-500">{error}</p>}
          </div>
        </div>
        <div className="w-full mt-4">
            <label className="block mb-2 font-medium">Repayment Type</label>
            <select
              value={repaymentType}
              onChange={handleRepaymentTypeChange}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="repayment">Repayment</option>
              <option value="interest-only">Interest-only</option>
            </select>
          </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          onClick={calculateMortgage}
        >
          Calculate Repayments
        </button>
        {error && <p className="mt-4 text-red-500">{error}</p>}
        </div>
        
      {monthlyPayment && (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md mt-8 md:mt-0 md:ml-8 w-full md:w-1/3">
          <h2 className="text-xl font-bold mb-4">Your results</h2>
          <p className="mb-2">Your monthly repayments: <span className="text-yellow-400 text-2xl font-bold">£{monthlyPayment}</span></p>
          <p className="mb-2">Total you'll repay over the term: <span className="text-yellow-400 text-2xl font-bold">£{totalPayment}</span></p>
        </div>
      )}
    </div>
    <div className='bg-gray-700'>
    {calculations.length > 0 && (
        <div className="bg-gray-800 text-white p-8 rounded-lg shadow-md mt-8 md:mt-0 md:ml-8 w-full md:w-1/3">
          <h2 className="text-xl font-bold mb-4">Your calculations</h2>
          {calculations.map((calculation, index) => (
            <div key={index} className="mb-4">
              <p>Loan Amount: £{calculation.loanAmount}</p>
              <p>Interest Rate: {calculation.interestRate}%</p>
              <p>Loan Term: {calculation.loanTerm} years</p>
              <p>Repayment Type: {calculation.repaymentType}</p>
              <p>Monthly Payment: £{calculation.monthlyPayment}</p>
              <p>Total Payment: £{calculation.totalPayment}</p>
              <p>Total Interest: £{calculation.totalInterest}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  </>
  );
};

export default MortgageCalculator;
