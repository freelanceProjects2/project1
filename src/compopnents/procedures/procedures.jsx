import { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";

function Procedures() {
  const [modelData, setModelData] = useState(() => {
    const savedModelDataJSON = localStorage.getItem("modelDataProcedures");
    return savedModelDataJSON ? JSON.parse(savedModelDataJSON) : [];
  });

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
      localStorage.setItem("modelDataProcedures", modelDataJSON);
    } catch (error) {
      console.error("Error saving data to localStorage:", error);
    }
  }, [modelData]);

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
    if (!data.freezbeModel) {
      setError((prevData) => ({
        ...prevData,
        freezbeModel: "Please enter a frezzbe model",
      }));
      emptyFields.push("FreezbeModel");
    } else if (data.freezbeModel.length < 3) {
      setError((prevData) => ({
        ...prevData,
        freezbeModel: "Freezbe model should be at least 3 characters",
      }));
      emptyFields.push("FreezbeModel");
    } else if (typeof data.freezbeModel === "number") {
      setError((prevData) => ({
        ...prevData,
        description: "Description should be a string",
      }));
      emptyFields.push("Description");
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
      } else {
        const stepsString = data.steps.join(",");

        // Use a regular expression to check if there are any characters other than commas
        if (/[^,]+/.test(stepsString)) {
          setError((prevData) => ({
            ...prevData,
            steps: "Steps should be separated by commas",
          }));
          emptyFields.push("Steps");
        }
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
      } else {
        const testValidationsString = data.testValidations.join(",");

        // Use a regular expression to check if there are any characters other than commas
        if (/[^,]+/.test(testValidationsString)) {
          setError((prevData) => ({
            ...prevData,
            testValidations: "Test validations should be separated by commas",
          }));
          emptyFields.push("TestValidations");
        }
      }
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
          freezbeModel: data.freezbeModel,
          testValidations: data.testValidations,
          steps: data.steps,
        },
      ]);

      setData({
        name: "",
        description: "",
        freezbeModel: "",
        testValidations: [],
        steps: [],
      });

      return;
    }

    // Update an existing item
    const updatedModelData = [...modelData];
    updatedModelData[index] = {
      name: data.name,
      description: data.description,
      freezbeModel: data.freezbeModel,
      testValidations: data.testValidations,
      steps: data.steps,
    };

    setModelData(updatedModelData);

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
              {error.name && <div className={classes.error}>{error.name}</div>}
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
              <label>Freezbe Model</label>
              <input
                type="text"
                placeholder="Enter freezbe model"
                name="freezbeModel"
                value={data.freezbeModel}
                onChange={handleFormChange}
              />
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
      <Table
        data={filteredModelData}
        columns={[
          { label: "Name", field: "name" },
          { label: "Description", field: "description" },
          { label: "Unit Price", field: "freezbeModel" },
          { label: "Steps", field: "steps" },
          { label: "Test Validations", field: "testValidations" },
        ]}
        onModify={(model, index) => {
          setModifyMode(true);
          setData({
            name: model.name,
            description: model.description,
            freezbeModel: model.freezbeModel,
            testValidations: model.testValidations,
            steps: model.steps,
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
