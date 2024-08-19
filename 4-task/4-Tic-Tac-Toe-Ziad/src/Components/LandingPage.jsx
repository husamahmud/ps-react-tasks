import cover from "../assets/cover-start.png";

const LandingPage = ({ onStart }) => {
  return (
    <div className="flex items-center justify-center h-screen ">
      <img src={cover} className="w-full h-full" alt="Cover" />
      <button
        className="absolute top-[75%] -translate-y-12 px-8 py-4 bg-blue-800 text-xl rounded-lg hover:bg-blue-900 shadow-lg"
        onClick={onStart}
      >
        Start Game
      </button>
    </div>
  );
};

export default LandingPage;
