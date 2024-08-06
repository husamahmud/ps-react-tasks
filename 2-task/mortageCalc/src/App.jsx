/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';

/*
M = P[r(1+r)^n]/[(1+r)^n - 1]
Where:

M = Monthly mortgage payment
P = Loan amount
r = Monthly interest rate (annual interest rate / 12)
n = Loan term in months
*/

function numberWithCommas(x) {
  let parts = x.toString().split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  return parts.join('.');
}

export default function App() {
  const [loan, setLoan] = useState('');
  const [annualRate, setAnnualRate] = useState('');
  const [annualTerm, setAnnualTerm] = useState('');

  const [error, setError] = useState('');

  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterestPaid, setTotalInterestPaid] = useState(0);

  const validateInputs = () => {
    isNaN(loan) || isNaN(annualRate) || isNaN(annualTerm)
      ? setError('Please enter valid numeric values.')
      : loan <= 0 || annualRate <= 0 || annualTerm <= 0
      ? setError('Please enter positive values.')
      : setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validateInputs();

    const parsedLoan = parseFloat(loan);
    const parsedAnnualRate = parseFloat(annualRate);
    const parsedAnnualTerm = parseFloat(annualTerm);

    if (!error) {
      const monthlyRate = parsedAnnualRate / 100 / 12;
      const monthlyTerm = parsedAnnualTerm * 12;

      if (parsedAnnualRate > 0) {
        const numerator = monthlyRate * Math.pow(1 + monthlyRate, monthlyTerm);
        const denominator = Math.pow(1 + monthlyRate, monthlyTerm) - 1;
        const monthly = parsedLoan * (numerator / denominator);
        setMonthlyPayment(monthly.toFixed(2));

        const total = monthly * monthlyTerm;
        setTotalPayment(total.toFixed(2));
        setTotalInterestPaid((total - parsedLoan).toFixed(2));
      } else {
        const monthly = loan / monthlyTerm;
        setMonthlyPayment(monthly.toFixed(2));
        setTotalPayment(parsedLoan.toFixed(2));
        setTotalInterestPaid('0.00');
      }
    }
  };

  return (
    <div className="dark:bg-slate-800 dark:text-white text-black flex items-center justify-center bg-slate-400 w-full h-screen">
      <div className="border-solid border-stone-500 border-2 w-6/12 h-2/3 overflow-hidden">
        <div className="text-xl font-bold text-center border-b-2 border-stone-600 border-solid ">
          <h1 className="p-4">Mortgage Calculator</h1>
        </div>

        <div className="px-4 py-8 flex gap-3 h-3/5 divide-x-2 divide-green-400 outline-1">
          <div className="  w-1/2 flex justify-center">
            <form
              className="space-y-3 text-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <label className="relative block">
                <span className="absolute inset-y-0 right-0 flex items-center pr-8 text-stone-500">
                  $
                </span>
                <input
                  className="rounded-md py-2 px-4 focus:outline-none focus:outline-green-500"
                  type="text"
                  placeholder="Loan Amount"
                  value={loan}
                  onChange={(e) => setLoan(e.target.value)}
                />
              </label>

              <label className="relative block">
                <span className="absolute inset-y-0 right-0 flex items-center pr-8 text-stone-500">
                  %
                </span>
                <input
                  className="rounded-md py-2 px-4 focus:outline-none focus:outline-green-500"
                  type="text"
                  placeholder="Annual Interest Rate"
                  value={annualRate}
                  onChange={(e) => setAnnualRate(e.target.value)}
                />
              </label>

              <label className="relative block">
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-500">
                  YEARS
                </span>
                <input
                  className="rounded-md py-2 px-4 focus:outline-none focus:outline-green-500"
                  type="text"
                  placeholder="Loan Term"
                  value={annualTerm}
                  onChange={(e) => {
                    setAnnualTerm(e.target.value);
                  }}
                />
              </label>

              <div>
                <button
                  className="bg-green-400 hover:bg-green-500 focus:outline-offset-2 focus:outline-green-900 focus:ring-offset-2 focus:ring-green-500 focus:ring-2 duration-300 transition-all py-2 px-8 tracking-wide text-xl font-semibold rounded-full mt-3 inline-block disabled:cursor-not-allowed"
                  type="submit"
                  disabled={
                    loan === '' || annualRate === '' || annualTerm === ''
                  }
                >
                  Calculate
                </button>
              </div>
            </form>
          </div>

          {error && (
            <div className=" w-1/2 space-y-5 py-3 px-4 pl-10 flex justify-center items-center">
              <p className="text-red-700 bg-red-300 p-2 rounded-md">{error}</p>
            </div>
          )}

          {monthlyPayment <= 0 && !error && (
            <div className="w-1/2 space-y-5 py-3 px-4 pl-10 flex justify-center items-center">
              <div className="span-container text-1xl">
                <p className="span">
                  Enter details about your loan to calculate{' '}
                  <span className="deco">monthly payment</span>,{' '}
                  <span className="deco">total payment amount</span> and{' '}
                  <span className="deco">total interest paid</span>.
                </p>
              </div>
            </div>
          )}

          {monthlyPayment > 0 && !error && (
            <div className="w-1/2 space-y-5 py-3 px-4 pl-10">
              <div className="span-container">
                <span className="span">Monthly payment</span>
                <span className="span deco">{monthlyPayment} $</span>
              </div>
              <div className="span-container">
                <span className="span">Total payment</span>
                <span className="span deco">{totalPayment} $</span>
              </div>
              <div className="span-container">
                <span className="span">Total interest paid</span>
                <span className="span deco">{totalInterestPaid} $</span>
              </div>
            </div>
          )}
        </div>
        <div className="bg-gradient-to-r from-green-500 to-cyan-500 w-full h-1/2"></div>
      </div>
    </div>
  );
}
