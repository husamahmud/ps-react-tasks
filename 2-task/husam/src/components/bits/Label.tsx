import { DetailedHTMLProps, LabelHTMLAttributes } from "react";

interface LabelProps
  extends DetailedHTMLProps<
    LabelHTMLAttributes<HTMLLabelElement>,
    HTMLLabelElement
  > {}

const Label = ({ htmlFor, children, ...props }: LabelProps) => {
  return (
    <label htmlFor={htmlFor} {...props}>
      {children}
    </label>
  );
};

export default Label;
