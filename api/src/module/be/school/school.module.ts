import { Module } from '@nestjs/common';
import { SchoolController } from './school.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SchoolEntity } from 'src/entities';
import { SchoolService } from 'src/service/school.service';
import { SchoolEntityRepository } from 'src/repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			SchoolEntity
		])
	],
	providers: [
		SchoolService, SchoolEntityRepository,
	],
	controllers: [SchoolController]
})
export class SchoolModule { }
