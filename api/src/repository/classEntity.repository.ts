import { Like, Not, Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { Paging } from "../helpers/response/Paging";
import { IPaging } from "src/helpers/interface/common.interface";
import { ClassEntity } from "src/entities";

export class ClassEntityRepository extends Repository<ClassEntity>{
	constructor(
		@InjectRepository(ClassEntity)
		private repository: Repository<ClassEntity>,
	) {
		super(
			repository.target,
			repository.manager,
			repository.queryRunner,
		);
	}

	async buildCondition(filters: any) {
		let condition: any = {};
		if (filters?.name && filters?.name?.trim() != '') condition.name = Like(`%${filters.name.trim()}%`);
		return condition;
	}

	async getLists(paging: IPaging, filters: any) {
		let condition: any = await this.buildCondition(filters);
		
		const [data, total] = await this.findAndCount({
			where: condition,
			order: {
				id: 'DESC'
			},
			take: paging.page_size,
			skip: (paging.page - 1) * paging.page_size
		});

		return { result: data, meta: new Paging(paging.page, paging.page_size, total) };
	}

	async findById(id: number) {
		return await this.findOne({
			where: {
				id: id
			}
		});
	}
}
