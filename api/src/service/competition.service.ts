import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository } from 'src/repository';

@Injectable()
export class CompetitionService  {

	constructor(
		private repository: CompetitionEntityRepository,
		private dbRepository: CompetitionCriteriasEntityRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		return await this.repository.getLists(paging, filters);
	}

	async store(data: any) {
		data.created_at = new Date()
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		await this.createOrUpdateJudge(newData.id, data);
		return newData;
	}

	async createOrUpdateJudge(id: any,data: any) {
		if(data.criteria_ids?.length > 0) {
			await this.dbRepository.delete({
				competition_id: id
			});
			let judges = data.criteria_ids.reduce((newItem: any, item: any) => {
				newItem.push({
					competition_id: id,
					criterias_id: item,
					created_at: new Date(),
					updated_at: new Date()
				});
				return newItem;
			}, []);
			await this.dbRepository.insert(judges);
		}
	}


	async update(id: number, data: any) {
		const newData = {...data};
		delete newData.criteria_ids;
		await this.repository.update(id, newData);
		await this.createOrUpdateJudge(id, data);
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
				where: condition,
				relations: {
					judges: true,
					author: true,
					criterias: true
				},
			}
		);
	}
}
