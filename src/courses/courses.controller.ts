import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Patch,
  HttpCode,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CreateCourseDTO } from './dto/create-course.dto';
import { UpdateCourseDTO } from './dto/update-course.dto';

@Controller('courses')
export class CoursesController {
  constructor(private readonly courseService: CoursesService) {}

  @Get()
  async findAll() {
    return await this.courseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.courseService.findOne(id);
  }

  @Post()
  async create(@Body() createCourseDTO: CreateCourseDTO) {
    return await this.courseService.create(createCourseDTO);
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateCourseDTO: UpdateCourseDTO,
  ) {
    console.log(updateCourseDTO);
    return await this.courseService.update(id, updateCourseDTO);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.courseService.remove(id);
  }
}
