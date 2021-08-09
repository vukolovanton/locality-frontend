import React from "react";

interface InputFieldProps {
  value: string;
  handleValueChange(id: string, value: string): void;
  title: string;
  id: string;
  inputType?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  value,
  handleValueChange,
  title,
  id,
  inputType = "text",
}) => {
  return (
    <div className="input-container">
      <label htmlFor="title">{title}</label>
      <input
        id={id}
        type={inputType}
        aria-required={true}
        value={value}
        className="input-field"
        onChange={(e) => handleValueChange(id, e.target.value)}
      />
    </div>
  );
};

export default InputField;
