import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    todosList: JSON.parse(localStorage.getItem('todosList')) || [],
  };

export const todoSlice = createSlice({
       name:"todos",
       initialState,
       reducers:{
        addTodos:(state,action)=>{
          state.todosList.push(action.payload);
          localStorage.setItem('todosList', JSON.stringify(state.todosList));
        },
        deleteTodos:(state,action)=>{
          state.todosList = state.todosList.filter((todo)=>todo.id!==action.payload);
          localStorage.setItem('todosList', JSON.stringify(state.todosList));
        },
        removeTodos:(state)=>{
          state.todosList = [];
          localStorage.setItem('todosList', JSON.stringify(state.todosList));
        },
        updateTodo: (state, action) => {
          const { id, category, todo } = action.payload;
          const todoIndex = state.todosList.findIndex((todo) => todo.id === id);
          if (todoIndex !== -1) {
            state.todosList[todoIndex].category = category;
            state.todosList[todoIndex].todo = todo;
          }
          localStorage.setItem('todosList', JSON.stringify(state.todosList));
        },
        completeTodo: (state, action) => {
          const todo = state.todosList.find((todo) => todo.id === action.payload);
          if (todo) {
            todo.complete = true;
          }
          localStorage.setItem('todosList', JSON.stringify(state.todosList));
        },
      }
});

export const {addTodos,deleteTodos,removeTodos,updateTodo,completeTodo} = todoSlice.actions;
export default todoSlice.reducer;