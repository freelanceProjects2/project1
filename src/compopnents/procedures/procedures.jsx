import { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";
import useFetch from "../../useFetch";
import axios from "axios";

function Procedures() {
  const { modelData, isLoading, reFetch } = useFetch("procedure");
  const { modelData: freezbe } = useFetch("ingredient");
  const [freezbeData, setFreezbeData] = useState([freezbe]);
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
  const [data, setData] = useState({
    name: "",
    description: "",
    freezbeModel: "",
    testValidations: [],
    steps: [],
  });
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState({
    name: "",
    description: "",
    freezbeModel: "",
    testValidations: "",
    steps: "",
  });
  const [modifyMode, setModifyMode] = useState(false);
  const [id, setId] = useState();

  const [filteredModelData, setFilteredModelData] = useState([]);

  useEffect(() => {
    setFreezbeData(freezbe);
  }, [freezbe]);

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
    if (name === "steps") {
      // Split the input value by commas to create an array of steps
      const stepsArray = value.split(",").map((step) => step.trim());
      setData((prevState) => ({ ...prevState, [name]: stepsArray }));
    } else if (name === "testValidations") {
      // Split the input value by commas to create an array of steps
      const testValidationsArray = value.split(",").map((test) => test.trim());
      setData((prevState) => ({ ...prevState, [name]: testValidationsArray }));
    } else {
      setData((prevState) => ({ ...prevState, [name]: value }));
    }

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
    if (!data.freezbeModel) {
      setError((prevData) => ({
        ...prevData,
        freezbeModel: "Please select a frezzbe",
      }));
      emptyFields.push("FreezbeModel");
    }

    if (!data.steps.length) {
      setError((prevData) => ({
        ...prevData,
        steps: "Please enter at least one step",
      }));
      emptyFields.push("Steps");
    } else {
      const stepsArray = data.steps;
      let isValid = true;

      for (const validation of stepsArray) {
        if (validation.length < 3) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        setError((prevData) => ({
          ...prevData,
          steps: "Each step should be at least 3 characters",
        }));
        emptyFields.push("Steps");
      }
    }

    if (!data.testValidations.length) {
      setError((prevData) => ({
        ...prevData,
        testValidations: "Please enter at least one test validation",
      }));
      emptyFields.push("TestValidations");
    } else {
      const testValidationsArray = data.testValidations;
      let isValid = true;

      for (const validation of testValidationsArray) {
        if (validation.length < 3) {
          isValid = false;
          break;
        }
      }

      if (!isValid) {
        setError((prevData) => ({
          ...prevData,
          testValidations:
            "Each test validation should be at least 3 characters",
        }));
        emptyFields.push("TestValidations");
      }
    }

    if (emptyFields.length > 0) {
      return;
    }

    if (!modifyMode) {
      await axios.post("http://localhost:8000/procedure", {
        name: data?.name,
        Description: data?.description,
        FreezbeModel: data?.freezbeModel,
        Steps: data?.steps,
        TestValidations: data?.testValidations,
      });
      reFetch();
      setData({
        name: "",
        description: "",
        freezbeModel: "",
        testValidations: [],
        steps: [],
      });

      return;
    }

    await axios.put(`http://localhost:8000/procedure/${id}`, {
      name: data?.name,
      Description: data?.description,
      FreezbeModel: data?.freezbeModel,
      Steps: data?.steps,
      TestValidations: data?.testValidations,
    });
    reFetch();

    setModifyMode(false);

    setData({
      name: "",
      description: "",
      freezbeModel: "",
      testValidations: "",
      steps: [],
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
                <label>Freezbe</label>
                <select
                  name="ingredients"
                  value={data.freezbeModel}
                  onChange={(e) => {
                    // Find the selected ingredient object based on the value
                    const selectedFeezbe = freezbeData.find(
                      (ingredient) => ingredient.name === e.target.value
                    );

                    // Set the name of the selected ingredient or an empty string if no selection
                    const selectedIngredientName = selectedFeezbe
                      ? selectedFeezbe.name
                      : "";

                    setData((prevState) => ({
                      ...prevState,
                      freezbeModel: selectedIngredientName,
                    }));
                    setError((prevData) => ({
                      ...prevData,
                      freezbeModel: "",
                    }));
                  }}
                >
                  <option value="">Select an ingredient</option>
                  {freezbeData &&
                    freezbeData.map((ingredient, index) => (
                      <option key={index} value={ingredient.name}>
                        {ingredient.name}
                      </option>
                    ))}
                </select>
                {error.freezbeModel && (
                  <div className={classes.error}>{error.freezbeModel}</div>
                )}
              </div>
              <div className={classes.labels}>
                <label>Steps</label>
                <input
                  type="text"
                  name="steps"
                  placeholder="Enter steps(separated by commas)"
                  value={data.steps}
                  onChange={handleFormChange}
                />
                {error.steps && (
                  <div className={classes.error}>{error.steps}</div>
                )}
              </div>
            </div>

            <div
              className={`${classes.testValidations} ${classes.inputContainer} ${classes.labels}`}
            >
              <label>Test Validations</label>
              <input
                type="text"
                name="testValidations"
                placeholder="Enter test validations(separated by commas)"
                value={data.testValidations}
                onChange={handleFormChange}
              />
              {error.testValidations && (
                <div className={classes.error}>{error.testValidations}</div>
              )}
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
          { label: "Freezbe Model", field: "FreezbeModel" },
          { label: "Steps", field: "Steps" },
          { label: "Test Validations", field: "TestValidations" },
        ]}
        onModify={(model) => {
          setModifyMode(true);
          setData({
            name: model.name,
            description: model.Description,
            freezbeModel: model.FreezbeModel,
            testValidations: model.TestValidations,
            steps: model.Steps,
          });
          setId(model._id);
        }}
        onDelete={async (model) => {
          await axios.delete(`http://localhost:8000/procedure/${model._id}`);
          reFetch();
          setModifyMode(false);
          setData({
            name: "",
            description: "",
            freezbeModel: "",
            testValidations: [],
            steps: [],
          });
        }}
      />
    </>
  );
}

export default Procedures;
