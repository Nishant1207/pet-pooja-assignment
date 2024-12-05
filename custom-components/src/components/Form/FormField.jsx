import React from "react";
import ValidationMessage from "./ValidationMessage";

const FormField = ({ config, value, onChange, error, styles }) => {
  const renderField = () => {
    switch (config.type) {
      case "text":
        return (
          <input
            type="text"
            placeholder={config.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles?.input}
          />
        );
      case "textarea":
        return (
          <textarea
            placeholder={config.placeholder}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles?.textarea}
          />
        );
      case "select":
        return (
          <select
            value={value}
            onChange={(e) => onChange(e.target.value)}
            style={styles?.select}
          >
            {config.options.map((option, index) => (
              <option key={index} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        );
      case "checkbox":
        return (
          <div>
            {config.options.map((option, index) => (
              <label key={index}>
                <input
                  type="checkbox"
                  value={option.value}
                  checked={value?.includes(option.value)}
                  onChange={(e) => {
                    const newValue = e.target.checked
                      ? [...(value || []), option.value]
                      : value.filter((v) => v !== option.value);
                    onChange(newValue);
                  }}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "radio":
        return (
          <div>
            {config.options.map((option, index) => (
              <label key={index}>
                <input
                  type="radio"
                  name={config.name}
                  value={option.value}
                  checked={value === option.value}
                  onChange={(e) => onChange(e.target.value)}
                />
                {option.label}
              </label>
            ))}
          </div>
        );
      case "switch":
        return (
          <label>
            <input
              type="checkbox"
              checked={value || false}
              onChange={(e) => onChange(e.target.checked)}
            />
            {config.label}
          </label>
        );
      case "date":
        return (
          <input
            type="date"
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="form-field">
      <label style={styles?.label}>
        {config.label}
        {config.required && "*"}
      </label>
      {renderField()}
      {error && <ValidationMessage message={error} />}
    </div>
  );
};

export default FormField;
