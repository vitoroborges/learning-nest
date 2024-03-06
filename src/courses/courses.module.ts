import { Module } from '@nestjs/common';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCourse } from './entities/courses.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CreateCourse])],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
