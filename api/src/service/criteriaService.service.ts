import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { CompetitionCriteriasEntityRepository, CriteriaEntityRepository, JudgeEntityRepository } from 'src/repository';

@Injectable()
export class CriteriaEntityService  {

	constructor(
		private repository: CriteriaEntityRepository,
		// private dbRepo: CompetitionCriteriasEntityRepository,
		// private criterRepo: CriteriaEntityRepository,
		// private judgesRepo: JudgeEntityRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		let response: any = await this.repository.getLists(paging, filters);
		if(response?.result?.length > 0) {
			// for(let item of response?.result) {
			// 	item.criteria_ids = await this.dbRepo.find({where: {competition_id: item.id}});
			// 	item.judge_ids = await this.judgesRepo.find({where: {competition_id: item.id}});
			// }
		}
		return response;
	}

	async store(data: any) {
		data.created_at = new Date()
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		return newData;
	}

	async update(id: number, data: any) {
		await this.repository.update(id, data);
		return await this.findById(id);
	}

	async deleteById(id: number) {
		return await this.repository.delete(id);
	}

	async findById(id: number) {
		return await this.repository.findById(id);
	}


	async findOneByCondition(condition: any = {}) {
		return await this.repository.findOne(
			{
				where: condition
			}
		);
	}
}
