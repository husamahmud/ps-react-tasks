import { useRef, useState } from "react";
import FloatLabel from "./components/FloatLabel";
import { CalculateMrtageForm } from "./utils/CalculateMortgageForm";

function App() {
  const formRef = useRef<HTMLFormElement>(null);
  const [amount, setAmount] = useState<number | string>("");
  const [amountError, setAmountError] = useState<boolean>(false);
  const [amountErrorMessage, setAmountErrorMessage] = useState<string>("");
  const [rate, setRate] = useState<number | string>("");
  const [rateError, setRateError] = useState<boolean>(false);
  const [rateErrorMessage, setRateErrorMessage] = useState<string>("");
  const [term, setTerm] = useState<number | string>("");
  const [termError, setTermError] = useState<boolean>(false);
  const [termErrorMessage, setTermErrorMessage] = useState<string>("");
  const [monthlyMorgtage, setMonthlyMorgtage] = useState<number>(0);
  const [submitDisabled, setSubmitDisabled] = useState<boolean>(true);

  function checkNonNumericValid(value: any) {
    let number = parseInt(value);
    return new Promise((resolve, reject) => {
      if (value === "") {
        reject("This Field Is Required");
      } else if (isNaN(number)) {
        reject("This Field must be a number");
      } else if (number <= 0) {
        reject("Must be greater than 0");
      } else {
        resolve("");
      }
    });
  }

  function changeAmount(event: React.ChangeEvent<HTMLInputElement>) {
    checkNonNumericValid(event.target.value)
      .then((res: any) => {
        setAmount(parseInt(event.target.value));
        setAmountError(false);
        setSubmitDisabled(false);
      })
      .catch((error: string) => {
        setAmount(event.target.value);
        setAmountErrorMessage(error);
        setAmountError(true);
      });
  }

  function changeRate(event: React.ChangeEvent<HTMLInputElement>) {
    checkNonNumericValid(event.target.value)
      .then((res: any) => {
        checkMaxAndMin(event.target.value, 100, 0)
          .then(() => {
            setRate(parseInt(event.target.value));
            setRateError(false);
            setSubmitDisabled(false);
          })
          .catch((error: string) => {
            setRate(event.target.value);
            setRateErrorMessage(error);
            setRateError(true);
          });
      })
      .catch((error: string) => {
        setRate(event.target.value);
        setRateErrorMessage(error);
        setRateError(true);
      });
  }
  function changeTerm(event: React.ChangeEvent<HTMLInputElement>) {
    checkNonNumericValid(event.target.value)
      .then((res: any) => {
        setTerm(parseInt(event.target.value));
        setTermError(false);
        setSubmitDisabled(false);
      })
      .catch((error: string) => {
        setTerm(event.target.value);
        setTermErrorMessage(error);
        setTermError(true);
      });
  }

  function checkMaxAndMin(value: any, max: number, min: number) {
    let number = parseInt(value);
    return new Promise((resolve, reject) => {
      if (number <= min) {
        reject(`Must be greater than ${min}`);
      } else if (number >= max) {
        reject(`Must be less than ${max}`);
      } else {
        resolve("");
      }
    });
  }

  function calculate(e: any) {
    e.preventDefault();
    console.log(e.target.amount.value);
    let amountInput = e.target.amount.value;
    let rateMonthly = e.target.rate.value / 1200;
    let termInput = e.target.term.value * 12;
    let x = (1 + rateMonthly) ** termInput;
    let monthlyMortgage = (amountInput * (rateMonthly * x)) / (x - 1);
    setMonthlyMorgtage(Math.round(monthlyMortgage * 100) / 100);
  }

  function handleReset() {
    formRef?.current?.reset();
    setAmount("");
    setAmountError(false);
    setAmountErrorMessage("");
    setRate("");
    setRateError(false);
    setRateErrorMessage("");
    setTerm("");
    setTermError(false);
    setTermErrorMessage("");
    setSubmitDisabled(true);
    setMonthlyMorgtage(0);
  }
  return (
    <div className="App">
      <div>Mortgage Loan</div>
      <div>Calculator</div>
      <div className="flex flex-row">
        <div className="flex flex-col gap-5 border-r p-5 m-5">
          <form
            ref={formRef}
            name="Calculator"
            onSubmit={calculate}
            id="calculateForm"
          >
            <div className="py-3">
              <FloatLabel label="Loan Amount" value={amount}>
                <input
                  onChange={changeAmount}
                  autoFocus
                  className="border-[1px] rounded-md h-[45px] px-1 "
                  name="amount"
                />
                {amountError ? (
                  <div className=" text-sm text-[red] p-1">
                    {amountErrorMessage}
                  </div>
                ) : (
                  <></>
                )}
              </FloatLabel>
            </div>
            <div className="flex flex-row gap-5">
              <FloatLabel label="Loan Term" value={term}>
                <input
                  className="border-[1px] rounded-md h-[45px] px-1 "
                  onChange={changeTerm}
                  type="number"
                  name="term"
                />
                {termError ? (
                  <div className=" text-sm text-[red] p-1">
                    {termErrorMessage}
                  </div>
                ) : (
                  <></>
                )}
              </FloatLabel>

              <FloatLabel label="Annual Interest" value={rate}>
                <input
                  className="border-[1px] rounded-md h-[45px] px-1 "
                  onChange={changeRate}
                  name="rate"
                />
                {rateError ? (
                  <div className=" text-sm text-[red] p-1">
                    {rateErrorMessage}
                  </div>
                ) : (
                  <></>
                )}
              </FloatLabel>
            </div>
            <div className="flex flex-row gap-5 mt-5">
              <input
                type="submit"
                className="border-[1px] border-gray-400 rounded-lg p-2 cursor-pointer text-black hover:bg-slate-400 disabled:bg-slate-400 disabled:cursor-not-allowed disabled:text-gray-500"
                disabled={
                  submitDisabled || amountError || termError || rateError
                }
              />
              <button type="button" onClick={handleReset}>
                Reset
              </button>
            </div>
          </form>
        </div>
        <div>
          <div>Monthly Payment</div>
          <div>{monthlyMorgtage}</div>
        </div>
      </div>
    </div>
  );
}

export default App;
