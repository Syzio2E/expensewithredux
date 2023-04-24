import React, { useEffect, useState } from "react";
import { useDispatch} from "react-redux";
import { Link } from "react-router-dom";
import { toggleTheme } from "../redux/themeReducer";
import { setPremium } from "../redux/ExpenseReducer";



const Home = () => {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [editExpense,setEditExpense] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    const url =
      "https://react-http-efc29-default-rtdb.firebaseio.com/expense.json";
    fetch(url)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something went wrong!");
        }
        return response.json();
      })
      .then((data) => {
        const loadedExpenses = [];
        for (const key in data) {
          loadedExpenses.push({
            id: key,
            amount: data[key].amount,
            description: data[key].description,
            selectedItem: data[key].selectedItem,
          });
        }
        setExpenses(loadedExpenses);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const downloadCSV = () => {
    const csv = expenses.map(expense => `${expense.amount},${expense.description},${expense.selectedItem}`).join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv));
    link.setAttribute('download', 'expenses.csv');
    link.click();
  }
  

  const submitHandler = (e) => {
    e.preventDefault();

    if (amount > 10000) {
      dispatch(setPremium())
    }
    
    const newExpense = {
      id: Math.random().toString(),
      amount,
      description,
      selectedItem,
    };
    setExpenses((prevExpenses) => [...prevExpenses, newExpense]);
    if (amount > 10000) {
      dispatch(toggleTheme())
    }

    const url =
      "https://react-http-efc29-default-rtdb.firebaseio.com/expense.json";
    const requestBody = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newExpense),
    };

    fetch(url, requestBody)
      .then((response) => {
        if (!response.ok) {
          throw new Error("could not store data");
        }
        return response.json();
      })
      .then((data) => {
        console.log("Data stored successfully:", data);
      })
      .catch((error) => {
        console.log("Error storing data:", error.message);
      });

    setAmount("");
    setDescription("");
    setSelectedItem("");
  };

  const deleteHandler = (id) => {
    const url = `https://react-http-efc29-default-rtdb.firebaseio.com/expense/${id}.json`;
    const requestBody = {
      method: "DELETE",
    };

    fetch(url, requestBody)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not delete expense");
        }
        setExpenses((prevExpenses) =>
          prevExpenses.filter((expense) => expense.id !== id)
        );
      })
      .catch((error) => {
        console.log("Error deleting expense:", error.message);
      });
  };

  const updateHandler = (e) => {
    e.preventDefault();

    const url = `https://react-http-efc29-default-rtdb.firebaseio.com/expense/${editExpense.id}.json`;
    const requestBody = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editExpense),
    };

    fetch(url, requestBody)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Could not update data");
        }
        return response.json();
      })
      .then((data) => {
        const updatedExpenses = expenses.map((expense) => {
          if (expense.id === editExpense.id) {
            return editExpense;
          }
          return expense;
        });
        setExpenses(updatedExpenses);
        setEditMode(false);
        setEditExpense({});
      })
      .catch((error) => {
        console.log("Error updating data:", error.message);
      });
  };

  return (
    <div>
      <h1>Welcome to Expense Tracker</h1>
      <p>Your profile is incomplete</p>
      <Link to="/home/userprofile">Click here to complete profile</Link>
      <Link to="/home/verify">Verify Email</Link>
      <form onSubmit={editMode ? updateHandler : submitHandler}>
        <label htmlFor="expense-amount">Amount:</label>
        <input
          type="number"
          id="expense-amount"
          value={editMode ? editExpense.amount : amount}
          onChange={(e) => {
            editMode
              ? setEditExpense({ ...editExpense, amount: e.target.value })
              : setAmount(e.target.value);
          }}
        />
        <label htmlFor="expense-description">Description:</label>
        <input
          type="text"
          id="expense-description"
          value={editMode ? editExpense.description : description}
          onChange={(e) => {
            editMode
              ? setEditExpense({ ...editExpense, description: e.target.value })
              : setDescription(e.target.value);
          }}
        />
        <select
          id="items"
          value={editMode ? editExpense.selectedItem : selectedItem}
          onChange={(e) => {
            editMode
              ? setEditExpense({ ...editExpense, selectedItem: e.target.value })
              : setSelectedItem(e.target.value);
          }}
        >
          <option value="">Select an item</option>
          <option value="Food">Food</option>
          <option value="Petrol">Petrol</option>
          <option value="Salary">Salary</option>
        </select>
        <button type="submit">{editMode ? "Update" : "Add"}</button>
      </form>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.amount} - {expense.description} - {expense.selectedItem}
            <button
              onClick={() => {
                setEditMode(true);
                setEditExpense(expense);
              }}
            >
              Edit
            </button>
            <button
              onClick={() => {
                deleteHandler(expense.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={downloadCSV}>Download CSV</button>
    </div>
  );
};

export default Home;
