import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { SlideModule } from './slide/slide.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { SettingModule } from './setting/setting.module';
import { TagModule } from './tag/tag.module';
import { VoteModule } from './vote/vote.module';
import { CompanyModule } from './company/company.module';
import { JobModule } from './job/job.module';
import { CareersModule } from './careers/careers.module';
import { UserJobModule } from './user-job/user-job.module';

@Module({
	imports: [
		ProductModule,
		CategoryModule,
		SlideModule,
		UserModule,
		MenuModule,
		OrderModule,
		SettingModule,
		TagModule,
		VoteModule,
		CompanyModule,
		JobModule,
		CareersModule,
		UserJobModule
	],
	controllers: []
})
export class FeModule { }
