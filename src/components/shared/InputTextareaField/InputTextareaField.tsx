import React from "react";

interface InputTextareaFieldProps {
  handleValueChange: (key: string, value: string) => void;
  value: string;
  id: string;
  placeholder: string;
  label: string;
}

const InputTextareaField: React.FC<InputTextareaFieldProps> = ({
  handleValueChange,
  value,
  id,
  placeholder,
  label,
}) => {
  return (
    <>
      <div className="text-input-field">
        <label htmlFor="description">{label}</label>
        <textarea
          rows={5}
          id={id}
          name="Description"
          required={true}
          onChange={(e) => handleValueChange(id, e.target.value)}
          value={value}
          placeholder={placeholder}
        />
      </div>
    </>
  );
};

export default InputTextareaField;
