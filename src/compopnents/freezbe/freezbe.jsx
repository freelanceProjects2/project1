import classes from "./freezbe.module.css";

function Freezbe() {
  return (
    <div>
      {/* First pair of inputs */}
      <form>
        <div className={classes.inputContainer}>
          <input type="text" name="name" placeholder="Name" />
          <input type="text" name="description" placeholder="Description" />
        </div>

        {/* Second pair of inputs */}
        <div className={classes.inputContainer}>
          <input type="number" name="unitPrice" placeholder="Unit Price" />
          <input type="number" name="range" placeholder="Range" />
        </div>

        {/* Third pair of inputs */}
        <div className={classes.inputContainer}>
          <input
            type="text"
            name="ingredients"
            placeholder="Ingredients (comma separated)"
          />
          <input type="number" name="weight" placeholder="Weight" />
        </div>
        <button className={classes.addButton}>Add</button>
      </form>
    </div>
  );
}

export default Freezbe;
