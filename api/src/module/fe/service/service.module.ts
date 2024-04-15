import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServiceEntity } from 'src/entities';
import { ServiceEntityRepository } from 'src/repository/competition.repository';
import { ServiceEntityService } from 'src/service/competition.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ServiceEntity
		])
	],
	providers: [ServiceEntityRepository, ServiceEntityService],
	controllers: [ServiceController],
	exports: [ServiceEntityService]
})
export class ServiceModule { }
