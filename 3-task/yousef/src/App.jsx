import React, { useState } from "react";
import Button from "../src/components/button/Button";
import styles from "../src/components/button/button.module.css";

const answers = {
  html: "HTML stands for HyperText Markup Language. It's the standard markup language used for creating web pages and web applications.",
  css: "CSS stands for Cascading Style Sheets. It's a style sheet language used to describe the look and formatting of a document written in HTML or XML.",
  javascript:
    "JavaScript is a programming language that adds interactivity to web pages. It's used to create dynamic and interactive web applications.",
};

function App() {
  const [content, setContent] = useState(answers.html);
  const [activeButton, setActiveButton] = useState("html");

  const handleClick = (text) => {
    setContent(answers[text.toLowerCase()]);
    setActiveButton(text.toLowerCase());
  };

  return (
    <>
      <div className="button-container">
        <Button
          text="html"
          className={activeButton === "html" ? styles.active : ""}
          onClick={() => handleClick("html")}
        />
        <Button
          text="css"
          className={activeButton === "css" ? styles.active : ""}
          onClick={() => handleClick("css")}
        />
        <Button
          text="javascript"
          className={activeButton === "javascript" ? styles.active : ""}
          onClick={() => handleClick("javascript")}
        />
      </div>
      <section
        className="answer"
        style={{ fontSize: "1.2rem", wordSpacing: "2px" }}
      >
        {content}
      </section>
    </>
  );
}

export default App;
