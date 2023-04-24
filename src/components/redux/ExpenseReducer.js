import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  premium: false
};

const expenseSlice = createSlice({
  name: 'expense',
  initialState,
  reducers: {
   
    setExpense: (state, action) => {
      return {
        ...state,
        items: action.payload
      };
    },
    addExpense: (state, action) => {
      const newExpense = action.payload;
      const isPremium = newExpense.amount > 10000;
      return {
        ...state,
        items: [...state.items, newExpense],
        premium: isPremium
      };
    },
    updateExpenseSlice: (state, action) => {
      return {
        ...state,
        items: state.items.map((item) =>
          item.id === action.payload.id ? action.payload : item
        ),
      };
    },
    deleteExpenseSlice: (state, action) => {
      return {
        ...state,
        items: state.items.filter((item) =>
          item.id !== action.payload.id
        ),
      };
    },
    setPremium: (state, action) => {
      return {
        ...state,
        premium: !state.premium
      }
    }
  }
})

export const { setExpense, addExpenseSlice, updateExpenseSlice, deleteExpenseSlice, setPremium} = expenseSlice.actions;
export default expenseSlice;
