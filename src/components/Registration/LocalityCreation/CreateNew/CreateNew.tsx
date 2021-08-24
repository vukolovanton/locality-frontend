import React from "react";
import { useLocalityCreation } from "src/hooks/locality/useLocalityCreation";
import InputField from "src/components/shared/InputField/InputField";
import Title from "../../Title";

const CreateNew: React.FC = () => {
  const {
    localityCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateLocalityForm,
  } = useLocalityCreation();

  return (
    <div>
      <Title />
      {errorMessage && <span className="error">{errorMessage}</span>}
      <form method="post" onSubmit={handleSubmitCreateLocalityForm}>
        <fieldset>
          <legend>Create a new Locality</legend>
          <InputField
            value={localityCreationState.title}
            handleValueChange={handleStateChange}
            title="Title"
            id="title"
          />

          <InputField
            value={localityCreationState.description}
            handleValueChange={handleStateChange}
            title="Description"
            id="description"
          />

          <InputField
            value={localityCreationState.city}
            handleValueChange={handleStateChange}
            title="City"
            id="city"
          />
          <InputField
            value={localityCreationState.street}
            handleValueChange={handleStateChange}
            title="Street"
            id="street"
          />

          <input type="submit" value="Create Locality" className="btn" />
        </fieldset>
      </form>
    </div>
  );
};

export default CreateNew;