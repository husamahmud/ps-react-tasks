import React, { useEffect, useState } from 'react';

interface IWinnerPopUpProps {
    showpop : boolean;
    winnerMessage : string;
}

function WinnerPopUp({showpop , winnerMessage} : IWinnerPopUpProps) {

    const [messageAnimate , setMessageAnimate] = useState<boolean>(false);

    useEffect(() => {
        setMessageAnimate(showpop);
    } , []);

    return (
        <div className={`popup fixed top-0 left-0 w-full h-full bg-[#0000009f] z-[100] flex items-center transition-opacity opacity-0
        ${showpop && "opacity-100"}`}>

            <div className={`message bg-[#192a32] w-full flex flex-col items-center p-[2rem_1rem]
            ${messageAnimate ? "translate-x-[0]" : "translate-x-[-100%]"}`}>
                <h1 className='text-white text-[3rem] mb-[2rem] capitalize select-none'>{winnerMessage}</h1>
                <h2>10</h2>
                <img src="https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHJ0eHBkM2RuYXhjdDRpaTAxMGdjeHkxNWxoYml3cTNiM3BseTJ6aiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/ljVVmnTyiPjEcqvUfF/giphy.webp" alt="winner-gif" />
            </div>
        </div>
    )
}

export default WinnerPopUp;