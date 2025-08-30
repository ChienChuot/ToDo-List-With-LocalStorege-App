import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  //date
  const [date, setDate] = useState(new Date());
  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);
  //input task
  const [task, setTask] = useState("");

  //list task
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  //save task
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  //add task
  const addTask = () => {
    if (task.trim() === "") return;
    setTasks([...tasks, task]);
    setTask("");
  };

  //delete task
  const deletaTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  //clearAll
  const clearALl = () => {
    setTasks([]);
  };

  return (
    <div className="App">
      <h1>{date.toLocaleString()}</h1>
      <h1>Todo List</h1>
      <input
        placeholder="Input Task"
        value={task}
        type="text"
        onChange={(e) => setTask(e.target.value)}
      />
      <button onClick={addTask}>Add</button>
      <button onClick={clearALl}>Clear All</button>

      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            {task}
            <button onClick={() => deletaTask(index)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
