import { Module, forwardRef } from '@nestjs/common';
import { UserServiceController } from './user-service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity, UserServiceEntity } from 'src/entities';
import { UserServiceEntityRepository } from 'src/repository/judge.repository';
import { UserSerivceService } from 'src/service/result.service';
import { ServiceEntityRepository } from 'src/repository/competition.repository';
import { ServiceEntityService } from 'src/service/competition.service';
import { ServiceModule } from '../service/service.module';
import { UserLogEntity } from 'src/entities/user-logs.entity';
import { UserLogRepository } from 'src/repository/result.repository';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			UserServiceEntity, ServiceEntity, UserLogEntity
		]),
	],
	providers: [
		UserServiceEntityRepository, 
		UserSerivceService, 
		ServiceEntityRepository,
		UserLogRepository
	],
	controllers: [UserServiceController]
})
export class UserServiceModule { }
