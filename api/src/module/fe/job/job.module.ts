import { Module } from '@nestjs/common';
import { JobController } from './job.controller';
import { JobService } from 'src/service/job.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category, Jobs } from 'src/entities';
import { JobRepository } from 'src/repository/job.repository';
import { CategoryRepository } from 'src/repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([Jobs, Category])
	],
	controllers: [JobController],
	providers: [JobService, JobRepository, CategoryRepository],
	exports: [JobService]
})
export class JobModule { }
