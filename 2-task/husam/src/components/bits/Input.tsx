import {
  Children,
  cloneElement,
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
} from "react";
import Label from "./Label";

interface InputProps
  extends DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  id: string;
  containerClassName?: string;
  prefix?: PrefixType;
}

type PrefixType = "$" | "%" | string;

const InputContainer = ({
  children,
  containerClassName = "",
  prefix = "$",
  ...props
}: InputProps) => {
  const LabelElement = Children.map(children, (child: ReactElement) => {
    if (child.type === Label) {
      return cloneElement(child, {
        htmlFor: props.id,
        className: `text-black/75 px-2 bg-white`,
      });
    }
  });

  return (
    <div className={"input_container " + containerClassName}>
      {LabelElement && <div className="label_container">{LabelElement}</div>}
      {/* spreading props isn't good, but it is what it is */}
      <div className="relative input_wrapper">
        {prefix && (
          <label
            htmlFor={props.id}
            className="prefix absolute top-1/2 -translate-y-1/2 left-2 select-none text-black/75"
          >
            {prefix}
          </label>
        )}
        {/* there is a library that manages classNames */}
        <input
          {...props}
          className={
            `border border-black/30 rounded-md ${
              prefix ? "px-6" : "px-2"
            } text-black/75 placeholder:text-black/75 py-2 ` + props.className
          }
        />
      </div>
    </div>
  );
};

export default InputContainer;
