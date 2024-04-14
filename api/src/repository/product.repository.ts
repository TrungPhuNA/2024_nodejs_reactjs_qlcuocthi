import { Repository } from "typeorm";
import { Product } from "../entities/product.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";

export class ProductRepository extends Repository<Product>{
    constructor(
        @InjectRepository(Product)
        private repository: Repository<Product>,
    ) {
        super(
            repository.target,
            repository.manager,
            repository.queryRunner,
        );
    }
    async getLists(paging, filters){
        let condition: any = {};
        if (filters.hot) condition.hot = filters.hot;
        if (filters.status) condition.status = filters.status;

        const [products, total] =  await this.findAndCount({
            where: condition,
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });

        return { products: products, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async findById(id: number)
    {
        return await this.findOne({
            where: {
                id: id
            }
        });
    }
}
