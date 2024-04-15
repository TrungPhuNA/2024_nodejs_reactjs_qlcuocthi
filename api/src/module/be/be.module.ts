import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { CommonApiModule } from './common/common.module';
import { SchoolModule } from './school/school.module';
import { ClassEntityModule } from './class-entity/class-entity.module';
import { CompetitionModule } from './competition/competition.module';
import { ResultModule } from './result/result.module';
import { CriteriaModule } from './criteria/criteria.module';

@Module({
	imports: [
		UserModule,
		CommonApiModule,
		SchoolModule,
		ClassEntityModule,
		CompetitionModule,
		ResultModule,
		CriteriaModule
	],
	controllers: []
})
export class BeModule { }
