import { useState } from 'react';
import './App.css';

const programmingData = [
  {
    Type: "Html",
    Data: "HTML stands for Hyper Text Markup Language HTML is the standard markup language for creating Web pages",
  
  },
  {
    Type: "CSS",
    Data: "CSS is the language we use to style an HTML document.",
    
  },
  {
    Type: "JavaScript",
    Data: "You never know js ",
    
  },
  {
    Type: "Reactjs",
    Data: "library not framework.",
  
  },
];

function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="main__container">
        <div className="tab__header">
        
            {programmingData.map((item, index) => (
              <li
                className={`tab__button ${activeTab === index ? 'active' : ''}`}
                key={index}
                onClick={() => setActiveTab(index)}
              >
                {item.Type}
              </li>
            ))}
        
        </div>
        <div className="tab__container">
          <div className="tab__content">
            <p>{programmingData[activeTab].Data}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
