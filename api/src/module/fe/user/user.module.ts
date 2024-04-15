import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { JudgeEntityRepository, UserRepository } from 'src/repository';
import { UserService } from 'src/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeEntity, User } from 'src/entities';
import { UserValidatorService } from 'src/service/user-validator.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User, JudgeEntity
		])
	],
	controllers: [UserController],
	providers: [
		UserService, UserRepository,
		UserValidatorService,
		JudgeEntityRepository,
	],
	exports: [UserService]
})
export class UserModule { }
