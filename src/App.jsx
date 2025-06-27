import React, { useEffect, useState } from "react";
import { TodoProvider } from "./contexts/TodoContext";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

const App = () => {
  // Initial empty todo state
  const [todos, setTodos] = useState([]);

  // Load todos from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem("todos");
    if (saved) {
      setTodos(JSON.parse(saved));
    }
  }, []);

  // Save todos to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  // Add new todo
  const addTodo = (text) => {
    setTodos([...todos, { id: Date.now(), text, completed: false }]);
  };

  // Delete a todo by id
  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  // Toggle completed state of a todo
  const toggleTodo = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  // Edit the text of a todo
  const editTodo = (id, newText) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: newText } : todo
      )
    );
  };

  // Prepare the context value
  const contextValue = {
    todos,
    addTodo,
    deleteTodo,
    toggleTodo,
    editTodo,
  };

  return (
    <TodoProvider value={contextValue}>
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold text-center mb-4">📝 My Todo App</h2>
          <TodoInput />
          <TodoList />
        </div>
      </div>
    </TodoProvider>
  );
};

export default App;
