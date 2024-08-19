const Strike = ({ winningCombination }) => {
  if (!winningCombination) return null;

  const [a, b, c] = winningCombination;
  let style = {};

  if ([0, 1, 2].every((v) => [a, b, c].includes(v)))
    style = { top: "16.67%", width: "100%" };
  else if ([3, 4, 5].every((v) => [a, b, c].includes(v)))
    style = { top: "50%", width: "100%" };
  else if ([6, 7, 8].every((v) => [a, b, c].includes(v)))
    style = { top: "83.33%", width: "100%" };
  else if ([0, 3, 6].every((v) => [a, b, c].includes(v)))
    style = { left: "16.67%", height: "100%", width: "2px" };
  else if ([1, 4, 7].every((v) => [a, b, c].includes(v)))
    style = { left: "50%", height: "100%", width: "2px" };
  else if ([2, 5, 8].every((v) => [a, b, c].includes(v)))
    style = { left: "83.33%", height: "100%", width: "2px" };
  else if ([0, 4, 8].every((v) => [a, b, c].includes(v)))
    style = {
      width: "141.4%",
      transform: "rotate(45deg)",
      top: "0",
      left: "0",
      transformOrigin: "top left",
    };
  else if ([2, 4, 6].every((v) => [a, b, c].includes(v)))
    style = {
      width: "141.4%",
      transform: "rotate(-45deg)",
      top: "0",
      right: "0",
      transformOrigin: "top right",
    };

  return (
    <div
      className="absolute bg-green-500"
      style={{
        ...style,
        height: style.height || "2px",
        transition: "all 0.3s ease",
      }}
    />
  );
};

export default Strike;
