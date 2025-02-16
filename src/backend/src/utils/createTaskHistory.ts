import { TaskHistory } from 'orm/entities/taskhistories/TaskHistory';
import { getRepository } from 'typeorm';

export async function createHistory(data: any){
    const taskhisoryRepository = getRepository(TaskHistory);
    let { task_id, change_type, previous_value, new_value } = data;
    try{
        const newHistory = new TaskHistory();
        newHistory.taskId = task_id;
        newHistory.changeType = change_type;
        newHistory.previous_value = previous_value;
        newHistory.new_value = new_value;

        await taskhisoryRepository.save(newHistory);
    }catch(err){
        console.log(err);
    }
}