import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from './entities/tags.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,

    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async findAll(): Promise<Course[]> {
    const data = await this.courseRepository.find();
    return data;
  }

  async findOne(id: number): Promise<Course> {
    const data = await this.courseRepository.findOneBy({ id: id });
    if (!data) throw new NotFoundException(`Course ID ${id} not found`);
    return data;
  }

  async create(createCourseDTO: CreateCourseDTO): Promise<Course> {
    const tags = await Promise.all(
      createCourseDTO.tags.map((tag) => this.preloadTagByName(tag.name)),
    );

    const course = this.courseRepository.create({
      ...createCourseDTO,
      tags,
    });
    console.log(course);
    return this.courseRepository.save(course);
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO): Promise<Course> {
    const tags =
      updateCourseDTO.tags &&
      (await Promise.all(
        updateCourseDTO.tags.map((name) => this.preloadTagByName(name.name)),
      ));
    const data = await this.courseRepository.preload({
      id,
      ...updateCourseDTO,
      tags,
    });

    if (!data) throw new NotFoundException(`Course ID ${id} not found`);

    const updatedData = await this.courseRepository.save(data);

    return updatedData;
  }

  async remove(id: number) {
    const data = await this.findOne(id);

    if (!data) throw new NotFoundException(`Course ID ${id} not found`);

    await this.courseRepository.delete(id);
  }

  private async preloadTagByName(name: string): Promise<Tag> {
    const tag = await this.tagRepository.findOneBy({ name: name });
    console.log(tag);
    if (tag) return tag;
    return this.tagRepository.create({ name });
  }
}
