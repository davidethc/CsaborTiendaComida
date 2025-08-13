import type { ItaskRepository } from "./ITaskReposotory";
import type { BaseTask, Task } from "./Task";

export class TaskService implements ItaskRepository {
    private taskRepository: ItaskRepository;
    constructor(taskRepository: ItaskRepository) {
        this.taskRepository = taskRepository;
    }

    async getAllTask() {
        return this.taskRepository.getAllTask();
    }

    async saveTask(task: BaseTask) {
        return this.taskRepository.saveTask(task);
    }

    async removeTask(id: string) {
        return this.taskRepository.removeTask(id);
    }

    async updateTask(task: Task) {
        return this.taskRepository.updateTask(task);
    }
}