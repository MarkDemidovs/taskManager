import { useState, useEffect } from "react"
import axios from "axios";

export default function Search() {
    const [searchValue, setSearchValue] = useState<string>("");
    const [tasks, setTasks] = useState<string[]>([]);

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

    const createTask = async () => {
        if (searchValue.trim()) {
            try {
                console.log("Creating note...");
                const res = await axios.post("http://localhost:3000/api/tasks", { name: searchValue }); // Send { name: ... }
                
                setTasks((prevTasks) => [...prevTasks, res.data.name]);
                setSearchValue("");
                
                console.log("Created!");
            } catch (err) {
                console.error("Error creating task through axios backend: ", err);
                alert("Error creating task! Check the console for more info.");
            }
        } else {
            console.log("ERROR! Cannot create note due to the Search Input being empty!");
        }
    };

    return (
        <div>

        <input type="text" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder="Enter a new task.."/>
        <button onClick={createTask}>Add</button>

        </div>
    )
}