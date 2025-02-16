import bcrypt from 'bcryptjs';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';

import { Role, Language } from './types';
import { Task } from '../tasks/Task';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Task, (task) => task.assigned_to)
  tasks: Task[];

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  password: string;

  @Column({
    nullable: true,
    unique: true,
  })
  username: string;

  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    default: 'STANDARD' as Role,
    length: 30,
  })
  role: string;

  @Column({
    default: 'en-US' as Language,
    length: 15,
  })
  language: string;

  @Column()
  @CreateDateColumn()
  created_at: Date;

  @Column()
  @UpdateDateColumn()
  updated_at: Date;

  setLanguage(language: Language) {
    this.language = language;
  }

  hashPassword() {
    this.password = bcrypt.hashSync(this.password, 8);
  }

  checkIfPasswordMatch(unencryptedPassword: string) {
    return bcrypt.compareSync(unencryptedPassword, this.password);
  }
}
