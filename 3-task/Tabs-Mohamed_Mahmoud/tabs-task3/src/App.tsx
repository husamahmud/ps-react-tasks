import Tabs, { ITabs } from "./components/Tabs";



function App() {

  const tabsData : ITabs[] = [
    { id: 1, title: 'html', content: 'HTML (HyperText Markup Language) is the standard markup language for documents designed to be displayed in a web browser. It defines the meaning and structure of web content. It\'s often assisted by technologies such as Cascading Style Sheets (CSS) and scripting languages such as JavaScript.' },
    { id: 2, title: 'css', content: 'CSS (Cascading Style Sheets) is a stylesheet language used to describe the presentation of a document written in HTML or XML. CSS describes how elements should be rendered on screen, on paper, in speech, or on other media. It can control the layout of multiple web pages all at once, enabling responsive designs.' },
    { id: 3, title: 'javascript', content: 'JavaScript is a high-level, interpreted programming language that conforms to the ECMAScript specification. JavaScript has curly-bracket syntax, dynamic typing, prototype-based object-orientation, and first-class functions. Alongside HTML and CSS, it is one of the core technologies of the World Wide Web.' },
    { id: 4, title: 'typescript', content: 'TypeScript is a programming language developed and maintained by Microsoft. It is a strict syntactical superset of JavaScript and adds optional static typing to the language. TypeScript is designed for the development of large applications and transcompiles to JavaScript.' },
    { id: 5, title: 'tailwind', content: 'Tailwind CSS is a utility-first CSS framework for rapidly building custom user interfaces. It is a highly customizable, low-level CSS framework that gives you all of the building blocks you need to build bespoke designs without any annoying opinionated styles you have to fight to override.' },
    { id: 6, title: 'react.js', content: 'React (also known as React.js or ReactJS) is an open-source, front end, JavaScript library for building user interfaces or UI components. It is maintained by Facebook and a community of individual developers and companies. React can be used as a base in the development of single-page or mobile applications.' },
];

  return (
    <>
      <Tabs tabs={tabsData}/>
    </>
  )
}

export default App;
