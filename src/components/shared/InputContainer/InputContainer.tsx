import React, { FormEvent } from "react";

interface InputContainerProps {
  handleSubmitForm: (e: FormEvent) => void | Promise<void>;
  legend: string;
  buttonTitle?: string;
  children: React.ReactNode;
}

const InputContainer: React.FC<InputContainerProps> = ({
  handleSubmitForm,
  legend,
  buttonTitle = "Submit",
  children,
}) => {
  return (
    <form method="post" onSubmit={handleSubmitForm}>
      <fieldset>
        <legend>{legend}</legend>
        {children}
        <input type="submit" value={buttonTitle} className="btn" />
      </fieldset>
    </form>
  );
};

export default InputContainer;
