import axios from "axios";
import { useEffect, useState } from "react";
export default function App() {
  const [tasks, setTasks] = useState<string[]>([])

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/tasks")
      .then((res) => {
        console.log("Fetched tasks: ", res.data);
        setTasks(res.data.map((task: { name: string }) => task.name));
      })
      .catch((err) => {
        console.error("Error fetching notes:", err);
      });
  }, []);

  useEffect(() => {
    console.log("Updated Tasks: ", tasks);

  }, [tasks]);

  return (
    
    <div>

      {tasks.map((task, index)=>(
        <h1 key={index}>{task}</h1>
      ))}

    </div>

  )
}