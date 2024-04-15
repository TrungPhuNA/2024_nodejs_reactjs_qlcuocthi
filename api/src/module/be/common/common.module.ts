import { Module, forwardRef } from '@nestjs/common';
import { CommonController } from './common.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardService } from 'src/service/dashboard.service';
import { UserService } from 'src/service/user.service';
import { UserRepository } from 'src/repository';
import { UserValidatorService } from 'src/service/user-validator.service';
import { UserModule } from '../user/user.module';
import { User } from 'src/entities';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User,
		])
	],
	providers: [
		UserRepository,
		DashboardService,

	],
	controllers: [CommonController]
})
export class CommonApiModule { }
