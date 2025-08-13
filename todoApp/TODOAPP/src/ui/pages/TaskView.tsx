import { useEffect, useState } from "react";
import type { Task } from "../../modules/task/domain/Task";
import { TaskService } from "../../modules/task/domain/TaskService";

import TaskList from "../components/Tasklist";
import { LocalStorageTaskRepository } from "../../modules/task/infrastructure/LocalStorageTaskRepository";
import { ApiTaskRepository } from "../../modules/task/infrastructure/ApiTaskRepository";

// const localStorageTaskRepository = new LocalStorageTaskRepository();
const apiTaskRepository = new ApiTaskRepository();
const taskService = new TaskService(apiTaskRepository);

const TaskView = () => {
  const [tasks, setTask] = useState<Task[]>([]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    taskService.saveTask({
      title: formData.get("taskTitle") as string,
      completed: false
    }).then(task => {
      setTask([...tasks, task]);
    });
    e.currentTarget.reset();
  };

  const handleRemoveTask = (taskId: string) => {
    taskService.removeTask(taskId).then(() => {
      setTask(tasks.filter(task => task.id !== taskId));
    });
  };

  const handleUpdateTask= (task:Task)=>{
    const updateTask={
      ...task,
      completed: !task.completed
    }
    taskService.updateTask(updateTask).then(updatedTask => {
      setTask(tasks.map(task => (task.id === updatedTask.id ? updatedTask : task)));
    });
  }

  useEffect(() => {
    taskService.getAllTask().then((tasks: Task[]) => {
      setTask(tasks);
    });
  }, []);

  return (
    <section className="bg-black min-h-screen text-white flex flex-col justify-center items-center py-10">
      <h1 className="text-4xl font-bold mb-8">Task View</h1>

      <form
        className="flex gap-4 mb-8 w-full max-w-md"
        onSubmit={handleSubmit}
      >
        <input
          name="taskTitle"
          type="text"
          placeholder="Enter task title"
          className="flex-1 bg-gray-800 border border-gray-700 rounded-lg py-2 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition"
        >
          Add Task
        </button>
      </form>
      <TaskList tasks={tasks} onRemoveTask={handleRemoveTask} onUpdateTask={handleUpdateTask} />
    </section>
  );
};

export default TaskView;
