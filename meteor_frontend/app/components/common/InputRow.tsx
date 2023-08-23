import { TextField } from "@mui/material";
import React, { ChangeEvent } from "react";

interface BaseProps {
  label: string;
  required?: boolean;
  defaultValue?: string;
  className?: string;
  value?: string;
  error?: boolean;
}

interface SelectInputProps {
  type: "select";
  options: { value: string | number; label: string }[];
  handleChange: (value: ChangeEvent<HTMLSelectElement>) => void;
  pattern?: never;
}

interface TextInputProps {
  type: "text" | "number";
  handleChange: (value: ChangeEvent<HTMLInputElement>) => void;
  options?: never;
  pattern?: string;
}

type Props = BaseProps & (SelectInputProps | TextInputProps);

export default function InputRow({
  label,
  handleChange,
  type,
  options,
  defaultValue = "",
  className = "",
  required = false,
  pattern = ".*",
  value,
  error = false,
}: Props) {
  return (
    <div className={`flex justify-between items-center ${className}`}>
      <span className="basis-1/6 mr-4">{label}</span>
      {type === "select" ? (
        <select
          onChange={handleChange}
          className="pt-3 pr-8 pb-3 pl-4 h-[40px] bg-white border border-secondary rounded focus:border-[#69b3ff] grow"
          required={required}
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(value ? { value } : {})}
        >
          {options.map((option) => (
            <option value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <TextField
          error={error}
          type="text"
          onChange={handleChange}
          // className="pt-3 pr-8 pb-3 pl-4 h-[40px] bg-white border border-secondary rounded focus:border-[#69b3ff] grow invalid:border-danger"
          className="grow"
          size="small"
          defaultValue={defaultValue}
          required={required}
          // type
          // Don't know of any other way to make conditional attributes
          // eslint-disable-next-line react/jsx-props-no-spreading
          {...(value ? { value } : {})}
        />
      )}
    </div>
  );
}
