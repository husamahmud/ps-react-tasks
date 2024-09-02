import {
  Children,
  HTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
} from "react";
import Separator from "./Separator";
// this is a very naive approach without considering a11y. but I don't want to re-invent the wheel
// just use radixUI or nextUI

// it requires performance improvements
interface TabsProps extends HTMLAttributes<HTMLDivElement> {
  bodyClassName?: string;
}

const Tabs = ({ children, bodyClassName }: TabsProps) => {
  const ChildrenArray = Children.toArray(children);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  const TabsLinks = ChildrenArray.map((child, idx) => {
    const { tabKey, title } = (child as ReactElement).props;

    return (
      <>
        <button
          key={tabKey}
          className={`${
            activeTabIndex === idx ? "bg-zinc-200" : ""
          } px-4 py-2 m-2 w-full rounded-md text-sm transition-all duration-500`}
          onClick={() => setActiveTabIndex(idx)}
        >
          {title}
        </button>
        {idx === ChildrenArray.length - 1 ? "" : <Separator />}
      </>
    );
  });

  console.log(ChildrenArray[activeTabIndex].props.children);
  return (
    <div className="tab">
      <div className="tab_links text-sm flex items-center border rounded-md border-gray-300">
        {TabsLinks}
      </div>
      <div className={`tab_content ${bodyClassName}`}>
        {ChildrenArray[activeTabIndex].props.children}
      </div>
    </div>
  );
};

interface TabProps {
  tabKey: string | number;
  title: string;
  children: ReactNode;
}

const Tab = ({ children }: TabProps) => {
  return children;
};

export { Tabs, Tab };
