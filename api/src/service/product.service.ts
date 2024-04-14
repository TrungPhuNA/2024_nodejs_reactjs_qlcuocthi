import { Injectable } from '@nestjs/common';
import { ProductRepository } from "../repository/product.repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
    constructor(private readonly repository: ProductRepository) {}

    async getLists(paging, filters)
    {
        return await this.repository.getLists(paging, filters);
    }

    async findById(id: number)
    {
        return await this.repository.findById(id);
    }
}
