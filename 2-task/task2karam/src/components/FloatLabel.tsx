import { useState } from "react";
import { FloatLabelProps } from "../utils/FloatLabelProps";

const FloatLabel = (props: FloatLabelProps) => {
  const [focus, setFocus] = useState(false);
  const { children, label, value } = props;

  const labelClass =
    focus || value || value
      ? `bg-[#fff] px-1 text-primary absolute pointer-events-none left-[12px] [transition:0.2s_ease_all] top-[-7px] text-[11px] z-10`
      : `text-[15px] text-grey-300 font-normal absolute pointer-events-none left-[12px]  top-[11px] [transition:0.2s_ease_all] z-10`;

  return (
    <div
      className="relative"
      onBlur={() => setFocus(false)}
      onFocus={() => setFocus(true)}
    >
      {children}
      <label className={labelClass}>{label}</label>
    </div>
  );
};

export default FloatLabel;
