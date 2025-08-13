import axios from "axios";
import type { ItaskRepository } from "../domain/ITaskReposotory";
import type { BaseTask, Task } from "../domain/Task";


export class ApiTaskRepository implements ItaskRepository {
async getAllTask() {
const tasks = await axios.get<Task[]>("https://jsonplaceholder.typicode.com/todos");
return tasks.data;
}
async saveTask(task: BaseTask) {
const response = await axios.post<Task>("https://jsonplaceholder.typicode.com/todos", task);
return response.data;
}
async updateTask(task: Task) {
const response = await axios.put<Task>(`https://jsonplaceholder.typicode.com/todos/${task.id}`, task);
return response.data;
}
async removeTask(taskId: string) {
await axios.delete(`https://jsonplaceholder.typicode.com/todos/${taskId}`);
}
}