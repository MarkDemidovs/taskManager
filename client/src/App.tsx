import axios from "axios";
import { useEffect, useState } from "react";
import Search from "./Search";
export default function App() {
  const [tasks, setTasks] = useState<
    { id: number; name: string; completed: boolean }[]
  >([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((res) => {
        console.log("Fetched tasks: ", res.data);
        setTasks(res.data); // Store the full task object
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
      });
  }, []);

  const deleteTask = (id: number) => {
    axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(() => {
        setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
        console.log(`Task with id ${id} deleted`);
      })
      .catch((err) => {
        console.error("Error deleting task:", err);
      });
  };

  return (
    <>
      <Search />
      {tasks.map((task) => (
        <div key={task.id}>
          <h1>{task.name}</h1>
          <button>Complete</button>
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </div>
      ))}
    </>
  );
}
