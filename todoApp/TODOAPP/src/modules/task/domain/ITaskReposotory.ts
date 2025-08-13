import type { BaseTask, Task } from "./Task";

export interface ItaskRepository {
    getAllTask: () => Promise<Task[]>;
    saveTask: (task: BaseTask) => Promise<Task>;
    removeTask: (id: string) => Promise<void>;
    updateTask: (task: Task) => Promise<Task>;
}