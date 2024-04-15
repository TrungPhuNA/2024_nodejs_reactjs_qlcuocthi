import { Module } from '@nestjs/common';
import { CompetitionController } from './competition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionCriteriasEntity, CompetitionEntity, JudgeEntity } from 'src/entities';
import { CompetitionService } from 'src/service/competition.service';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository, JudgeEntityRepository } from 'src/repository';

@Module({imports: [
	TypeOrmModule.forFeature([
		CompetitionEntity, 
		CompetitionCriteriasEntity
	])
],
providers: [
	CompetitionService, 
	CompetitionEntityRepository, 
	CompetitionCriteriasEntityRepository
],
  controllers: [CompetitionController]
})
export class CompetitionModule {}
