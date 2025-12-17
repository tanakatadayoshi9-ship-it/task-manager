import { useEffect, useState } from "react";

const API_URL = "http://localhost:5000";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  // Load tasks
  useEffect(() => {
    fetch(`${API_URL}/tasks`)
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch(console.error);
  }, []);

  // Add task
  const addTask = async () => {
    if (!title.trim()) return;

    const res = await fetch(`${API_URL}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title }),
    });

    const newTask = await res.json();
    setTasks([...tasks, newTask]);
    setTitle("");
  };

  // Update status
  const updateStatus = async (id, status) => {
    await fetch(`${API_URL}/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    });

    setTasks(tasks.map(t => t.id === id ? { ...t, status } : t));
  };

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(t => t.id !== id));
  };

  const statusColor = (status) => {
    if (status === "todo") return "bg-gray-200 text-gray-700";
    if (status === "doing") return "bg-yellow-200 text-yellow-800";
    return "bg-green-200 text-green-800";
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-start pt-12 font-sans">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6">
        
        <h1 className="text-2xl font-semibold text-center mb-6">
          Task Manager
        </h1>

        {/* Add Task */}
        <div className="flex gap-2 mb-4">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
            className="flex-1 border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-blue-200"
          />
          <button
            onClick={addTask}
            className="bg-blue-600 text-white px-4 rounded-lg hover:bg-blue-700"
          >
            Add
          </button>
        </div>

        {/* Task List */}
        <ul className="space-y-3">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border rounded-lg p-3 flex justify-between items-center"
            >
              <div>
                <p className="font-medium">{task.title}</p>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${statusColor(task.status)}`}
                >
                  {task.status}
                </span>
              </div>

              <div className="flex gap-1">
                <button
                  onClick={() => updateStatus(task.id, "todo")}
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Todo
                </button>
                <button
                  onClick={() => updateStatus(task.id, "doing")}
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Doing
                </button>
                <button
                  onClick={() => updateStatus(task.id, "done")}
                  className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
                >
                  Done
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-xs px-2 py-1 border rounded text-red-500 hover:bg-red-50"
                >
                  ✕
                </button>
              </div>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}

export default App;


