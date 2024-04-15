import { Module, forwardRef } from '@nestjs/common';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity, User, UserServiceEntity } from 'src/entities';
import { UserServiceEntityRepository } from 'src/repository/judge.repository';
import { UserSerivceService } from 'src/service/result.service';
import { ServiceEntityRepository } from 'src/repository/competition.repository';
import { ServiceModule } from '../service/service.module';
import { DashboardService } from 'src/service/dashboard.service';
import { UserService } from 'src/service/user.service';
import { UserRepository } from 'src/repository';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserServiceModule } from '../user-service/user-service.module';
import { UserModule } from '../user/user.module';
import { UserLogEntity } from 'src/entities/user-logs.entity';
import { UserLogRepository } from 'src/repository/result.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserServiceEntity,
			ServiceEntity,
			User,
			UserLogEntity
		])
	],
	providers: [
		UserServiceEntityRepository,
		ServiceEntityRepository,
		UserRepository,
		DashboardService,
		UserLogRepository

	],
	controllers: [CommonController]
})
export class CommonApiModule { }
