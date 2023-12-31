import { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";
import useFetch from "../../useFetch";
import axios from "axios";

function Freezbe() {
  const { modelData, isLoading, reFetch } = useFetch("freezbe");
  const { modelData: ingredients } = useFetch("ingredient");
  const [ingredientsData, setIngredientsData] = useState([ingredients]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState({
    name: "",
    description: "",
    unitPrice: "",
    range: "",
    ingredients: "",
    weight: "",
  });
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState({
    name: "",
    description: "",
    unitPrice: "",
    range: "",
    ingredients: "",
    weight: "",
  });
  const [modifyMode, setModifyMode] = useState(false);
  const [id, setId] = useState();

  useEffect(() => {
    setIngredientsData(ingredients);
  }, [ingredients]);

  const [filteredModelData, setFilteredModelData] = useState([]);

  useEffect(() => {
    // Filter the data based on the search text
    const newData = modelData.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredModelData(newData);
  }, [modelData, searchText]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));

    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = async (e) => {
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
    } else if (typeof data.name === "number") {
      setError((prevData) => ({
        ...prevData,
        name: "Name should be a string",
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
    } else if (typeof data.description === "number") {
      setError((prevData) => ({
        ...prevData,
        description: "Description should be a string",
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
        ingredients: "Please select an ingredient",
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

    if (!modifyMode) {
      await axios.post("http://localhost:8000/freezbe", {
        name: data?.name,
        Description: data?.description,
        UnitPrice: data?.unitPrice,
        Range: data?.range,
        Ingredients: data?.ingredients,
        Weight: data?.weight,
      });
      reFetch();
      setData({
        name: "",
        description: "",
        unitPrice: "",
        range: "",
        ingredients: "",
        weight: "",
      });

      return;
    }

    await axios.put(`http://localhost:8000/freezbe/${id}`, {
      name: data?.name,
      Description: data?.description,
      UnitPrice: data?.unitPrice,
      Range: data?.range,
      Ingredients: data?.ingredients,
      Weight: data?.weight,
    });
    reFetch();
    setModifyMode(false);

    setData({
      name: "",
      description: "",
      unitPrice: "",
      range: "",
      ingredients: "",
      weight: "",
    });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      {(userInfo.role === "superadmin" || userInfo.role === "admin") && (
        <div>
          {/* First pair of inputs */}
          <form onSubmit={handleSubmit}>
            <div className={classes.inputContainer}>
              <div className={classes.labels}>
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Enter a name"
                  value={data.name}
                  onChange={handleFormChange}
                />
                {error.name && (
                  <div className={classes.error}>{error.name}</div>
                )}
              </div>
              <div className={classes.labels}>
                <label>Description</label>
                <input
                  type="text"
                  name="description"
                  placeholder="Enter a description"
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
              <div className={classes.labels}>
                <label>Unit Price</label>
                <input
                  type="number"
                  name="unitPrice"
                  placeholder="Enter a unit price"
                  value={data.unitPrice}
                  onChange={handleFormChange}
                />
                {error.unitPrice && (
                  <div className={classes.error}>{error.unitPrice}</div>
                )}
              </div>
              <div className={classes.labels}>
                <label>Range</label>
                <input
                  type="number"
                  name="range"
                  placeholder="Enter a range"
                  value={data.range}
                  onChange={handleFormChange}
                />
                {error.range && (
                  <div className={classes.error}>{error.range}</div>
                )}
              </div>
            </div>

            {/* Third pair of inputs */}
            <div className={classes.inputContainer}>
              <div className={classes.labels}>
                <label>Ingredients</label>
                <select
                  name="ingredients"
                  value={data.ingredients}
                  onChange={(e) => {
                    // Find the selected ingredient object based on the value
                    const selectedIngredient = ingredientsData.find(
                      (ingredient) => ingredient.name === e.target.value
                    );

                    // Set the name of the selected ingredient or an empty string if no selection
                    const selectedIngredientName = selectedIngredient
                      ? selectedIngredient.name
                      : "";

                    setData((prevState) => ({
                      ...prevState,
                      ingredients: selectedIngredientName,
                    }));
                    setError((prevData) => ({
                      ...prevData,
                      ingredients: "",
                    }));
                  }}
                >
                  <option value="">Select an ingredient</option>
                  {ingredientsData &&
                    ingredientsData.map((ingredient, index) => (
                      <option key={index} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                </select>
                {error.ingredients && (
                  <div className={classes.error}>{error.ingredients}</div>
                )}
              </div>

              <div className={classes.labels}>
                <label>Weight</label>
                <input
                  type="number"
                  name="weight"
                  placeholder="Enter a weight"
                  value={data.weight}
                  onChange={handleFormChange}
                />
                {error.weight && (
                  <div className={classes.error}>{error.weight}</div>
                )}
              </div>
            </div>
            <div className={`${classes.searchBar} ${classes.inputContainer}`}>
              <input
                type="text"
                name="search"
                placeholder="Search by name"
                value={searchText}
                onChange={handleSearch}
              />
            </div>

            <button
              type="submit"
              className={`${
                modifyMode ? classes.modifyButton : classes.addButton
              }`}
            >
              {modifyMode ? "Modify" : "Add"}
            </button>
          </form>
        </div>
      )}
      <Table
        data={filteredModelData}
        isLoading={isLoading}
        columns={[
          { label: "Name", field: "name" },
          { label: "Description", field: "Description" },
          { label: "Unit Price", field: "UnitPrice" },
          { label: "Range", field: "Range" },
          { label: "Ingredients", field: "Ingredients" },
          { label: "Weight", field: "Weight" },
        ]}
        onModify={(model) => {
          setModifyMode(true);
          setData({
            name: model.name,
            description: model.Description,
            unitPrice: model.UnitPrice,
            range: model.Range,
            ingredients: model.Ingredients,
            weight: model.Weight,
          });
          setId(model._id);
        }}
        onDelete={async (model) => {
          await axios.delete(`http://localhost:8000/freezbe/${model._id}`);
          reFetch();
          setModifyMode(false);
          setData({
            name: "",
            description: "",
            unitPrice: "",
            range: "",
            ingredients: "",
            weight: "",
          });
        }}
      />
    </>
  );
}

export default Freezbe;
