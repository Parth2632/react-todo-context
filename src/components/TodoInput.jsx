import React, { useContext, useState } from "react";
import { TodoContext } from "../contexts/TodoContext";

function TodoInput(){
    const { addTodo } = useContext(TodoContext);
    const [text, setText] = useState("");
    const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") return;
    addTodo(text);
    setText("");
};
    return(
        <>
        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
            <input
            type="text"
            placeholder="Enter a todo..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="flex-1 px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
            Add
        </button>


        </form>

        </>
    )

}
export default TodoInput;
