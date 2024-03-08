import { Injectable, NotFoundException } from '@nestjs/common';
import { Course } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
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
    const data = await this.courseRepository.save(createCourseDTO);
    return data;
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO): Promise<Course> {
    const data = await this.courseRepository.preload({
      id,
      ...updateCourseDTO,
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
}
