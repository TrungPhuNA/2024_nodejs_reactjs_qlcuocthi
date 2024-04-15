import { Module } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from 'src/entities';
import { ArticleRepository } from 'src/repository/classEntity.repository';
import { ArticleService } from 'src/service/school.service';

@Module({
	imports: [
		TypeOrmModule.forFeature([
			Article
		])
	],
	providers: [ArticleRepository, ArticleService],
	controllers: [ArticleController]
})
export class ArticleModule { }
