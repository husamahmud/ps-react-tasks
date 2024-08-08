import Tabs from "./components/Tabs";
import { tabsData } from "./components/tabsData";

function App() {
  return (
    <div>
      <Tabs tabs={tabsData} />
    </div>
  );
}

export default App;
