import React, { useReducer, createContext, useContext, useRef } from 'react';
import axios from 'axios';
//import { toggleTodo } from './components/TodoItem';
/* 지금은 localStorage를 사용하지 않아도 되기 때문에 주석처리
JSON.parse => string 객체를 JSON으로 변경 */
//const initialTodos = JSON.parse(localStorage.getItem('todo') || '[]');
const initialTodos = [];
//console.log(initialTodos);

//const initialTodos = axios.get('http://localhost:8000/api/get');

/* 상태 반환 */
function todoReducer(state, action) {
  switch (action.type) {
    case 'INIT' : {
      return state.concat(action.DBtodos);
    };
    case 'CREATE':
      return state.concat(action.todo);
    case 'TOGGLE': {
      return state.map(todo =>
        todo.id === action.id ? { ...todo, done: !todo.done } : todo
      );   
    }
    case 'REMOVE':
      //console.log("action id : " + action.id);
      return state.filter(todo => todo.id !== action.id);

    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
}

const TodoStateContext = createContext();
const TodoDispatchContext = createContext();
const TodoNextIdContext = createContext();

export function TodoProvider({ children }) {
  const [state, dispatch] = useReducer(todoReducer, initialTodos);
  const nextId = useRef(Math.floor(Math.random() * 999999));
  return (
    <TodoStateContext.Provider value={state}>
      <TodoDispatchContext.Provider value={dispatch}>
        <TodoNextIdContext.Provider value={nextId}>
          {children}
        </TodoNextIdContext.Provider>
      </TodoDispatchContext.Provider>
    </TodoStateContext.Provider>
  );
}

export function useTodoState() {
  const context = useContext(TodoStateContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoDispatch() {
  const context = useContext(TodoDispatchContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}

export function useTodoNextId() {
  const context = useContext(TodoNextIdContext);
  if (!context) {
    throw new Error('Cannot find TodoProvider');
  }
  return context;
}