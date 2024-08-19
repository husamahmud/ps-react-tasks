// import React from 'react';
import React, { useState } from 'react';
import { AiOutlinePercentage } from 'react-icons/ai';
import { BsCurrencyDollar } from 'react-icons/bs';
import { FaCalculator } from 'react-icons/fa';


interface IMortageValues {
    loanAmount: {
        value: string,
        error: string
    };
    interestRate: {
        value: string,
        error: string
    };
    loanTerm: {
        value: string,
        error: string
    };
}


interface IMortageResults {
    monthlyPayment: number,
    totalInterest: number,
    totalPayment : number
}


function MortageCalc() {

    // mortageValues state-----------
    const [mortageValues , setmortageValues] = useState<IMortageValues>({
        loanAmount: {
            value: "",
            error: ''
        },
        interestRate: {
            value: "",
            error: ''
        },
        loanTerm: {
            value: "",
            error: ''
        },
    }); 

    // mortageResults----
    const [mortageResults, setmortageResults] = useState<IMortageResults>({
        monthlyPayment: 0,
        totalInterest: 0,
        totalPayment: 0,
    });

    // state to show results---
    const [showResults , setShowResults] = useState<boolean>(false);


    // handleSubmit-----------------------------------------------------------------
    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        // valdation------------------------------------------------------------v
        let hasError = false;
        const updatedValues: IMortageValues = {
            loanAmount : {...mortageValues.loanAmount},
            interestRate : {...mortageValues.interestRate},
            loanTerm : {...mortageValues.loanTerm}
        };
        
        
        // loop to get the empty value and but it's error message---
        for (const key in updatedValues) {
            // check if values are't empty
            if(!updatedValues[key as keyof IMortageValues].value) {
                updatedValues[key as keyof IMortageValues].error = "This field is required";
                hasError = true;
            }
            // check if values are't NaN
            else if(isNaN(parseFloat(updatedValues[key as keyof IMortageValues].value))) {
                updatedValues[key as keyof IMortageValues].error = 'Please enter valid numerical values for all fields.';
                hasError = true;
            }
            else {
                updatedValues[key as keyof IMortageValues].error = "";
            }
        }

        // set mortageValues with the any error found--
        setmortageValues(updatedValues);

        // If there are errors, stop further processing
        if(hasError) return;


        // Continue with form submission logic here.........................................................
        calculateMortgage();
    }


    // calculateMortgage----
    function calculateMortgage () {
        const 
        amount = parseFloat(mortageValues.loanAmount.value), // Loan amount
        rate = parseFloat(mortageValues.interestRate.value) / 100 / 12, // Monthly interest rate (annual interest rate / 12)
        term  = parseFloat(mortageValues.loanTerm.value) * 12; // Loan term in months

        // Calculate monthly payment: /* M = P[r(1+r)^n]/[(1+r)^n - 1] */---
        const 
        monthlyPayment = (amount * rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1),
        totalPayment = monthlyPayment * term,
        totalInterest = totalPayment - amount;

        // set the setmortageResults---
        setmortageResults({
            monthlyPayment: monthlyPayment,
            totalInterest: totalInterest,
            totalPayment: totalPayment,
        });


        // show results----
        setShowResults(true);
    }


    // clear all----------
    function clearAll() {
        // clear all values
        setmortageValues({
            loanAmount: { value: "", error: "" },
            interestRate: { value: "", error: "" },
            loanTerm: { value: "", error: "" },
        });

        // Hide results
        setShowResults(false);
    }


    return (
        // main container
        <div className='main-div container flex h-[90vh] items-center justify-between rounded-2xl overflow-hidden'>
            {/* start left part */}
            <div className="left-part bg-white p-10 h-[100%] text-[#122f3f]">
                {/* form title */}
                <div className="title flex items-center justify-between gap-44 mb-8">
                    <h1 className='text-3xl font-bold basis-[calc(100%-276px)]'>
                        Mortgage Calculator
                    </h1>
                    <button onClick={clearAll} className='w-[100px] opacity-[.7] hover:opacity-[1] transition-all clear-all capitalize relative after:absolute after:bottom-[-2px] after:left-[50%] after:translate-x-[-50%] after:h-[1px] after:transition-all after:bg-[#122f3f] after:w-0 hover:after:w-[100%]'>
                        clear all
                    </button>
                </div>

                {/* start form */}
                <form onSubmit={handleSubmit} className='flex flex-col justify-between gap-5 h-[calc(100%-110px)]'>
                    {/* first label loanAmount */}
                    <label htmlFor="loanAmount" className='capitalize block text-lg'>
                        loan amount :
                        {/* input and icon box */}
                        <div className="input-con mt-[10px] flex items-center border border-solid h-[40px] rounded-md border-[#cbd5e1] overflow-hidden">
                            <div className="icon bg-[#dbeafe] text-[#122f3f] flex items-center justify-center h-[100%] w-[50px]">
                                <BsCurrencyDollar />
                            </div>

                            <input onChange={e => {
                                setmortageValues({...mortageValues, loanAmount: {...mortageValues.loanAmount , value : e.target.value}})
                            }} 
                            id='loanAmount' type="text" 
                            className='h-[100%] w-[85%] outline-none pl-4 text-base' value={mortageValues.loanAmount.value}/>
                        </div>
                        <span className='text-sm text-red-600'>{mortageValues.loanAmount.error}</span>
                    </label>
                        
                    {/* second label interestRate */}
                    <label htmlFor="interestRate" className='capitalize block text-lg'>
                        interest rate :
                        {/* input and icon box */}
                        <div className="input-con flex items-center border border-solid h-[40px] rounded-md border-[#cbd5e1] overflow-hidden">
                            <div className="icon bg-[#dbeafe] text-[#122f3f] flex items-center justify-center h-[100%] w-[50px]">
                                <AiOutlinePercentage />
                            </div>

                            <input onChange={e => {
                                setmortageValues({...mortageValues, interestRate: {...mortageValues.interestRate , value : e.target.value}})
                            }} id='interestRate' type="text" 
                            className='h-[100%] w-[85%] outline-none pl-4 text-base' value={mortageValues.interestRate.value}/>
                        </div>
                        <span className='text-sm text-red-600'>{mortageValues.interestRate.error}</span>
                    </label>
                    
                    {/* third label loanTerm */}
                    <label htmlFor="loanTerm" className='capitalize block text-lg'>
                        loan term :
                        {/* input and icon box */}
                        <div className="input-con flex items-center border border-solid h-[40px] rounded-md border-[#cbd5e1] overflow-hidden">
                            <div className="icon text-sm bg-[#dbeafe] text-[#122f3f] flex items-center justify-center h-[100%] w-[50px]">
                                years
                            </div>

                            <input onChange={e => {
                                setmortageValues({...mortageValues, loanTerm: {...mortageValues.loanTerm , value : e.target.value}})
                            }} 
                            id='loanTerm' type="text" 
                            className='h-[100%] w-[85%] outline-none pl-4 text-base' value={mortageValues.loanTerm.value}/>
                        </div>
                        <span className='text-sm text-red-600'>{mortageValues.loanTerm.error}</span>
                    </label>

                    <button className='bg-[#d7da2fa9] rounded-3xl flex items-center justify-center p-3 gap-3 font-bold w-[50%] transition-all hover:bg-[#d7da2f]'>
                        <FaCalculator />
                        Calculate
                    </button>
                </form>
            </div>

            {/* start right part */}
            <div className="right-part bg-[#122f3f] h-[100%] p-10">
                <div className="result h-[100%]">
                    {/* display with out results */}
                    {
                        !showResults && 
                        <>
                            <h2 className='text-[#cdd2d8] text-center font-bold text-xl mb-8'>
                                Your Results Shown Here
                            </h2>

                            <div className="image-text h-[calc(100%-60px)] flex items-center justify-center">
                                <img src="public/illustration-empty.svg" alt="image" className='max-w-[100%]'/>
                            </div>
                        </>
                    }

                    {/* display results here */}
                    {
                        showResults && 
                        <>
                            <h2 className='text-[#cdd2d8] text-center font-bold text-xl mb-8'>
                                Your Results
                            </h2>
                            <div className="result-boxes px-10 py-5 text-white bg-[#0b1c26] border-t-4 border-[#d7da2f] rounded-xl flex flex-col justify-center gap-5">
                                <div className='monthly-mortgage'>
                                    Monthly mortgage payment : 
                                    <p className='mt-3 w-fit bg-[#122f3f] rounded-md px-3 py-2'>
                                        {mortageResults.monthlyPayment.toFixed(2)}
                                    </p>
                                    <hr className='mt-3 border-[#cbd5e1]'/>
                                </div>

                                <div className='total-payment'>
                                    Total payment amount : 
                                    <p className='mt-3 w-fit bg-[#122f3f] rounded-md px-3 py-2'>
                                        {mortageResults.totalPayment.toFixed(2)}
                                    </p>
                                    <hr className='mt-3 border-[#cbd5e1]'/>
                                </div>

                                <div className='total-interest'>
                                    Total interest paid : 
                                    <p className='mt-3 w-fit bg-[#122f3f] rounded-md px-3 py-2'>
                                        {mortageResults.totalInterest.toFixed(2)}
                                    </p>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default MortageCalc;