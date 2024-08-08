import { DetailedHTMLProps, HTMLAttributes } from "react";

interface SeparatorProps
  extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  dir?: "vertical" | "horizontal";
}

const Separator = ({
  dir = "vertical",
  className,
  ...props
}: SeparatorProps) => {
  if (dir == "horizontal") return;
  //   this behavior is so weird
  return (
    <div
      className={`separator w-[1px] bg-zinc-400 block py-3 ${className}`}
      {...props}
    ></div>
  );
};

export default Separator;
