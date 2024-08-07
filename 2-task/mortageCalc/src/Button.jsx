/* eslint-disable react/prop-types */
function Button({ loan, annualRate, annualTerm }) {
  return (
    <div>
      <button
        className="bg-green-400 hover:bg-green-500 focus:outline-offset-2 focus:outline-green-900 focus:ring-offset-2 focus:ring-green-500 focus:ring-2 duration-300 transition-all py-2 px-8 tracking-wide text-xl font-semibold rounded-full mt-3 inline-block disabled:cursor-not-allowed"
        type="submit"
        disabled={loan === '' || annualRate === '' || annualTerm === ''}
      >
        Calculate
      </button>
    </div>
  );
}

export default Button;
