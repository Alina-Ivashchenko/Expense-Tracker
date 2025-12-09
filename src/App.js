import React, {useEffect, useState} from "react";
import "./App.css";
import DisplayExpenses from "./components/Expenses/DisplayExpenses";
import NewExpense from "./components/NewExpense/NewExpense";

const DUMMY_EXPENSES = [
    {
      id: "e1",
      title: "Toilet Paper",
      amount: 94.12,
      date: new Date(2020, 7, 14),
    },
    {
      id: "e2",
      title: "New TV",
      amount: 799.49,
      date: new Date(2021, 6, 9),
    },
    {
      id: "e3",
      title: "Car Insurance",
      amount: 294.67,
      date: new Date(2020, 9, 29),
    },
    {
      id: "e4",
      title: "New Desk (wooden)",
      amount: 450,
      date: new Date(2020, 2, 12),
    },
  ];

const App = () => {

  const loadInitialExpenses = () => {
    if (typeof window === "undefined") {
      return DUMMY_EXPENSES;
    }

    try {
      const storedExpenses = window.localStorage.getItem("expenses");
      if (!storedExpenses) {
        return DUMMY_EXPENSES;
      }
      const parsedExpenses = JSON.parse(storedExpenses);
      return parsedExpenses.map((expense) => ({
        ...expense,
        date: new Date(expense.date),
      }));
    } catch (error) {
      console.error("Failed to parse expenses from storage:", error);
      return DUMMY_EXPENSES;
    }
  };

  const [expenses, setExpenses] = useState(loadInitialExpenses);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.localStorage.setItem("expenses", JSON.stringify(expenses));
    }
  }, [expenses]);

  const addExpenseHandler = expense => {
    setExpenses(prevExpenses => {
      return [expense, ...prevExpenses];
    });
  }

  const deleteExpenseHandler = (expenseId) => {
    setExpenses((prevExpenses) =>
      prevExpenses.filter((expense) => expense.id !== expenseId)
    );
  };

  return (
  <div className="App">
    <header className="App-header">
      <div className="App-header-inner">
        <div className="App-title">Expense Tracker</div>
      </div>
    </header>

    <main className="App-main">
      <aside className="App-sidebar">
        <NewExpense onAddExpense={addExpenseHandler} />
      </aside>

      <section className="App-content">
        <DisplayExpenses expenses={expenses} onDeleteExpense={deleteExpenseHandler} />
      </section>
    </main>

  </div>
 );
};

export default App;
