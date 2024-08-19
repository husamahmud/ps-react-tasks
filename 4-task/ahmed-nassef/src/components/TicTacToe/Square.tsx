import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";

interface SquareProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {
  value: "X" | "O";
}

const Square = ({ value, ...props }: SquareProps) => {
  // const [value, setValue] = useState<string>("");

  return (
    <button
      // onClick={() => setValue("x")}
      style={{ border: "1px solid white" }}
      className={`flex items-center justify-center ${
        value == "X" ? "text-red-500" : "text-blue-300"
      } rounded-md bg-black hover:bg-black/80 transition-colors duration-200  text-white h-10 w-10 p-4`}
      {...props}
    >
      {value}
    </button>
  );
};

export default Square;
