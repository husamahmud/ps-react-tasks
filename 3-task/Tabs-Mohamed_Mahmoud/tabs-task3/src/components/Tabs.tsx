// import React from 'react';

// get the tabs data---
import { useState } from 'react';

export interface ITabs {
    id: number;
    title: string;
    content: string;
}

interface ITabsProps {
    tabs: ITabs[];
}


function Tabs({tabs} : ITabsProps) {


    const [activeTab , setActiveTab] = useState<number>(3);

    return (
        <div className="container bg-[#dfe6ed] rounded-[48px] border-[16px] border-solid border-[#ebf0f4] overflow-hidden shadow-[16px_16px_48px_#7d828a30] h-[80%]">
            <div className="boxes h-full flex items-center gap-5">
                <div className="bg-[#ebf0f4] h-full flex-1" role="tabs">
                    <ul className="h-full flex flex-col items-center justify-between flex-wrap list-none">
                        {
                            tabs.map(tab => 
                                <li
                                    key={tab.id}
                                    className={
                                        `w-full text-center uppercase text-2xl font-bold cursor-pointer text-[#525d6f] opacity-40 hover:opacity-100 transition duration-700 ease-in-out select-none p-4
                                        ${activeTab === tab.id && 'active'}`
                                    }
                                    onClick={() => setActiveTab(tab.id)}
                                >
                                    {tab.title}
                                </li>
                            )
                        }
                    </ul>
                </div>

                <div className="h-[45vh] flex justify-center items-center p-12 text-2xl overflow-y-scroll flex-[3.5]" role="tabpanel ">
                    {tabs.find(tab => tab.id === activeTab)?.content}
                </div>
            </div>
        </div>
    );
}

export default Tabs;
