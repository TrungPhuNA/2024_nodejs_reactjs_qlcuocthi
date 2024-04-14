import { Module, forwardRef } from '@nestjs/common';
import { Company, Jobs, User, UserJob } from 'src/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
import { UserJobService } from 'src/service/user-job.service';
import { UserJobRepository } from 'src/repository/user-job.repository';
import { UserUserJobController } from './user-job.controller';

@Module({
	imports: [
		TypeOrmModule.forFeature([Company, User, Jobs, UserJob]),
		forwardRef(() => UserModule),
	],
	controllers: [UserUserJobController],
	providers: [UserJobService, UserJobRepository],
	exports: [UserJobService]
})
export class UserJobModule { }
