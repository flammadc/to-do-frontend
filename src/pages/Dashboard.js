import { React, useState, useEffect } from "react";
import { useTodosContext } from "../hooks/useTodosContext";

import Todo from "../components/Todo";
import Form from "../components/Form";

const Dashboard = () => {
  const { todos, dispatch } = useTodosContext();
  useEffect(() => {
    const fetchTodos = async () => {
      const response = await fetch("/api/todos");
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_TODOS", payload: json });
      }
    };
    fetchTodos();
  }, []);

  return (
    <main className="bg-gray-100 border-gray-200 px-4 sm:px-6 py-8 rounded dark:bg-gray-900">
      <div
        className={
          "container flex flex-col flex-nowrap mx-auto my-auto " + "h-full"
        }
      >
        <h1 className="text-lg font-bold mb-8">Dashboard page</h1>
        <div className="grid grid-cols-3 gap-6 sm:gap-12">
          <div className="flex gap-3 flex-col col-span-2">
            {todos == 0 ? <p>Nothing To do</p> : ""}
            {todos && todos.map((todo) => <Todo key={todo._id} todo={todo} />)}
          </div>
          <div className="col-span-1">
            <Form />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
