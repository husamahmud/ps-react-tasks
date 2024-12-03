/* eslint-disable react/prop-types */
function Error({ error }) {
  return (
    <div className="font-semibold leading-8 tracking-wider">
      <p className="bg-red-400 p-2 rounded-md sm:mt-12">{error}</p>
    </div>
  );
}

export default Error;
