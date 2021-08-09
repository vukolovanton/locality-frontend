import React from "react";
import InputField from "../InputField/InputField";
import { useLocalityCreation } from "../../../hooks/useLocalityCreation";

const LocalityCreation: React.FC = () => {
  const {
    localityCreationState,
    errorMessage,
    handleStateChange,
    handleSubmitCreateLocalityForm,
  } = useLocalityCreation();

  return (
    <section className="container">
      <h3>Welcome to Locality!</h3>
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

          <label htmlFor="options">
            Choose role:
            <select name="options" id="options" required>
              <option value="value1">User</option>
              <option value="value2">Supervisor</option>
              <option value="value3">Contractor</option>
            </select>
          </label>

          <input type="submit" value="Create Locality" className="btn" />
        </fieldset>
      </form>
    </section>
  );
};

export default LocalityCreation;
