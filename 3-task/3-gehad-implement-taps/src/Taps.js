import { useState } from "react";

function Taps() {
  const [activeTab, setActiveTab] = useState("HTML");

  const tabContentMap = {
    HTML: <h3>HTML is HyperText Markup Language</h3>,
    CSS: <h3>CSS is Cascading Style Sheets</h3>,
    JS: <h3>JS is JavaScript</h3>,
  };

  const tabs = ["HTML", "CSS", "JS"];

  return (
    <div className="my-12">
      <div className="w-2/4 mx-auto mt-24 flex justify-around bg-purple-900 rounded overflow-hidden">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-2 text-white font-bold text-2xl transition-colors duration-300 ${
              activeTab === tab
                ? "bg-purple-600 text-red-300"
                : "hover:bg-purple-600"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="w-2/4 mx-auto p-8 border-2 border-purple-500 rounded text-purple-950 font-bold min-h-[100px]">
        {tabContentMap[activeTab]}
      </div>
    </div>
  );
}

export default Taps;
