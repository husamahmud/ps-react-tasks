import { useState } from "react";
import styles from "./MortgageCalculator.module.css";
import { motion } from "framer-motion";
// Example calculation for mortgage
/*
Example:

 ============ Given:
 amount = 200,000 dollars
 interest rate = 5%
 term = 30 years

  ============ Variables:
 p = loan amount
 r = monthly interest rate
 n = total number of payments
 M = monthly payment

  ============ Calculation:
 p = 200,000
 r = (5/100) / 12 = 0.00416667
 n = 30 * 12 = 360

  ============ Formula:
 M = P[r(1+r)^n] / [(1+r)^n - 1]

  ============ Monthly Payment:
 M = 200,000 * [0.00416667(1+0.00416667)^360] / [(1+0.00416667)^360 - 1]
 M = 1,073.64

  ============ Total Payment:
 total payment = 1,073.64 * 360 = 386,510.40

  ============ Total Interest:
 total interest = total payment - P = 186,510.40
*/

// Define interfaces for input and result data
interface MortgageResult {
  monthlyPayment: number;
  totalAmountPaid: number;
  totalBenefits: number;
}

interface MortgageInputs {
  principalAmount: number;
  loanTermYears: number;
  annualInterestRate: number;
}
interface ErrorsFormInputs {
  principalAmount: string;
  loanTermYears: string;
  annualInterestRate: string;
}
type opacity = "visible" | "hidden";

function MortgageCalculator(): JSX.Element {
  const [inputs, setInputs] = useState<MortgageInputs>({
    principalAmount: 0,
    loanTermYears: 0,
    annualInterestRate: 0,
  });
  const [opacity, setOpacity] = useState<opacity>("hidden");

  const [errors, setErrors] = useState<ErrorsFormInputs>({
    principalAmount: "",
    loanTermYears: "",
    annualInterestRate: "",
  });
  let isHidden = opacity === "hidden";
  console.log(isHidden);
  const [mortgageResult, setMortgageResult] = useState<MortgageResult | null>(
    null
  );

  const { principalAmount, loanTermYears, annualInterestRate } = inputs;

  // Handle input changes
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOpacity("hidden");
    const { name, value } = event.target;
    setInputs({ ...inputs, [name]: +value });
    setErrors({ ...errors, [name]: "" });
  };

  // Calculate mortgage
  const calculateMortgage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setOpacity("visible");
    let formErrors = { ...errors };
    if (principalAmount < 2000 || !isFinite(principalAmount)) {
      formErrors.principalAmount =
        "Please enter a valid loan amount at least 2000";
    }
    if (annualInterestRate <= 0 || annualInterestRate > 100) {
      formErrors.annualInterestRate = "Please enter a valid interest rate.";
    }
    if (loanTermYears <= 0 || loanTermYears > 30) {
      formErrors.loanTermYears = "Please enter a valid loan term.";
    }
    if (
      formErrors.annualInterestRate ||
      formErrors.loanTermYears ||
      formErrors.principalAmount
    ) {
      setErrors(formErrors);
      return;
    }

    // p = loan amount
    // r = monthly interest rate
    // n = total number of payments
    // M = monthly payment
    // Formula: M = P[r(1+r)^n] / [(1+r)^n - 1]
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    const totalPayments = loanTermYears * 12;
    const principal = principalAmount;
    const monthlyPayment =
      (principal *
        (monthlyInterestRate *
          Math.pow(1 + monthlyInterestRate, totalPayments))) /
      (Math.pow(1 + monthlyInterestRate, totalPayments) - 1);
    const totalAmountPaid = monthlyPayment * totalPayments;
    const totalBenefits = totalAmountPaid - principal;

    setMortgageResult({ monthlyPayment, totalAmountPaid, totalBenefits });

    // Clear input fields after calculation
    setInputs({
      principalAmount: 0,
      loanTermYears: 0,
      annualInterestRate: 0,
    });
  };

  return (
    <section className={styles.main}>
      <h1>Mortgage Calculator</h1>
      <motion.section
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: 1,
          ease: [0, 0.71, 0.2, 1.01],
        }}
        className={styles.content}
      >
        <form onSubmit={calculateMortgage}>
          <fieldset>
            <label htmlFor="principalAmount">Loan Amount (dollars):</label>
            <input
              value={principalAmount}
              onChange={handleInputChange}
              id="principalAmount"
              name="principalAmount"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              aria-describedby="principalAmountError"
            />
            {errors.principalAmount && (
              <span className={styles.error}>{errors.principalAmount}</span>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="annualInterestRate">
              Annual Interest Rate (%):
            </label>
            <input
              onChange={handleInputChange}
              value={annualInterestRate}
              id="annualInterestRate"
              name="annualInterestRate"
              type="text"
              inputMode="decimal"
              pattern="[0-9]*\.?[0-9]*"
              required
              aria-describedby="annualInterestRateError"
            />
            {errors.annualInterestRate && (
              <span className={styles.error}>{errors.annualInterestRate}</span>
            )}
          </fieldset>

          <fieldset>
            <label htmlFor="loanTermYears">Loan Term (years):</label>
            <input
              onChange={handleInputChange}
              value={loanTermYears}
              id="loanTermYears"
              name="loanTermYears"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              required
              aria-describedby="loanTermYearsError"
            />
            {errors.loanTermYears && (
              <span className={styles.error}>{errors.loanTermYears}</span>
            )}
          </fieldset>

          <button type="submit">Calculate</button>
        </form>

        <section className={styles.result}>
          <h2>Results</h2>
          <article>
            <div className={styles.mainResultBox}>
              <div className={styles.boxResult}>
                <h2>Monthly Payment: </h2>
                {mortgageResult && (
                  <p
                    style={
                      isHidden ? { opacity: 0 } : { opacity: 1, height: "auto" }
                    }
                  >
                    {mortgageResult.monthlyPayment.toFixed(2)}
                  </p>
                )}
              </div>

              <div className={styles.boxResult}>
                <h2>Total Amount Paid: </h2>
                {mortgageResult && (
                  <p
                    style={
                      isHidden ? { opacity: 0 } : { opacity: 1, height: "auto" }
                    }
                  >
                    {mortgageResult.totalAmountPaid.toFixed(2)}
                  </p>
                )}
              </div>
              <div className={styles.boxResult}>
                <h2>Total Benefits: </h2>
                {mortgageResult && (
                  <p
                    style={
                      isHidden ? { opacity: 0 } : { opacity: 1, height: "auto" }
                    }
                  >
                    {mortgageResult.totalBenefits.toFixed(2)}
                  </p>
                )}
              </div>
            </div>
          </article>
        </section>
      </motion.section>
    </section>
  );
}

export default MortgageCalculator;
