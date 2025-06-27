import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

const TodoItem = ({ todo }) => {
  // Access context functions
  const { deleteTodo, toggleTodo, editTodo } = useContext(TodoContext);

  // Local state for whether this item is in edit mode
  const [isEditing, setIsEditing] = useState(false);

  // Local state for the new value when editing
  const [newText, setNewText] = useState(todo.text);

  // Called when user clicks "Save"
  const handleSave = () => {
    if (newText.trim() === "") return; // Don't allow empty text
    editTodo(todo.id, newText);        // Update todo text in context
    setIsEditing(false);               // Exit edit mode
  };

  return (
    <div className="flex items-center justify-between bg-gray-50 px-4 py-2 rounded-md shadow-sm">
      {/* Left: checkbox + text or input */}
      <div className="flex items-center gap-2 flex-1">
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={() => toggleTodo(todo.id)}
          className="w-4 h-4"
        />

        {/* Edit mode: input box OR normal mode: text */}
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="flex-1 px-2 py-1 border rounded-md focus:outline-none"
          />
        ) : (
          <span
            className={`flex-1 ${
              todo.completed ? "line-through text-gray-400" : ""
            }`}
          >
            {todo.text}
          </span>
        )}
      </div>

      {/* Right: buttons */}
      <div className="flex gap-2 ml-2">
        {isEditing ? (
          <button
            onClick={handleSave}
            className="text-green-600 font-medium hover:underline"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="text-blue-600 font-medium hover:underline"
          >
            Edit
          </button>
        )}

        <button
          onClick={() => deleteTodo(todo.id)}
          className="text-red-600 font-medium hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default TodoItem;
