import { LessThanOrEqual, Like, MoreThan, MoreThanOrEqual, Not, Repository } from "typeorm";
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
		if (filter?.room_id) condition.room_id = filter.room_id;
		if (filter?.service_id) condition.service_id = filter.service_id;
		if (filter?.time_start) condition.time_start = MoreThanOrEqual(filter?.time_start);
		if (filter?.time_stop) condition.time_stop = LessThanOrEqual(filter?.time_stop);
		if (filter?.status) condition.status = filter.status;
		if (filter?.judge_id) condition.judges = {
			id: filter?.judge_id
		}

		return condition;
	}

    async getLists(paging: IPaging, filters: any){
        let condition: any = await this.buildCondition(filters);
		
        const [data, total] =  await this.findAndCount({
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

        return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
    }

    async findById(id: number)
    {
        return await this.findOne({
            where: {
                id: id
            },
			relations: {
				user: true,
				competition: true
			},
        });
    }
}
