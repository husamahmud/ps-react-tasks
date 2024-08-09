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

  return (
    <>
    <div className="main__container">
      <div className="tab__header">
    {programmingData.map((item, index) => (
        <li className="tab__button active" key= {index}>
          {item.Type}
        </li>
      ))}
      </div>
      <div className="tab__container">
        <div className="tab__content">
          {programmingData.map((data, index) => (
            <div key={index}>
              <p>{data.Data}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  </>
  );
}

export default App;
