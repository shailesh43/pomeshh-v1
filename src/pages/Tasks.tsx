
import React, { useState } from "react";
import { usePomodoro } from "@/context/PomodoroProvider";
import { Plus, Edit, Trash2 } from "lucide-react";

const Tasks = () => {
  const { state, addTask, updateTask, deleteTask, toggleTask } = usePomodoro();
  const [taskInput, setTaskInput] = useState("");
  const [editing, setEditing] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    if (taskInput.trim()) {
      addTask(taskInput);
      setTaskInput("");
    }
  };

  const startEdit = (id: string, text: string) => {
    setEditing(id);
    setEditValue(text);
  };

  const handleEdit = (id: string) => {
    if (editValue.trim()) {
      updateTask(id, editValue);
      setEditing(null);
    }
  };

  return (
    <div className="flex-1 bg-[#181615] min-h-screen px-0 pt-10">
      <div className="container max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-white mb-2">Tasks</h1>
        <p className="mb-8 text-lg text-white/60">Focus on a few tasks and make progress on them.</p>
        <div className="flex gap-2 mb-4 w-full">
          <input
            className="flex-1 rounded-lg bg-[#23201d] border border-white/10 px-4 py-2 text-white outline-none"
            placeholder="Add a new task"
            value={taskInput}
            onChange={e => setTaskInput(e.target.value)}
            onKeyDown={e => e.key === "Enter" && handleAdd()}
          />
          <button
            className="bg-white hover:bg-white/80 text-black px-5 rounded-lg flex items-center justify-center"
            onClick={handleAdd}
          >
            <Plus size={20} />
          </button>
        </div>
        <div className="bg-[#23201d] rounded-lg shadow-md px-4 py-4 min-h-[120px] mb-4">
          {state.tasks.length === 0 && (
            <div className="text-white/40 text-center">No tasks.</div>
          )}
          {state.tasks.map(task => (
            <div key={task.id} className="flex items-center gap-2 py-2 border-b-[#2d2826] border-b last:border-b-0">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => toggleTask(task.id)}
                className="accent-white w-5 h-5"
              />
              {editing === task.id ? (
                <input
                  value={editValue}
                  onChange={e => setEditValue(e.target.value)}
                  onBlur={() => handleEdit(task.id)}
                  onKeyDown={e => e.key === "Enter" && handleEdit(task.id)}
                  className="bg-[#181615] text-white px-2 py-1 rounded focus:outline-none"
                  autoFocus
                />
              ) : (
                <span
                  className={`flex-1 text-white text-lg ${task.completed ? "line-through opacity-60" : ""}`}
                  onDoubleClick={() => startEdit(task.id, task.text)}
                >
                  {task.text}
                </span>
              )}
              <button
                className="p-1 hover:text-white/80"
                onClick={() => startEdit(task.id, task.text)}
                title="Edit"
              >
                <Edit size={17} />
              </button>
              <button
                className="p-1 hover:text-red-400"
                onClick={() => deleteTask(task.id)}
                title="Delete"
              >
                <Trash2 size={17} />
              </button>
            </div>
          ))}
        </div>
        <div className="text-white/70 text-sm mt-3">
          {state.tasks.filter(t => !t.completed).length} Task left
        </div>
        <div className="text-yellow-400/80 text-xs mt-2 italic flex items-center gap-2">
          <span>⏰</span>
          <span>Become a pro member to sync tasks</span>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
