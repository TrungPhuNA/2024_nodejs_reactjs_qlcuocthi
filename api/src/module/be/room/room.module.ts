import { Module } from '@nestjs/common';
import { RoomController } from './room.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Room } from 'src/entities';
import { RoomRepository } from 'src/repository/school.repository';
import { RoomService } from 'src/service/classEntity.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Room
		])
	],
	providers: [RoomRepository, RoomService],
	controllers: [RoomController]
})
export class RoomModule { }
