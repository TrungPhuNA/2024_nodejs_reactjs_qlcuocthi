import { Module } from '@nestjs/common';
import { ArticleModule } from './article/article.module';
import { UserModule } from './user/user.module';
import { RoomModule } from './room/room.module';
import { ServiceModule } from './service/service.module';
import { UserServiceModule } from './user-service/user-service.module';
import { CommonApiModule } from './common/common.module';

@Module({
	imports: [
		ArticleModule,
		UserModule,
		RoomModule,
		ServiceModule,
		UserServiceModule,
		CommonApiModule
	],
	controllers: []
})
export class BeModule { }
