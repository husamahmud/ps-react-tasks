import React from "react";
import Button from "../src/components/button/Button";
import styles from "../src/components/button/button.module.css";

function App() {
  return (
    <>
      <div className="button-container">
        <Button
          text="html"
          className={styles.active}
          style={{ color: "green" }}
        />
        <Button text="css" />
        <Button text="javascript" />
      </div>
      <section
        className="answer"
        style={{ fontSize: "1.2rem", wordSpacing: "2px" }}
      >
        HTML stands for HyperText Markup Language. It's the standard markup
        language used for creating web pages and web applications.
      </section>
    </>
  );git reset HEAD

}

export default App;
