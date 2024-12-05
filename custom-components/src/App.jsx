import React, { useState } from "react";
import TableContainer from "./components/Table/TableContainer";
import FormContainer from "./components/Form/FormContainer";
import DatePickerContainer from "./components/DatePicker/DatePickerContainer";
import "./App.css";

const data = [
  { id: 1, name: "Alice", age: 25 },
  { id: 2, name: "Bob", age: 30 },
  { id: 3, name: "Charlie", age: 35 },
];

const columns = [
  { title: "ID", key: "id", sortable: true, filterable: true },
  { title: "Name", key: "name", sortable: true, filterable: true },
  { title: "Age", key: "age", sortable: true, filterable: true },
];

const formConfig = [
  {
    name: "name",
    label: "Name",
    type: "text",
    required: true,
    placeholder: "Enter your name",
  },
  {
    name: "email",
    label: "Email",
    type: "text",
    required: true,
    pattern: "^[^@]+@[^@]+\\.[^@]+$",
    placeholder: "Enter your email",
  },
  {
    name: "age",
    label: "Age",
    type: "text",
    required: true,
    placeholder: "Enter your age",
    minLength: 1,
  },
  {
    name: "gender",
    label: "Gender",
    type: "radio",
    required: true,
    options: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
    ],
  },
];

function App() {
  const [activeComponent, setActiveComponent] = useState("table");
  const [formData, setFormData] = useState(null);

  const handleFormSubmit = (data) => {
    setFormData(data);
    console.log("Form Submitted:", data);
  };

  const handleDateChange = (range) => {
    console.log("Selected Date Range:", range);
  };

  return (
    <div className="App">
      <nav className="nav">
        <button
          onClick={() => setActiveComponent("table")}
          className={activeComponent === "table" ? "active" : ""}
        >
          Table
        </button>
        <button
          onClick={() => setActiveComponent("form")}
          className={activeComponent === "form" ? "active" : ""}
        >
          Form
        </button>
        <button
          onClick={() => setActiveComponent("datePicker")}
          className={activeComponent === "datePicker" ? "active" : ""}
        >
          Date Picker
        </button>
      </nav>

      <div className="content">
        {activeComponent === "table" && (
          <TableContainer data={data} columns={columns} />
        )}
        {activeComponent === "form" && (
          <FormContainer config={formConfig} onSubmit={handleFormSubmit} />
        )}
        {activeComponent === "datePicker" && (
          <DatePickerContainer onDateChange={handleDateChange} />
        )}
      </div>
    </div>
  );
}

export default App;
