import { Module } from '@nestjs/common';
import { ClassEntityController } from './class-entity.controller';
import { ClassEntity } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassEntityService } from 'src/service/classEntity.service';
import { ClassEntityRepository } from 'src/repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ClassEntity
		])
	],
	providers: [
		ClassEntityService, ClassEntityRepository,
	],
	controllers: [ClassEntityController]
})
export class ClassEntityModule { }
