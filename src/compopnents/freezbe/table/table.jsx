import classes from "./table.module.css";

function Table({ modelData, setModelData, setData, setModifyMode, setIndex }) {
  const modifyHandler = (mode, index) => {
    setModifyMode(true);
    setData({
      name: mode.name,
      description: mode.description,
      unitPrice: mode.unitPrice,
      range: mode.range,
      ingredients: mode.ingredients,
      weight: mode.weight,
    });
    setIndex(index);
  };

  const handleDelete = (index) => {
    setModelData((prevData) => {
      const updateModel = [...prevData];
      updateModel.splice(index, 1);
      return updateModel;
    });
  };

  return (
    <div className={classes.tableContainer}>
      {modelData.length === 0 ? (
        <div>No data found</div>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Unit Price</th>
              <th>Range</th>
              <th>Ingredients</th>
              <th>Weight</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modelData?.map((model, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{model.name}</td>
                <td>{model.description}</td>
                <td>{model.unitPrice}</td>
                <td>{model.range}</td>
                <td>{model.ingredients}</td>
                <td>{model.weight}</td>
                <td>
                  <button
                    className={classes.modifyButton}
                    onClick={() => modifyHandler(model, index)}
                  >
                    Modify
                  </button>
                  <button
                    className={classes.deleteButton}
                    onClick={() => handleDelete(index)}
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

export default Table;
