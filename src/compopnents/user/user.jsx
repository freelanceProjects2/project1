import React, { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";

function User() {
  const [modelData, setModelData] = useState(() => {
    const savedModelDataJSON = localStorage.getItem("modelDataProcedures");
    return savedModelDataJSON ? JSON.parse(savedModelDataJSON) : [];
  });

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "user",
  });

  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    role: "",
  });
  
  const [modifyMode, setModifyMode] = useState(false);
  const [index, setIndex] = useState();

  const [filteredModelData, setFilteredModelData] = useState([]);

  useEffect(() => {
    // Filter the data based on the search text
    const newData = modelData.filter(
      (item) =>
        item.firstName &&
        item.firstName.toLowerCase().includes(searchText.toLowerCase())
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

    setData((prevState) => ({ ...prevState, [name]: value }));
    setError((prevState) => ({ ...prevState, [name]: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const emptyFields = [];

    if (data.firstName.length === 0) {
      setError((prevData) => ({
        ...prevData,
        firstName: "Please enter a first name",
      }));
      emptyFields.push("FirstName");
    } else if (data.firstName.length < 3) {
      setError((prevData) => ({
        ...prevData,
        firstName: "First name should be at least 3 characters",
      }));
      emptyFields.push("FirstName");
    }

    if (data.lastName.length === 0) {
      setError((prevData) => ({
        ...prevData,
        lastName: "Please enter a last name",
      }));
      emptyFields.push("LastName");
    } else if (data.lastName.length < 3) {
      setError((prevData) => ({
        ...prevData,
        lastName: "Last name should be at least 3 characters",
      }));
      emptyFields.push("LastName");
    }

    if (data.email.length === 0) {
      setError((prevData) => ({
        ...prevData,
        email: "Please enter an email",
      }));
      emptyFields.push("Email");
    } else if (
      !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email)
    ) {
      setError((prevData) => ({
        ...prevData,
        email: "Please enter a valid email address",
      }));
      emptyFields.push("Email");
    }

    if (data.password.length === 0) {
      setError((prevData) => ({
        ...prevData,
        password: "Please enter a password",
      }));
      emptyFields.push("Password");
    }

    if (data.role.length === 0) {
      setError((prevData) => ({
        ...prevData,
        role: "Please select a role",
      }));
      emptyFields.push("Role");
    }

    if (emptyFields.length > 0) {
      return;
    }

    if (!modifyMode) {
      setModelData([
        ...modelData,
        {
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: data.password,
          role: data.role,
        },
      ]);

      setData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        role: "user",
      });

      return;
    }

    // Update an existing item
    const updatedModelData = [...modelData];
    updatedModelData[index] = {
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      password: data.password,
      role: data.role,
    };

    setModelData(updatedModelData);

    setModifyMode(false);

    setData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      role: "user",
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
              <label>First Name</label>
              <input
                type="text"
                name="firstName"
                placeholder="Enter a first name"
                value={data.firstName}
                onChange={handleFormChange}
              />
              {error.firstName && (
                <div className={classes.error}>{error.firstName}</div>
              )}
            </div>
            <div className={classes.labels}>
              <label>Last Name</label>
              <input
                type="text"
                name="lastName"
                placeholder="Enter a last name"
                value={data.lastName}
                onChange={handleFormChange}
              />
              {error.lastName && (
                <div className={classes.error}>{error.lastName}</div>
              )}
            </div>
          </div>

          {/* Second pair of inputs */}
          <div className={classes.inputContainer}>
            <div className={classes.labels}>
              <label>Email</label>
              <input
                type="text"
                placeholder="Enter an email"
                name="email"
                value={data.email}
                onChange={handleFormChange}
              />
              {error.email && (
                <div className={classes.error}>{error.email}</div>
              )}
            </div>
            <div className={classes.labels}>
              <label>Password</label>
              <input
                type="password"
                name="password"
                placeholder="Enter a password"
                value={data.password}
                onChange={handleFormChange}
              />
              {error.password && (
                <div className={classes.error}>{error.password}</div>
              )}
            </div>
          </div>

          {/* Role selection */}
          <div className={classes.inputContainer}>
            <div className={classes.labels}>
              <label>Role</label>
              <select
                name="role"
                value={data.role}
                onChange={handleFormChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              {error.role && (
                <div className={classes.error}>{error.role}</div>
              )}
            </div>
          </div>

          <div className={`${classes.searchBar} ${classes.inputContainer}`}>
           
          <input
              type="text"
              name="search"
              placeholder="Search by first name"
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
          { label: "First Name", field: "firstName" },
          { label: "Last Name", field: "lastName" },
          { label: "Email", field: "email" },
          { label: "Role", field: "role" },
        ]}
        onModify={(model, index) => {
          setModifyMode(true);
          setData({
            firstName: model.firstName,
            lastName: model.lastName,
            email: model.email,
            password: model.password,
            role: model.role,
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
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            role: "user",
          });
        }}
      />
    </>
  );
}

export default User;
