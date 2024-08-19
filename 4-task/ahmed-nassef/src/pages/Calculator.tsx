import { useEffect, useState } from "react";
import InputContainer from "../components/bits/Input";
import Label from "../components/bits/Label";
import Separator from "../components/bits/Separator";
import { Tab, Tabs } from "../components/bits/Tabs";

const Calculator = () => {
  const [userLoanInput, setUserLoanInput] = useState({
    loanAmount: 0,
    LoanTerm: 0,
    Interest: 0,
  });
  const [calculationResult, setCalculationResult] = useState("");

  useEffect(() => {
    calculateLoan();
  }, [userLoanInput]);

  const calculateLoan = () => {
    const { Interest, LoanTerm: term, loanAmount: amount } = userLoanInput;

    if (Interest <= 0 || term <= 0 || amount <= 0) {
      return;
    }

    const monthlyInterestRate = Interest / 12 / 100;

    // Convert term from years to months
    const termInMonths = term * 12;

    // Calculate the monthly payment
    const monthlyPayment =
      (amount *
        monthlyInterestRate *
        Math.pow(1 + monthlyInterestRate, termInMonths)) /
      (Math.pow(1 + monthlyInterestRate, termInMonths) - 1);

    const formattedMonthlyPayment = new Intl.NumberFormat("en-US", {
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(monthlyPayment);

    setCalculationResult(formattedMonthlyPayment);
  };

  return (
    <section
      id="body"
      className="w-full h-[100vh] flex items-center justify-center"
    >
      <div className="w-1/2">
        <h1>Calulator</h1>
        <div className="flex">
          <div className="left flex-1">
            <Tabs bodyClassName="text-sm">
              <Tab
                tabKey={Math.round(Math.random() * 10000)}
                title="Monthly Payment"
              >
                <div className="loan_amount mt-4">
                  <InputContainer
                    value={userLoanInput.loanAmount}
                    onChange={(e) => {
                      setUserLoanInput((prev) => {
                        return { ...prev, loanAmount: Number(e.target.value) };
                      });
                    }}
                    placeholder="Loan Amount"
                    className="w-full"
                    type="number"
                    id="loan_amount"
                  >
                    <Label>Loan Amount</Label>
                  </InputContainer>
                </div>
                <div className="term_interest flex gap-6  items-center mt-4">
                  <InputContainer
                    value={userLoanInput.LoanTerm}
                    type="number"
                    id="loan_term"
                    containerClassName="flex-1"
                    className="w-full"
                    placeholder="Loan Term"
                    prefix=""
                    onChange={(e) => {
                      setUserLoanInput((prev) => {
                        return { ...prev, LoanTerm: Number(e.target.value) };
                      });
                    }}
                  >
                    <Label>Loan Term (in years)</Label>
                  </InputContainer>
                  <InputContainer
                    value={userLoanInput.Interest}
                    className="max-w-28"
                    type="number"
                    id="loan_interest"
                    prefix="%"
                    onChange={(e) => {
                      setUserLoanInput((prev) => {
                        return { ...prev, Interest: Number(e.target.value) };
                      });
                    }}
                  >
                    <Label>Interest</Label>
                  </InputContainer>
                </div>
              </Tab>
              <Tab
                tabKey={Math.round(Math.random() * 10000)}
                title="Purshace Budget"
              >
                Another content
              </Tab>
            </Tabs>
          </div>
          <Separator className="mx-4" />
          <div className="right flex-1">
            {calculationResult ? (
              <>
                <h3 className="text-sm">Monthly Payment</h3>
                <p>
                  $ <span className="text-3xl">{calculationResult}</span>
                </p>
              </>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Calculator;
