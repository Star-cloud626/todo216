import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { User } from '../users/User';
import { TaskHistory } from '../taskhistories/TaskHistory';
import { TaskPriority, StatusType } from './types';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.tasks, { eager: true })
  @JoinColumn({ name: 'user_id' })
  assigned_to: User;

  @OneToMany(() => TaskHistory, (taskhistory) => taskhistory.taskId)
  taskhistories: TaskHistory[];

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.LOW,
  })
  priority: TaskPriority;

  @Column({
    type: 'enum',
    enum: StatusType,
    default: StatusType.TODO,
  })
  status: StatusType;

  @Column()
  due_to: Date;

  @Column()
  @CreateDateColumn()
  created_at: Date;
}
