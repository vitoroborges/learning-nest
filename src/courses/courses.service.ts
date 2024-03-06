import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCourse } from './entities/courses.entity';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(CreateCourse)
    private readonly courseRepository: Repository<CreateCourse>,
  ) { }

  async findAll(): Promise<CreateCourse[]> {
    const data = await this.courseRepository.find()
    return data;
  }

  async findOne(id: number): Promise<CreateCourse> {
    const data = await this.courseRepository.findOneBy({ id: id });
    if (!data) throw new NotFoundException(`Course ID ${id} not found`);
    return data;
  }

  async create(createCourseDTO: CreateCourseDTO): Promise<CreateCourse>{
    const data = await this.courseRepository.save(createCourseDTO);
    return data;
  }

  async update(id: number, updateCourseDTO: UpdateCourseDTO) {
    const existingCourse = await this.findOne(id);
    if(!existingCourse) throw new NotFoundException(`Course ID ${id} not found`);
 
    const data = this.courseRepository.create(updateCourseDTO)
    const updatedData = await this.courseRepository.update(id, data);
    if (updatedData.affected === 0) throw new NotFoundException(`Couldn't update`);
    return updatedData
  }

  async remove(id: number) {
    await this.courseRepository.delete(id)
  }
}
