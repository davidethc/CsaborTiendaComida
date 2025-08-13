import type { Task } from "../../modules/task/domain/Task";

interface Props{
    tasks:Task[];
    onRemoveTask: (taskId: string) => void;
    onUpdateTask?: (task: Task) => void;

}
const TaskList=({tasks,onRemoveTask,onUpdateTask}:Props)=>{
    return(
       

      <div className="w-full max-w-md space-y-4">
        {tasks.map(task => (
          <article
            key={task.id}
            className="flex items-center justify-between bg-gray-800 rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={task.completed} readOnly className="accent-blue-500 w-5 h-5" onClick={() => onUpdateTask?.(task)} />
              <span className={`text-lg ${task.completed ? "line-through text-gray-400" : ""}`}>
                {task.title}
              </span>
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition" onClick={() => onRemoveTask(task.id)}>
              Remove
            </button>
          </article>
        ))}
      </div>
        
    )
}
export default TaskList;