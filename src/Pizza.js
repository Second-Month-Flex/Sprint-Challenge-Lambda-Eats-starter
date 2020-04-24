import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
// import pizza from "./Pizza.jpg";
import * as yup from "yup";
import axios from "axios";

const initialForm = {
  name: "",
  red: false,
  garlic: false,
  bbq: false,
  spinach: false,
  instructions: "",
  size: "",
};
const initialFormErrors = {
  name: "",
  red: "",
  garlic: "",
  bbq: "",
  spinach: "",
  instructions: "",
  size: "",
};

const formSchema = yup.object().shape({
  name: yup
    .string()
    .required("Must have a name")
    .min(2, "must have atleast 2 characters"),
  red: yup.boolean().oneOf([true, false], "please select one"),
  garlic: yup.boolean().oneOf([true, false], "please select one"),
  bbq: yup.boolean().oneOf([true, false], "please select one"),
  spinach: yup.boolean().oneOf([true, false], "please select one"),
  instructions: yup.string().required("Please enter N/A if not applicable"),
  size: yup.string().oneOf(["Small", "Medium", "Large", "XL"]),
});

function Pizza() {
  const [form, setForm] = useState(initialForm);
  const [pizzaOrder, setPizzaOrder] = useState([]);
  const [error, setError] = useState(initialFormErrors);

  const Changing = (event) => {
    const name = event.target.name;
    const value = event.target.value;

    yup
      .reach(formSchema, name)
      .validate(value)
      .then((valid) => {
        setError({
          ...error,
          [name]: "",
        });
      })
      .catch((err) => {
        setError({
          ...error,
          [name]: err.errors[0],
        });
      });

    setForm({
      ...form,
      [name]: value,
    });
  };

  const checkboxChange = (e) => {
    const { name } = e.target;
    const isChecked = e.target.checked;

    setForm({
      ...form,
      [name]: isChecked,
    });
  };

  return (
    <div>
      <form>
        <Link to={"/"}>
          <button> Click me to go Home! </button>
        </Link>
        <h1>Build your own pizza!</h1>
        <label>
          <input
            name="name"
            placeholder="Name"
            value={form.name}
            onChange={Changing}
          />
          {error.name}
          {error.instructions}
          {error.size}
        </label>
        <label>
          <input
            name="instructions"
            placeholder="Special Instructions"
            value={form.instructions}
            onChange={Changing}
          />
        </label>
        <label>
          <select
            name="size"
            placeholder="Special Instructions"
            value={form.size}
            onChange={Changing}
          >
            <option value="Small"> Small </option>
            <option value="Medium"> Medium </option>
            <option value="Large"> Large </option>
            <option value="XL"> XL </option>
          </select>
        </label>
        <h2> Select which sauce you would like! </h2>
        <label>
          <input
            name="red"
            type="checkbox"
            value={form.red}
            onChange={checkboxChange}
          />
          Red Sauce
        </label>
        <label>
          <input
            name="bbq"
            type="checkbox"
            value={form.bbq}
            onChange={checkboxChange}
          />
          Barbeque Sauce
        </label>
        <label>
          <input
            name="garlic"
            type="checkbox"
            value={form.garlic}
            onChange={checkboxChange}
          />
          Garlic Sauce
        </label>
        <label>
          <input
            name="spinach"
            type="checkbox"
            value={form.spinach}
            onChange={checkboxChange}
          />
          Spinach Sauce
        </label>
      </form>
      <button> Submit Pizza Order</button>
    </div>
  );
}

export default Pizza;
