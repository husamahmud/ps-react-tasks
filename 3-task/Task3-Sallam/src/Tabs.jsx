import { useState } from "react";

const Tabs = () => {
  const [activeTab, setActiveTab] = useState("html");

  const tabData = {
    html: "HTML provides the skeleton of a webpage, organizing content into meaningful sections. It forms the foundation upon which websites are built.",
    css: "Cascading Style Sheets is a style sheet language used for describing the look and formatting of a document written in a markup language.",
    js: "JavaScript is the logic behind interactive web elements. It allows users to interact with the page, making the experience more engaging and functional.",
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tabs">
      <h1>Tabs Task</h1>

      <div className="tabs-buttons">
        <button
          className={activeTab === "html" ? "active" : ""}
          onClick={() => handleTabClick("html")}
        >
          HTML
        </button>
        <button
          className={activeTab === "css" ? "active" : ""}
          onClick={() => handleTabClick("css")}
        >
          CSS
        </button>
        <button
          className={activeTab === "js" ? "active" : ""}
          onClick={() => handleTabClick("js")}
        >
          JavaScript
        </button>
      </div>

      <div className="tab-content">
        <p>{tabData[activeTab]}</p>
      </div>
    </div>
  );
};

export default Tabs;
