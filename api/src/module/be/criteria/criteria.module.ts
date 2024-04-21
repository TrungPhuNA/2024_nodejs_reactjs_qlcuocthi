import { Module } from '@nestjs/common';
import { CriteriaController } from './criteria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionCriteriasEntity, CompetitionEntity, CriteriaEntity, JudgeEntity } from 'src/entities';
import { CompetitionService } from 'src/service/competition.service';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository, CriteriaEntityRepository, JudgeEntityRepository } from 'src/repository';
import { CriteriaEntityService } from 'src/service/criteriaService.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			CriteriaEntity,
			CompetitionCriteriasEntity,
			JudgeEntity
		])
	],
	providers: [
		CriteriaEntityService,
		CriteriaEntityRepository,
		CompetitionCriteriasEntityRepository,
		JudgeEntityRepository
	],
	controllers: [CriteriaController]
})
export class CriteriaModule { }
