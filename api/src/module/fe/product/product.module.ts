import { Module } from "@nestjs/common";
import { ProductController } from './product.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/entities/product.entity";
import { ProductService } from "src/service/product.service";
import { ProductRepository } from "src/repository/product.repository";

@Module({
    imports: [
        TypeOrmModule.forFeature([Product])
    ],
    controllers: [ProductController],
    providers: [ProductService, ProductRepository],
    exports: [ProductService, TypeOrmModule],
})
export class ProductModule {}
