import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository, JudgeEntityRepository } from 'src/repository';

@Injectable()
export class CompetitionService  {

	constructor(
		private repository: CompetitionEntityRepository,
		private dbRepository: CompetitionCriteriasEntityRepository,
		private judgeRepo: JudgeEntityRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		return await this.repository.getLists(paging, filters);
	}

	async store(data: any) {
		data.created_at = new Date()
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		await this.createOrUpdateJudgeAndCriteriaCompetition(newData.id, data);
		return newData;
	}

	async createOrUpdateJudgeAndCriteriaCompetition(id: any,data: any) {
		if(data.criteria_ids?.length > 0) {
			await this.dbRepository.delete({
				competition_id: id
			});
			let criteria = data.criteria_ids.reduce((newItem: any, item: any) => {
				newItem.push({
					competition_id: id,
					criterias_id: item,
					created_at: new Date(),
					updated_at: new Date()
				});
				return newItem;
			}, []);
			await this.dbRepository.insert(criteria);
		}
		if(data.judge_ids?.length > 0) {
			await this.judgeRepo.delete({
				competition_id: id
			});
			let judges = data.judge_ids.reduce((newItem: any, item: any) => {
				newItem.push({
					competition_id: id,
					user_id: item,
					created_at: new Date(),
					updated_at: new Date()
				});
				return newItem;
			}, []);
			await this.judgeRepo.insert(judges);
		}
	}


	async update(id: number, data: any) {
		const newData = {...data};
		delete newData.criteria_ids;
		await this.repository.update(id, newData);
		await this.createOrUpdateJudgeAndCriteriaCompetition(id, data);
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
