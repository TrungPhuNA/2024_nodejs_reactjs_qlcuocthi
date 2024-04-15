import { Module } from '@nestjs/common';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntityRepository } from 'src/repository';
import { ResultEntity } from 'src/entities';
import { ResultService } from 'src/service/result.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ResultEntity
		])
	],
	providers: [
		ResultService, ResultEntityRepository,
	],
  controllers: [ResultController]
})
export class ResultModule {}
