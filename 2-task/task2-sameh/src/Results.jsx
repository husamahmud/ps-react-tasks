/* eslint-disable react/prop-types */
function Results({ monthlyPayment, totalPayment, totalInterestPaid }) {
  return (
    <div className="w-full font-medium divide-y-2 divide-dashed">
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
  );
}

export default Results;
