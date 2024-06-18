import { In, LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Raw, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { IPaging } from "src/helpers/interface/common.interface";
import { ResultEntity } from "src/entities";

export class ResultEntityRepository extends Repository<ResultEntity>{
	constructor(
		@InjectRepository(ResultEntity)
		private repository: Repository<ResultEntity>,
	) {
        super(
            repository.target,
            repository.manager,
            repository.queryRunner,
        );
    }

	async buildCondition(filter: any) {
		let condition: any = {};
		if (filter?.user_id) condition.user_id = filter.user_id;
		if (filter?.status) condition.status = filter.status;
		if (filter?.round_number) {
			condition.round_number = filter.round_number;
		}
		if (filter?.judge_id) condition.judges = {
			id: filter?.judge_id
		}
		return condition;
	}

    async getLists(paging: IPaging, filters: any){
        let condition: any = await this.buildCondition(filters);
		console.log(condition);
        let [data, total]: any =  await this.findAndCount({
            where: condition,
			order: {
				id: 'DESC'
			},
			relations: {
				user: true,
				competition: true,
				judges: true
			},
            take: paging.page_size,
            skip: (paging.page - 1) * paging.page_size
        });

		if(data?.length > 0) {
			for(let item of data) {
				if(item.meta_data) item.meta_data = JSON.parse(item.meta_data);
			}
		}

        return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async findById(id: number)
    {
        const result = await this.findOne({
            where: {
                id: id
            },
			relations: {
				user: true,
				competition: true,
				judges: true
			},
        });
		if(result?.meta_data) result.meta_data = JSON.parse(result?.meta_data);
		return result
    }
}
