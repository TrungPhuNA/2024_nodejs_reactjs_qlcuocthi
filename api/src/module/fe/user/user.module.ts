import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserRepository } from 'src/repository';
import { UserService } from 'src/service/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/entities';
import { UserValidatorService } from 'src/service/user-validator.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			User
		])
	],
	controllers: [UserController],
	providers: [
		UserService, UserRepository,
		UserValidatorService
	],
	exports: [UserService]
})
export class UserModule { }
