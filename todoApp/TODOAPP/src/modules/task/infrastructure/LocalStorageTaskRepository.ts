import type { ItaskRepository } from "./ITaskReposotory";
import type { BaseTask, Task } from "./Task";

export class LocalStorageTaskRepository implements ItaskRepository{
    async getAllTask() {
        const taskString=localStorage.getItem("tasks");
        if(!taskString){
            return[];
        }
        const task : Task[]= JSON.parse(taskString);
        return task;

    }
    async saveTask(task:BaseTask){
        const tasks = await this.getAllTask();
        const newTasks={
            ...task,
            id: crypto.randomUUID()

        }
        tasks.push(newTasks);
        localStorage.setItem("tasks",JSON.stringify(tasks));

        return newTasks;
    }
    async removeTask(id:string){
        const tasks=await this.getAllTask();
        const newTasks = tasks.filter(t=>t.id !== id);
        localStorage.setItem("tasks",JSON.stringify(newTasks));
    }
    async updateTask(task:Task){
        const tasks=await this.getAllTask();
        const newTasks = tasks.map(t=>t.id === task.id ? task : t);
        localStorage.setItem("tasks",JSON.stringify(newTasks));
        return task;
    }
}