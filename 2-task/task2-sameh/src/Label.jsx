/* eslint-disable react/prop-types */
function Label({ placeholder, inputVal, setInputVal, icon }) {
  return (
    <label className="relative h-10">
      <input
        className="bg-stone-300 w-3/4 h-full pl-2 rounded-l-md"
        type="text"
        placeholder={placeholder}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />

      <span className="absolute top-0 right-0 flex justify-center items-center w-1/4 h-full bg-stone-400 rounded-r-md">
        {icon}
      </span>
    </label>
  );
}

export default Label;
