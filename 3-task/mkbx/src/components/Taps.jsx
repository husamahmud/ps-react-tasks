import { useState } from "react";
import "../style/style.css";
const Tabs = () => {
  const [activeTab, setActiveTab] = useState(1);

  const tabContent = [
    {
      label: "HTML",
      content:
        "HTML (HyperText Markup Language) is the standard markup language for creating web pages.",
    },
    {
      label: "CSS",
      content:
        "CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML.",
    },
    {
      label: "JavaScript",
      content:
        "JavaScript is a programming language commonly used in web development to create interactive effects within web browsers.",
    },
  ];

  return (
    <div className="container">
      <div className="tabs">
        <div className="tab-buttons">
          {tabContent.map((tab, index) => (
            <button
              key={index}
              className={activeTab === index ? "active" : ""}
              onClick={() => setActiveTab(index)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="tab-content">{tabContent[activeTab].content}</div>
      </div>
    </div>
  );
};

export default Tabs;
