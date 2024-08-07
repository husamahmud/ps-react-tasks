function Placeholder() {
  return (
    <div className="w-1/2 space-y-5 py-3 px-4 pl-10 flex justify-center items-center">
      <div className="span-container text-1xl">
        <p className="span">
          Enter details about your loan to calculate{' '}
          <span className="deco">monthly payment</span>,{' '}
          <span className="deco">total payment amount</span> and{' '}
          <span className="deco">total interest paid</span>.
        </p>
      </div>
    </div>
  );
}

export default Placeholder;
