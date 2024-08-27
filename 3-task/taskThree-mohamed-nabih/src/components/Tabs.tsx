import { useState } from "react";
import styles from "./Tabs.module.css";

// Define the shape of a single tab
interface TabsData {
  id: number;
  header: string;
  body: string;
  content: string;
  date: string;
  author: string;
}

// Define the props for the Tabs component
interface TabsProps {
  tabs: TabsData[];
}

// Tabs component
const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  // Use the useState hook to manage the active tab index
  const [activeTab, setActiveTab] = useState<number>(0);

  // Render the tabs and content
  return (
    <>
      {/* Render the tab buttons */}
      <nav>
        {tabs.map((tab, index) => (
          <button
            className={`${styles.tabBtn} ${
              activeTab === index ? styles.active : ""
            }`}
            key={tab.id}
            onClick={() => setActiveTab(index)}
          >
            {tab.header}
          </button>
        ))}
      </nav>

      {/* Render the content of the active tab */}
      <main className={styles.tabContents}>
        <h1>Description: {tabs[activeTab].body}</h1>
        <h2>Content: {tabs[activeTab].content}</h2>
        <h3>Date: {tabs[activeTab].date}</h3>
        <small>Author: {tabs[activeTab].author}</small>
      </main>
    </>
  );
};

export default Tabs;
