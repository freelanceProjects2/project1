import { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";

function Ingredients() {
  const [modelData, setModelData] = useState(() => {
    const savedModelDataJSON = localStorage.getItem("modelDataIngredients");
    return savedModelDataJSON ? JSON.parse(savedModelDataJSON) : [];
  });

  const [data, setData] = useState({
    name: "",
    description: "",
  });
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState({
    name: "",
    description: "",
  });
  const [modifyMode, setModifyMode] = useState(false);
  const [index, setIndex] = useState();

  const [filteredModelData, setFilteredModelData] = useState([]);

  useEffect(() => {
    // Filter the data based on the search text
    const newData = modelData.filter(
      (item) =>
        item.name && item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredModelData(newData);
  }, [modelData, searchText]);

  useEffect(() => {
    try {
      const modelDataJSON = JSON.stringify(modelData);
      localStorage.setItem("modelDataIngredients", modelDataJSON);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [modelData]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setData((prevState) => ({ ...prevState, [name]: value }));

    setError((prevState) => ({ ...prevState, [name]: "" }));
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

    if (emptyFields.length > 0) {
      return;
    }

    if (!modifyMode) {
      setModelData([
        ...modelData,
        {
          name: data.name,
          description: data.description,
        },
      ]);

      setData({
        name: "",
        description: "",
      });

      return;
    }

    // Update an existing item
    const updatedModelData = [...modelData];
    updatedModelData[index] = {
      name: data.name,
      description: data.description,
    };

    setModelData(updatedModelData);

    setModifyMode(false);

    setData({
      name: "",
      description: "",
    });
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <>
      <div>
        {/* First pair of inputs */}
        <form onSubmit={handleSubmit}>
          <div className={classes.inputContainer}>
            <div>
              <input
                type="text"
                name="name"
                placeholder="Enter a name"
                value={data.name}
                onChange={handleFormChange}
              />
              {error.name && <div className={classes.error}>{error.name}</div>}
            </div>
            <div>
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
      <Table
        data={filteredModelData}
        columns={[
          { label: "Name", field: "name" },
          { label: "Description", field: "description" },
        ]}
        onModify={(model, index) => {
          setModifyMode(true);
          setData({
            name: model.name,
            description: model.description,
          });
          setIndex(index);
        }}
        onDelete={(index) => {
          setModelData((prevData) => {
            const updateModel = [...prevData];
            updateModel.splice(index, 1);
            return updateModel;
          });
          setModifyMode(false);
          setData({
            name: "",
            description: "",
          });
        }}
      />
    </>
  );
}

export default Ingredients;
