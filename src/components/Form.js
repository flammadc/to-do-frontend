import { useState } from "react";
import { useTodosContext } from "../hooks/useTodosContext";

const Form = () => {
  const { dispatch } = useTodosContext();
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const handleSubmit = async (e) => {
    e.preventDefault();

    const todo = { title };

    const response = await fetch("/api/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const json = await response.json();

    if (!response.ok) {
      setError(json.error);
    }
    if (response.ok) {
      setTitle("");
      setSuccess(true);
      setError(null);
      console.log("ok", json);
      dispatch({ type: "CREATE_TODO", payload: json });
    }
  };
  return (
    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
      <label
        htmlFor="title"
        className="block mb-2  font-semibold text-gray-900 dark:text-gray-300"
      >
        Title of Todo
      </label>
      <input
        type="text"
        id="title"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="Go to grocery"
        onChange={(e) => setTitle(e.target.value)}
        value={title}
      />
      <button className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 hover:px-6 hover:py-3 w-2/3 ease-in-out duration-150 mx-auto mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">
        Add Todo
      </button>
      {error && <div>{error}</div>}
    </form>
  );
};

export default Form;
