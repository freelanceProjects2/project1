import classes from "./table.module.css";

function Table({ data }) {
  return (
    <div className={classes.tableContainer}>
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
          {data?.map((model, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{model.name}</td>
              <td>{model.description}</td>
              <td>{model.unitPrice}</td>
              <td>{model.range}</td>
              <td>{model.ingredients}</td>
              <td>{model.weight}</td>
              <td>
                <button className={classes.modifyButton}>Modify</button>
                <button className={classes.deleteButton}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
