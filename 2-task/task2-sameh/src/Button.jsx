/* eslint-disable react/prop-types */
function Button({ loan, annualRate, annualTerm }) {
  return (
    <div className="text-center">
      <button
        className="bg-green-500 px-4 py-2 rounded-md disabled:cursor-not-allowed "
        type="submit"
        disabled={loan === '' || annualRate === '' || annualTerm === ''}
      >
        Calculate
      </button>
    </div>
  );
}

export default Button;
