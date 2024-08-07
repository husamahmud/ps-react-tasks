/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react';
import Header from './Header';
import Error from './Error';
import Placeholder from './Placeholder';
import Results from './Results';
import Background from './Background';
import Label from './Label';
import Button from './Button';
import { numberWithCommas } from './utils';

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
    <div className="flex justify-center h-screen">
      <div className=" w-11/12 sm:w-3/6 sm:mt-14">
        <Header />

        <div className="flex flex-col sm:flex-row divide-x-2 divide-solid divide-green-500">
          <div className="sm:basis-1/2 flex flex-col sm:flex-row p-4 justify-center items-center">
            <form
              className="flex flex-col gap-3  w-3/4"
              onSubmit={(e) => handleSubmit(e)}
            >
              <Label
                placeholder="Loan Amount"
                inputVal={loan}
                setInputVal={setLoan}
                icon="$"
              />
              <Label
                placeholder="Annual Interest Rate"
                inputVal={annualRate}
                setInputVal={setAnnualRate}
                icon="%"
              />
              <Label
                placeholder="Loan Term"
                inputVal={annualTerm}
                setInputVal={setAnnualTerm}
                icon="Yearly"
              />

              <Button
                loan={loan}
                annualRate={annualRate}
                annualTerm={annualTerm}
              />
            </form>
          </div>
          <div className="flex justify-center mt-1 p-4 sm:basis-1/2">
            {error && <Error error={error} />}
            {monthlyPayment <= 0 && !error && <Placeholder />}
            {monthlyPayment > 0 && !error && (
              <Results
                monthlyPayment={numberWithCommas(monthlyPayment)}
                totalPayment={numberWithCommas(totalPayment)}
                totalInterestPaid={numberWithCommas(totalInterestPaid)}
              />
            )}
          </div>
        </div>
        <Background />
      </div>
    </div>
  );
}
