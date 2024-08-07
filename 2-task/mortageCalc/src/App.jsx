/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Header from './Header';
import Error from './Error';
import Placeholder from './Placeholder';
import Results from './Results';
import Background from './Background';
import Label from './Label';
import Button from './Button';

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
        <Header />

        <div className="px-4 py-8 flex gap-3 h-3/5 divide-x-2 divide-green-400 outline-1">
          <div className="  w-1/2 flex justify-center">
            <form
              className="space-y-3 text-center"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Label
                placeholder="Loan Amount"
                inputVal={loan}
                setInputVal={setLoan}
              />
              <Label
                placeholder="Annual Interest Rate"
                inputVal={annualRate}
                setInputVal={setAnnualRate}
              />
              <Label
                placeholder="Loan Term"
                inputVal={annualTerm}
                setInputVal={setAnnualTerm}
              />

              <Button
                loan={loan}
                annualRate={annualRate}
                annualTerm={annualTerm}
              />
            </form>
          </div>

          {error && <Error error={error} />}
          {monthlyPayment <= 0 && !error && <Placeholder />}
          {monthlyPayment > 0 && !error && (
            <Results
              monthlyPayment={monthlyPayment}
              totalPayment={totalPayment}
              totalInterestPaid={totalInterestPaid}
            />
          )}
        </div>
        <Background />
      </div>
    </div>
  );
}
