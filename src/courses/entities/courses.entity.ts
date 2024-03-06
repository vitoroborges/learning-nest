import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('courses')
export class CreateCourse {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  readonly name: string;

  @Column()
  readonly description: string;

  @Column('json', { nullable: true })
  readonly tags: string[];
}
