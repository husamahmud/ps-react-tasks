import styles from "./styles.module.css";

function App() {
  return (
    <section id="body" className={styles.body}>
      <div className={styles.calculator__container}>
        <h1>Calulator</h1>
        <div className={styles.calculator__body}>
          <div className="left" style={{ flex: 1 }}>
            <div className="tabs__links">
              <button className={styles.tab_link} role="tablist">
                monthly
              </button>
              <button className={styles.tab_link} role="tablist">
                payment
              </button>
            </div>
            <div className="tab__body">BODY</div>
          </div>
          <div className="right" style={{ flex: 1 }}>
            result
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
