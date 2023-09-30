import { useState } from "react";
import classes from "./freezbe.module.css";
import Table from "./table/table";

function Freezbe() {
  const [data, setData] = useState({
    name: "",
    description: "",
    unitPrice: "",
    range: "",
    ingredients: "",
    weight: "",
  });

  const [error, setError] = useState({
    name: "",
    description: "",
    unitPrice: "",
    range: "",
    ingredients: "",
    weight: "",
  });

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFields = [];

    if (data.name.length === 0) {
      setError((prevData) => ({
        ...prevData,
        name: "Please enter a name",
      }));
      emptyFields.push("Name");
    } else if (data.name.length < 3) {
      setError((prevData) => ({
        ...prevData,
        name: "Name should be at least 3 characters",
      }));
      emptyFields.push("Name");
    }

    if (data.description.length === 0) {
      setError((prevData) => ({
        ...prevData,
        description: "Please enter a description",
      }));
      emptyFields.push("Description");
    } else if (data.description.length < 3) {
      setError((prevData) => ({
        ...prevData,
        description: "Description should be at least 3 characters",
      }));
      emptyFields.push("Description");
    }

    if (!data.unitPrice) {
      setError((prevData) => ({
        ...prevData,
        unitPrice: "Please enter a price",
      }));
      emptyFields.push("Price");
    } else if (data.unitPrice.length > 3) {
      setError((prevData) => ({
        ...prevData,
        unitPrice: "Price should be maximum 3 numbers",
      }));
      emptyFields.push("Price");
    }

    if (!data.range) {
      setError((prevData) => ({
        ...prevData,
        range: "Please enter a range",
      }));
      emptyFields.push("Range");
    } else if (data.range.length >= 3) {
      setError((prevData) => ({
        ...prevData,
        range: "Range should be maximum 2 numbers",
      }));
      emptyFields.push("Range");
    }

    if (!data.ingredients) {
      setError((prevData) => ({
        ...prevData,
        ingredients: "Please enter ingredients",
      }));
      emptyFields.push("Ingredients");
    } else if (data.ingredients.length >= 3) {
      setError((prevData) => ({
        ...prevData,
        ingredients: "Ranfe should be maximum 2 numbers",
      }));
      emptyFields.push("Ingredients");
    }

    if (!data.weight) {
      setError((prevData) => ({
        ...prevData,
        weight: "Please enter a weight",
      }));
      emptyFields.push("Weight");
    } else if (data.weight.length > 3) {
      setError((prevData) => ({
        ...prevData,
        weight: "Weight should be maximum 3 numbers",
      }));
      emptyFields.push("Weight");
    }

    if (emptyFields.length > 0) {
      return;
    }
  };

  return (
    <div>
      {/* First pair of inputs */}
      <form onSubmit={handleSubmit}>
        <div className={classes.inputContainer}>
          <div>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={data.name}
              onChange={handleFormChange}
            />
            {error.name && <div className={classes.error}>{error.name}</div>}
          </div>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={data.description}
              onChange={handleFormChange}
            />
            {error.description && (
              <div className={classes.error}>{error.description}</div>
            )}
          </div>
        </div>

        {/* Second pair of inputs */}
        <div className={classes.inputContainer}>
          <div>
            <input
              type="number"
              name="unitPrice"
              placeholder="Unit Price"
              value={data.unitPrice}
              onChange={handleFormChange}
            />
            {error.unitPrice && (
              <div className={classes.error}>{error.unitPrice}</div>
            )}
          </div>
          <div>
            <input
              type="number"
              name="range"
              placeholder="Range"
              value={data.range}
              onChange={handleFormChange}
            />
            {error.range && <div className={classes.error}>{error.range}</div>}
          </div>
        </div>

        {/* Third pair of inputs */}
        <div className={classes.inputContainer}>
          <div>
            <input
              type="text"
              name="ingredients"
              placeholder="Ingredients (comma separated)"
              value={data.ingredients}
              onChange={handleFormChange}
            />
            {error.ingredients && (
              <div className={classes.error}>{error.ingredients}</div>
            )}
          </div>
          <div>
            <input
              type="number"
              name="weight"
              placeholder="Weight"
              value={data.weight}
              onChange={handleFormChange}
            />
            {error.weight && (
              <div className={classes.error}>{error.weight}</div>
            )}
          </div>
        </div>
        <button type="submit" className={classes.addButton}>
          Add
        </button>
      </form>
      <Table data={data} />
    </div>
  );
}

export default Freezbe;
