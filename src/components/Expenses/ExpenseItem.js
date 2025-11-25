import React, { useState } from "react";

import "./ExpenseItem.css";
import ExpenseDate from "./ExpenseDate";
import Card from "../UI/Card";

// gonna learn about states now!

function ExpenseItem({title, amount, date}) {

  // const [title, setTitle] = useState(props.title);

  // const titleChangeHandler = () => {
  //   setTitle("Updated");
  // }

  return (
    <Card className="expense-item">
      <ExpenseDate date={props.date} />
        <div className="expense-item__description">
        <h2>{title}</h2>
        <div className="expense-item__price">{amount.toLocaleString(undefined, { style: 'currency', currency: 'USD' })}</div>
      </div>
      
    </Card>
  );
}

export default ExpenseItem;
