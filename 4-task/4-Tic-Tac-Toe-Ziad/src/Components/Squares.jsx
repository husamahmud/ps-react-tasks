const Squares = ({ value, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="flex justify-center items-center text-3xl border-2"
    >
      {value}
    </div>
  );
};

export default Squares;
