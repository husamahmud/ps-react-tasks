function Label({ placeholder, inputVal, setInputVal }) {
  return (
    <label className="relative block">
      <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-stone-500">
        $
      </span>
      <input
        className="rounded-md py-2 px-4 focus:outline-none focus:outline-green-500"
        type="text"
        placeholder={placeholder}
        value={inputVal}
        onChange={(e) => setInputVal(e.target.value)}
      />
    </label>
  );
}

export default Label;
