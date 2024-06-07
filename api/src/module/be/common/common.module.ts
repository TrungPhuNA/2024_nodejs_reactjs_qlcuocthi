import { Module, forwardRef } from '@nestjs/common';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from 'src/service/dashboard.service';
import { UserService } from 'src/service/user.service';
import { CompetitionEntityRepository, ResultEntityRepository, UserRepository } from 'src/repository';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserModule } from '../user/user.module';
import { CompetitionEntity, ResultEntity, User } from 'src/entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User, CompetitionEntity, ResultEntity
		])
	],
	providers: [
		UserRepository,
		DashboardService,
		CompetitionEntityRepository,
		ResultEntityRepository
	],
	controllers: [CommonController]
})
export class CommonApiModule { }
