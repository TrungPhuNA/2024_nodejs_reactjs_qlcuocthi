import { Module } from '@nestjs/common';
import { CriteriaController } from './criteria.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CompetitionCriteriasEntity, CompetitionEntity, CriteriaEntity } from 'src/entities';
import { CompetitionService } from 'src/service/competition.service';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository, CriteriaEntityRepository } from 'src/repository';
import { CriteriaEntityService } from 'src/service/criteriaService.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			CriteriaEntity,
			CompetitionCriteriasEntity
		])
	],
	providers: [
		CriteriaEntityService,
		CriteriaEntityRepository,
		CompetitionCriteriasEntityRepository
	],
	controllers: [CriteriaController]
})
export class CriteriaModule { }
