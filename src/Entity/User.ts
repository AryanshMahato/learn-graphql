import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm/index';
import { Field, ObjectType } from 'type-graphql';

@ObjectType()
@Entity({ name: 'user' })
export class User extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => String)
  @Column()
  @CreateDateColumn({ name: 'created_at' })
  createdAt = new Date();

  @Field(() => String)
  @Column()
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt = new Date();

  @Field()
  @Column({ unique: true })
  username: string;

  @Column()
  password: string;
}
