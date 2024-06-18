import { Module, forwardRef } from '@nestjs/common';
import { ResultController } from './result.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResultEntityRepository } from 'src/repository';
import { ResultEntity } from 'src/entities';
import { ResultService } from 'src/service/result.service';
import { MailModule } from 'src/module/mail/mail.module';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			ResultEntity
		]),
		forwardRef(() => MailModule)
	],
	providers: [
		ResultService, ResultEntityRepository,
	],
  controllers: [ResultController]
})
export class ResultModule {}
