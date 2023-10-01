import React from "react";
import PropTypes from "prop-types";
import classes from "./table.module.css";

function Table({ data, columns, onModify, onDelete }) {
  // Custom rendering function for the unitPrice column
  const renderUnitPrice = (value) => `$${value}`;

  // Custom rendering function for the weight column
  const renderWeight = (value) => `${value} kg`;

  const customRenderers = {
    unitPrice: renderUnitPrice,
    weight: renderWeight,
  };

  return (
    <div className={classes.tableContainer}>
      {data.length === 0 ? (
        <div className={classes.noData}>No data found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>

              {columns.map((column, index) => (
                <th key={index}>{column.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                {columns.map((column, columnIndex) => (
                  <td key={columnIndex}>
                    {column.field === "testValidations" ? ( // Check if the field is "testValidations"
                      <ul>
                        {item[column.field].map(
                          (validation, validationIndex) => (
                            <li key={validationIndex}>{validation}</li>
                          )
                        )}
                      </ul>
                    ) : column.field === "steps" ? ( // Check if the field is "steps"
                      <ul>
                        {item[column.field].map((step, stepIndex) => (
                          <li key={stepIndex}>{step}</li>
                        ))}
                      </ul>
                    ) : customRenderers[column.field] ? ( // Check if a custom renderer is defined for the column
                      customRenderers[column.field](item[column.field])
                    ) : (
                      item[column.field]
                    )}
                  </td>
                ))}
                <td>
                  <button
                    className={classes.modifyButton}
                    onClick={() => onModify(item, index)}
                  >
                    Modify
                  </button>
                  <button
                    className={classes.deleteButton}
                    onClick={() => onDelete(index)}
                  >
                    Delete
                  </button>
                </td>
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
};

export default Table;
