import React from 'react'

interface IScoreBoxesProps {
    scoreBoxData : {
        title : string;
        score: number;
    }
}

function ScoreBoxes({scoreBoxData} : IScoreBoxesProps) {
    
    return (
        <div className={`text-white capitalize select-none p-2 w-[calc((100%-40px)/3)] flex flex-col items-center justify-center min-h-[70px] rounded-[12px] shadow-[0px_6px_0_0_#102129]
        ${scoreBoxData.title.includes("x") ? "bg-[#31c4be]" : 
            scoreBoxData.title.includes("o score") ? "bg-[#f2b237]" : "bg-[#3df237]"}`}>
            <p>{scoreBoxData.title}</p>
            <p>{scoreBoxData.score}</p>
        </div>
    )
}

export default ScoreBoxes;