import React, { useState, useReducer } from "react";
import FormField from "./FormField";
import Button from "./Button";
import "./Form.css";

const FormContainer = ({ config, onSubmit, styles }) => {
  const [formState, setFormState] = useState({});
  const [errors, setErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormState((prev) => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    const fieldConfig = config.find((item) => item.name === field);
    let errorMessage = "";

    if (fieldConfig?.required && !value) {
      errorMessage = `${fieldConfig.label} is required.`;
    } else if (fieldConfig?.minLength && value.length < fieldConfig.minLength) {
      errorMessage = `${fieldConfig.label} must be at least ${fieldConfig.minLength} characters.`;
    } else if (fieldConfig?.pattern && !new RegExp(fieldConfig.pattern).test(value)) {
      errorMessage = `Invalid ${fieldConfig.label}.`;
    }

    setErrors((prev) => ({ ...prev, [field]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const hasErrors = config.some((field) => {
      validateField(field.name, formState[field.name]);
      return !!errors[field.name];
    });

    if (!hasErrors) {
      onSubmit(formState);
    }
  };

  const handleReset = () => {
    setFormState({});
    setErrors({});
  };

  return (
    <form
      className="form-container"
      onSubmit={handleSubmit}
      style={styles?.formContainer}
    >
      {config.map((fieldConfig) => (
        <FormField
          key={fieldConfig.name}
          config={fieldConfig}
          value={formState[fieldConfig.name] || ""}
          onChange={(value) => handleInputChange(fieldConfig.name, value)}
          error={errors[fieldConfig.name]}
          styles={styles}
        />
      ))}
      <div className="form-actions">
        <Button type="submit" label="Submit" styles={styles?.button} />
        <Button type="button" label="Reset" onClick={handleReset} styles={styles?.button} />
      </div>
    </form>
  );
};

export default FormContainer;
