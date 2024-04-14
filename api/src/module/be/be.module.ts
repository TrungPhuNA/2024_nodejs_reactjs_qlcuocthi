import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { ProductModule } from './product/product.module';
import { SlideModule } from './slide/slide.module';
import { ArticleModule } from './article/article.module';
import { MenuModule } from './menu/menu.module';
import { OrderModule } from './order/order.module';
import { ProductImageModule } from './product-image/product-image.module';
import { RoleModule } from './role/role.module';
import { SettingModule } from './setting/setting.module';
import { TagModule } from './tag/tag.module';
import { UserModule } from './user/user.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [CategoryModule, ProductModule, SlideModule, ArticleModule, MenuModule, OrderModule, ProductImageModule, RoleModule, SettingModule, TagModule, UserModule, VoteModule]
})
export class BeModule {}
