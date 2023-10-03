import React, { useState, useEffect } from "react";
import classes from "../Css/models.module.css";
import Table from "../table/table";
import useFetch from "../../useFetch";
import axios from "axios";

function User() {
  const { modelData, isLoading, reFetch } = useFetch("user");
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [searchText, setSearchText] = useState("");
  const [error, setError] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    role: "",
  });

  const [modifyMode, setModifyMode] = useState(false);
  const [id, setId] = useState();

  const [filteredModelData, setFilteredModelData] = useState([]);

  useEffect(() => {
    // Filter the data based on the search text
    const newData = modelData?.filter(
      (item) =>
        item.first_name &&
        item.first_name.toLowerCase().includes(searchText.toLowerCase())
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

    if (data.first_name?.length === 0) {
      setError((prevData) => ({
        ...prevData,
        first_name: "Please enter a first name",
      }));
      emptyFields.push("FirstName");
    } else if (data.first_name?.length < 3) {
      setError((prevData) => ({
        ...prevData,
        first_name: "First name should be at least 3 characters",
      }));
      emptyFields.push("FirstName");
    }

    if (data.last_name?.length === 0) {
      setError((prevData) => ({
        ...prevData,
        last_name: "Please enter a last name",
      }));
      emptyFields.push("LastName");
    } else if (data.last_name?.length < 3) {
      setError((prevData) => ({
        ...prevData,
        last_name: "Last name should be at least 3 characters",
      }));
      emptyFields.push("LastName");
    }

    if (data.email?.length === 0) {
      setError((prevData) => ({
        ...prevData,
        email: "Please enter an email",
      }));
      emptyFields.push("Email");
    }

    if (data.password?.length === 0) {
      setError((prevData) => ({
        ...prevData,
        password: "Please enter a password",
      }));
      emptyFields.push("Password");
    }

    if (data.role?.length === 0) {
      setError((prevData) => ({
        ...prevData,
        role: "Please select a role",
      }));
      emptyFields.push("Role");
    }

    if (emptyFields?.length > 0) {
      return;
    }

    if (!modifyMode) {
      await axios.post("http://localhost:8000/user", {
        first_name: data?.first_name,
        last_name: data?.last_name,
        email: data?.email,
        password: data?.password,
        role: data?.role,
      });
      reFetch();
      setData({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
        role: "user",
      });

      return;
    }

    // Update an existing item
    await axios.put(`http://localhost:8000/user/${id}`, {
      first_name: data?.first_name,
      last_name: data?.last_name,
      email: data?.email,
      password: data?.password,
      role: data?.role,
    });
    reFetch();
    setModifyMode(false);

    setData({
      first_name: "",
      last_name: "",
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
                name="first_name"
                placeholder="Enter a first name"
                value={data.first_name}
                onChange={handleFormChange}
              />
              {error.first_name && (
                <div className={classes.error}>{error.first_name}</div>
              )}
            </div>
            <div className={classes.labels}>
              <label>Last Name</label>
              <input
                type="text"
                name="last_name"
                placeholder="Enter a last name"
                value={data.last_name}
                onChange={handleFormChange}
              />
              {error.last_name && (
                <div className={classes.error}>{error.last_name}</div>
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
                className={classes.dropDown}
                value={data.role}
                onChange={handleFormChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="superadmin">Superadmin</option>
              </select>
              {error.role && <div className={classes.error}>{error.role}</div>}
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
        isLoading={isLoading}
        columns={[
          { label: "First Name", field: "first_name" },
          { label: "Last Name", field: "last_name" },
          { label: "Email", field: "email" },
          { label: "Role", field: "role" },
        ]}
        onModify={(model) => {
          setModifyMode(true);
          setData({
            first_name: model.first_name,
            last_name: model.last_name,
            email: model.email,
            role: model.role,
          });
          setId(model._id);
        }}
        onDelete={async (model) => {
          await axios.delete(`http://localhost:8000/user/${model._id}`);
          reFetch()
          setModifyMode(false);
          setData({
            first_name: "",
            last_name: "",
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
