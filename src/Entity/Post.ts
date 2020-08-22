import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';

@Entity({ name: 'posts' })
export class Post {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @CreateDateColumn({ name: 'created_at' })
  createdAt = new Date();

  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt = new Date();

  @Column()
  title: string;
}
