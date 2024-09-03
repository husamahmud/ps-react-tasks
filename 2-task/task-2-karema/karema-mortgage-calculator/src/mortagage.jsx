import React, { useState } from 'react';
import { AiOutlinePercentage } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaCalculator } from 'react-icons/fa';

function MortageCalc() {
  const [loanAmount, setLoanAmount] = useState("");
  const [interestRate, setInterestRate] = useState("");
  const [loanTerm, setLoanTerm] = useState("");
  const [result, setResult] = useState(null);

  const handleLoanAmountChange = (e) => {
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

  function Calculation(e) {
    e.preventDefault();

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
    clearForm()
  }

  function clearForm () {
    setLoanAmount("")
    setInterestRate("")
    setLoanTerm("")
  
  }
  return (
    <div className='main-div container flex h-[90vh] items-center justify-between rounded-2xl overflow-hidden'>
      <div className="left-part bg-white p-10 h-[100%] text-[#122f3f]">
        <div className="title flex items-center justify-between gap-44 mb-8">
          <h1 className='text-3xl font-bold basis-[calc(100%-276px)]'>
            Mortgage Calculator
          </h1>
          <button className='w-[100px] opacity-[.7] hover:opacity-[1] transition-all clear-all capitalize relative after:absolute after:bottom-[-2px] after:left-[50%] after:translate-x-[-50%] after:h-[1px] after:transition-all after:bg-[#122f3f] after:w-0 hover:after:w-[100%]' onClick={clearForm}>
            clear all
          </button>
        </div>

        <form className='flex flex-col justify-between gap-5 h-[calc(100%-110px)]' onSubmit={Calculation}>
          <label htmlFor="loanAmount" className='capitalize block text-lg'>
            loan amount :
            <div className="input-con mt-[10px] flex items-center border border-solid h-[40px] rounded-md border-[#cbd5e1] overflow-hidden">
              <div className="icon bg-[#dbeafe] text-[#122f3f] flex items-center justify-center h-[100%] w-[50px]">
                <BsCurrencyDollar />
              </div>
              <input
                id='loanAmount'
                type="text"
                className='h-[100%] w-[85%] outline-none pl-4 text-base'
                name="loanAmount"
                value={loanAmount}
                onChange={handleLoanAmountChange}
              />
            </div>
          </label>

          <label htmlFor="interestRate" className='capitalize block text-lg'>
            interest rate :
            <div className="input-con flex items-center border border-solid h-[40px] rounded-md border-[#cbd5e1] overflow-hidden">
              <div className="icon bg-[#dbeafe] text-[#122f3f] flex items-center justify-center h-[100%] w-[50px]">
                <AiOutlinePercentage />
              </div>
              <input
                id='interestRate'
                type="text"
                className='h-[100%] w-[85%] outline-none pl-4 text-base'
                name="interestRate"
                value={interestRate}
                onChange={handleLoanAmountChange}
              />
            </div>
          </label>

          <label htmlFor="loanTerm" className='capitalize block text-lg'>
            loan term :
            <div className="input-con flex items-center border border-solid h-[40px] rounded-md border-[#cbd5e1] overflow-hidden">
              <div className="icon text-sm bg-[#dbeafe] text-[#122f3f] flex items-center justify-center h-[100%] w-[50px]">
                years
              </div>
              <input
                id='loanTerm'
                type="text"
                className='h-[100%] w-[85%] outline-none pl-4 text-base'
                name="loanTerm"
                value={loanTerm}
                onChange={handleLoanAmountChange}
              />
            </div>
          </label>

          <button className='bg-[#d7da2fa9] rounded-3xl flex items-center justify-center p-3 gap-3 font-bold w-[50%] transition-all hover:bg-[#d7da2f]' type="submit">
            <FaCalculator />
            Calculate
          </button>
        </form>
      </div>

      <div className="right-part bg-[#122f3f] h-[100%] p-10">
        <div className="result h-[100%]">
          <h2 className='text-[#cdd2d8] text-center font-bold text-xl mb-8'>
            Your Results
          </h2>
          {result && (
            <div className="result-boxes px-10 py-5 text-white bg-[#0b1c26] border-t-4 border-[#d7da2f] rounded-xl flex flex-col justify-center gap-5">
              <div className='monthly-mortgage'>
                Monthly mortgage payment : 
                <p className='mt-3 w-fit bg-[#122f3f] rounded-md px-3 py-2'>
                  ${result.monthlyPayment}
                </p>
                <hr className='mt-3 border-[#cbd5e1]' />
              </div>

              <div className='total-payment'>
                Total payment amount :
                <p className='mt-3 w-fit bg-[#122f3f] rounded-md px-3 py-2'>
                  ${result.totalPayment}
                </p>
                <hr className='mt-3 border-[#cbd5e1]' />
              </div>

              <div className='total-interest'>
                Total interest paid :
                <p className='mt-3 w-fit bg-[#122f3f] rounded-md px-3 py-2'>
                  ${result.totalInterest}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MortageCalc;
