import { useEffect, useState } from "react";
import Box from "./components/Box";
import WinnerPopUp from "./components/WinnerPopUp";
import ScoreBoxes from "./components/ScoreBoxes";
import winnerSound from "./assets/winning-218995.mp3";
import drawSound from "./assets/violin-lose-4-185125.mp3";



function App() {

  const [boxs , setBoxes] = useState<string[]>(["" , "" , "", "" , "" , "" , "" , "" , ""]);
  const [player , setPlayer] = useState<string>("x");
  const [showpop , setShowpop] = useState<boolean>(false);
  const [winnerMessage , setWinnerMessage] = useState<string>("");
  const [scoreBoxes , setScoreBoxes] = useState([
    {title:"x score" , score:0},
    {title:"o score" , score:0},
    {title:"draw" , score:0}
  ]);


  const checkWinner = () => {
    // box of possibility
    const possibilityBox = [
      [0,1,2] , [3,4,5] , [6,7,8],
      [0,3,6] , [1,4,7] , [2,5,8],
      [0,4,8] , [2,4,6]
    ];

    // check on possibility boxes and which box os true
    possibilityBox.forEach(possibleBox => {

      const xWins = possibleBox.every(box => boxs[box] === "x");
      if(xWins) {
        // play the winnerSound
        const winnerSoundEffect = new Audio(winnerSound);
        winnerSoundEffect.play();

        // show WinnerPopUp
        setShowpop(true);
        // change the winnerMessage
        setWinnerMessage("player x is the");
        // update the scoreBoxes----
        updateScoreBoxes("x score");
        return;
      }

      const oWins = possibleBox.every(box => boxs[box] === "o");
      if(oWins) {
        // play the winnerSound
        const winnerSoundEffect = new Audio(winnerSound);
        winnerSoundEffect.play();

        // show WinnerPopUp
        setShowpop(true);
        // change the winnerMessage
        setWinnerMessage("player o is the");
        // update the scoreBoxes----
        updateScoreBoxes("o score");
        return;
      }

      // handle draw-----
      const allBoxesNotEmpty = boxs.every(box => box !== "");
      if(!(xWins && oWins) && allBoxesNotEmpty) {
        // play the drawSound
        const drawSoundEffect = new Audio(drawSound);
        drawSoundEffect.play();
        
        // show WinnerPopUp
        setShowpop(true);
        // change the winnerMessage
        setWinnerMessage("no player won");
        // update the scoreBoxes----
        updateScoreBoxes("draw");
      }
    });
  };


  // update the scoreBoxes----
  function updateScoreBoxes(wantedBox: string) {
    const newScoreBoxes = scoreBoxes.map((scoreBox) => scoreBox.title.includes(wantedBox) ? 
    { ...scoreBox, score: scoreBox.score + 1 } : scoreBox);
    setScoreBoxes(newScoreBoxes);
  }


  // for evrey Round----
  const reset = () => {
    setBoxes(["" , "" , "", "" , "" , "" , "" , "" , ""]);
    setPlayer("x");
  }


  // resetAll game----
  const resetAll = () => {
    reset();
    setScoreBoxes([
      {title:"x score" , score:0},
      {title:"o score" , score:0},
      {title:"draw" , score:0}
    ]);
  }


  // check every time when the boxs changes
  useEffect(() => {
    checkWinner();
  } , [boxs]);


  return (
    // gamebox
    <div className="container p-4 h-[95vh] flex flex-col gap-[30px]">
      {/* head box */}
      <div className='head-box flex-wrap flex justify-between items-center text-[#a8bec9] gap-12'>
            <div className="xo-box text-[40px] font-bold">
                <span className="text-[#31c4be] mr-[10px]">x</span>
                <span className="text-[#f2b237]">o</span>
            </div>

            <div className="w-44 text-center bg-[#1f3540] p-[1rem] rounded-[15px] shadow-[0px_6px_0_0_#102129]">
                <span className={`text-[30px] font-bold ${player === "x" ? "text-[#31c4be]" : "text-[#f2b237]"}`}>{player}</span> 
                <span className="ml-4 text-[25px] font-bold">Turn</span>
            </div>

            <button onClick={resetAll} type='button' className="reset bg-[#a8bec9] text-[#374d58] w-[50px] h-[50px] text-[30px] font-bold cursor-pointer rounded-[15px] shadow-[0_5px_0_0_#6c8997] transition duration-400 ease-in-out active:translate-y-[5px]">
                &#8635;
            </button>
        </div>

      {/* boxes */}
      <div className="w-full flex gap-[20px] flex-wrap h-full">
        {
          boxs.map((box , i) => <Box key={i} id = {i} box = {box} boxes = {boxs} setBoxes = {setBoxes}
            player = {player} setPlayer = {setPlayer}
          />)
        }
      </div>

      {/* scoreBoxes */}
      <div className="flex items-center gap-[20px]">
        {scoreBoxes.map((scoreBox, i) => <ScoreBoxes key={i} scoreBoxData = {scoreBox}/>)}
      </div>

      {/* winner message */}
      {showpop && <WinnerPopUp showpop = {showpop} setShowpop = {setShowpop} reset ={reset}
      winnerMessage = {winnerMessage}/>}
    </div>
  )
}

export default App;
