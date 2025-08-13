export interface BaseTask {
    title:string;
    completed:boolean;
}
export interface Task extends BaseTask{
    id:string;

}