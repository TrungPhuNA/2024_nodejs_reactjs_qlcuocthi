import { Module } from '@nestjs/common';
import { SlideController } from './slide.controller';

@Module({
  controllers: [SlideController]
})
export class SlideModule {}
