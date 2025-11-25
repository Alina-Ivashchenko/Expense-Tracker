import React, {useState} from "react";
import ExpenseForm from "./ExpenseForm";
import "./NewExpense.css";

const NewExpense = (props) => {

  const saveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData ={
      ...enteredExpenseData,
      id: Date.now().toString()
    }

    props.onAddExpense(expenseData);
  }

  const [vis, setVis] = useState(false);

  const addNewExpenseButtonHandler = () => {
    setVis(true);
  };

  return (
    <div className="new-expense">

        {!vis && (<button onClick={addNewExpenseButtonHandler}>Add New Expense</button>)}
        
        {vis && <ExpenseForm onCancel={() => setVis(false)} onSaveExpenseData={saveExpenseDataHandler} />}
        
    </div>
  );
};

export default NewExpense;

