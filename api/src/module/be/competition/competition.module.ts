import { Module } from '@nestjs/common';
import { CompetitionController } from './competition.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionCriteriasEntity, CompetitionEntity, CriteriaEntity, JudgeEntity } from 'src/entities';
import { CompetitionService } from 'src/service/competition.service';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository, CriteriaEntityRepository, JudgeEntityRepository } from 'src/repository';

@Module({imports: [
	TypeOrmModule.forFeature([
		CompetitionEntity, 
		CompetitionCriteriasEntity,
		CriteriaEntity,
		JudgeEntity
	])
],
providers: [
	CompetitionService, 
	CompetitionEntityRepository, 
	CompetitionCriteriasEntityRepository,
	JudgeEntityRepository,
	CriteriaEntityRepository
],
  controllers: [CompetitionController]
})
export class CompetitionModule {}
