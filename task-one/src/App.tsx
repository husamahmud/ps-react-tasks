import styles   from "./App.module.css";

function App(): JSX.Element {
  return (
    <section className={styles.container}>
      <header className={styles.header}>Header</header>
      <section className={styles.columns}>
        <nav className={styles.navigation}>Navigation</nav>
        <main className={styles.main}>Main</main>
        <aside className={styles.sidebar}>Sidebar</aside>
      </section>
      <footer className={styles.footer}>Footer</footer>
    </section>
  );
}

export default App;
