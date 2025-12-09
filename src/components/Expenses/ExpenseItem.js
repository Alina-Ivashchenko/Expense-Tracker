import React from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

// gonna learn about states now!

function ExpenseItem({id, title, amount, date, onDelete}) {

  // const [title, setTitle] = useState(props.title);

  // const titleChangeHandler = () => {
  //   setTitle("Updated");
  // }

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(id);
    }
  };

  return (
    <Card className="expense-item">
      <ExpenseDate date={date} />
      <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__actions">
          <div className="expense-item__price">{amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</div>
          <button type="button" onClick={handleDeleteClick}>Delete</button>
        </div>
      </div>
    </Card>
  );
}

export default ExpenseItem;
