function Error({ error }) {
  return (
    <div className=" w-1/2 space-y-5 py-3 px-4 pl-10 flex justify-center items-center">
      <p className="text-red-700 bg-red-300 p-2 rounded-md">{error}</p>
    </div>
  );
}

export default Error;
