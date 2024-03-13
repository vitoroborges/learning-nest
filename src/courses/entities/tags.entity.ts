import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Course } from './courses.entity';

@Entity('tags')
export class Tag {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @ManyToMany(() => Course, (course) => course.tags)
  readonly courses: Course[];
}
