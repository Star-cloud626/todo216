import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Task } from '../tasks/Task';

@Entity('taskhistories')
export class TaskHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Task, (task) => task.taskhistories, { onDelete: "SET NULL" })
  @JoinColumn({ name: 'task_id' })
  taskId: Task;

  @Column()
  changeType: string;

  @Column({ type: 'json', nullable: true })
  previous_value: Record<string, any>;

  @Column({ type: 'json', nullable: true })
  new_value: Record<string, any>;

  @Column()
  @CreateDateColumn()
  created_at: Date;
}
