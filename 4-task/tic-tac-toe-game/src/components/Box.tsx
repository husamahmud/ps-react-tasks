import React from 'react';

interface IBoxProps {
    box : string;
    id : number;
    boxes : string[];
    player : string;
    setBoxes : React.Dispatch<React.SetStateAction<string[]>>;
    setPlayer : React.Dispatch<React.SetStateAction<string>>;
}



function Box({box  , id, boxes , setBoxes , player , setPlayer} : IBoxProps) {

    const handleClick = (e : React.MouseEvent<HTMLDivElement>) => {
        const targetBox : number = +e.currentTarget.id;

        // check if the box contain x or o----
        if(boxes[targetBox]) return;

        // change the player----
        setPlayer(player === "x" ? "o" : "x");

        // copy the boxesArray--
        const updatedBoxes = [...boxes];
        // update the updatedBoxes-
        updatedBoxes[targetBox] = player;
        // update the setBoxes
        setBoxes(updatedBoxes);
    }
    
    return (
        <div id={`${id}`} className='select-none w-[calc((100%-40px)/3)] min-h-[100px] bg-[#1f3540] rounded-[12px] shadow-[0px_6px_0_0_#102129] flex justify-center items-center'
            onClick={handleClick}
        >
            <span className={`scale-[4] ${box === "x" ? "text-[#31c4be]" : "text-[#f2b237]"}`}>{box}</span>
        </div>
    )
}

export default Box;