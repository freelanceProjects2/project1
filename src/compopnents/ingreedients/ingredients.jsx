import { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";
import useFetch from "../../useFetch";
import axios from "axios";

function Ingredients() {
  const { modelData, isLoading, reFetch } = useFetch("ingredient");

  const userInfo = JSON.parse(localStorage.getItem("userInfo"));
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
  const [id, setId] = useState();

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

    if (emptyFields.length > 0) {
      return;
    }

    if (!modifyMode) {
      await axios.post("http://localhost:8000/ingredient", {
        name: data?.name,
        Description: data?.description,
      });
      reFetch();
      setData({
        name: "",
        description: "",
      });

      return;
    }

    const resp = await axios.put(`http://localhost:8000/ingredient/${id}`, {
      name: data?.name,
      Description: data?.description,
    });
    console.log(resp);
    reFetch();
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
        ]}
        onModify={(model) => {
          setModifyMode(true);
          setData({
            name: model.name,
            description: model.Description,
          });
          setId(model._id);
        }}
        onDelete={async (model) => {
          await axios.delete(`http://localhost:8000/ingredient/${model._id}`);
          reFetch()
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
