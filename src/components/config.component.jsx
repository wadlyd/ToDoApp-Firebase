import React, { useEffect, useState } from "react";
// Firebase
import { deleteDoc, doc } from "firebase/firestore";
import store from "../firebase/firebase.config";

const Config = ({
  numTasks,
  completed,
  staticTasks,
  getAll,
  getActive,
  getCompleted,
  reset,
}) => {
  const [Filter, setFilter] = useState("all");
  useEffect(() => {
    return () => {
      setFilter("all");
    };
  }, [reset]);

  const clearCompleted = async () => {
    completed.forEach((id) => deleteDoc(doc(store, "tasks", id)));
  };
  const filterAll = () => (getAll(), setFilter("all"));

  const filterActive = () => {
    const active = staticTasks.filter((task) => !task.completed);
    getActive(active);
    setFilter("active");
  };
  const filterCompleted = () => {
    const completed = staticTasks.filter((task) => task.completed);
    getCompleted(completed);
    setFilter("completed");
  };
  return (
    <div className="config-task">
      <div className="counting-items">
        {numTasks <= 0 ? (
          <span>No tasks at all</span>
        ) : (
          <span>{numTasks} Items left</span>
        )}
        <div className="delete-items">
          <button onClick={clearCompleted}>Clear Completed</button>
        </div>
      </div>
      <div className="filter-items">
        <button
          className={Filter === "all" ? "active" : ""}
          onClick={() => filterAll("all")}
        >
          All
        </button>
        <button
          className={Filter === "active" ? "active" : ""}
          onClick={() => filterActive()}
        >
          Active
        </button>
        <button
          className={Filter === "completed" ? "active" : ""}
          onClick={() => filterCompleted()}
        >
          Completed
        </button>
      </div>
    </div>
  );
};

export default Config;
