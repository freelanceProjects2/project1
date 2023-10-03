import React from "react";
import PropTypes from "prop-types";
import classes from "./table.module.css";

function Table({ data, columns, onModify, onDelete, isLoading }) {
  // Custom rendering function for the unitPrice column
  const renderUnitPrice = (value) => `$${value}`;
  const userInfo = JSON.parse(localStorage.getItem("userInfo"));

  // Custom rendering function for the weight column
  const renderWeight = (value) => `${value} kg`;

  const customRenderers = {
    unitPrice: renderUnitPrice,
    weight: renderWeight,
  };

  return (
    <div className={classes.tableContainer}>
      {isLoading ? (
        <div className={classes.loading}>Loading...</div>
      ) : data?.length === 0 ? (
        <div className={classes.noData}>No data found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              {columns?.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              {(userInfo.role === "superadmin" ||
                userInfo.role === "admin") && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data?.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column?.field === "testValidations" ? ( // Check if the field is "testValidations"
                      <ul>
                        {item[column?.field].map(
                          (validation, validationIndex) => (
                            <li key={validationIndex}>{validation}</li>
                          )
                        )}
                      </ul>
                    ) : column?.field === "steps" ? ( // Check if the field is "steps"
                      <ul>
                        {item[column?.field].map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ul>
                    ) : customRenderers[column?.field] ? ( // Check if a custom renderer is defined for the column
                      customRenderers[column?.field](item[column?.field])
                    ) : (
                      item[column?.field]
                    )}
                  </td>
                ))}
                {(userInfo.role === "superadmin" ||
                  userInfo.role === "admin") && (
                  <td>
                    <button
                      className={classes.modifyButton}
                      onClick={() => onModify(item)}
                    >
                      Modify
                    </button>
                    <button
                      className={classes.deleteButton}
                      onClick={() => onDelete(item)}
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      field: PropTypes.string.isRequired,
    })
  ).isRequired,
  onModify: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired, // Add isLoading prop
};

export default Table;
