import { Injectable } from '@nestjs/common';
import { IPaging, USER_CONST, USER_TYPE } from 'src/helpers/helper';
import { CompetitionCriteriasEntityRepository, CompetitionEntityRepository, CriteriaEntityRepository, JudgeEntityRepository, ResultEntityRepository } from 'src/repository';

@Injectable()
export class CompetitionService {

	constructor(
		private repository: CompetitionEntityRepository,
		private dbRepository: CompetitionCriteriasEntityRepository,
		private judgeRepo: JudgeEntityRepository,
		private dbRepo: CompetitionCriteriasEntityRepository,
		private criterRepo: CriteriaEntityRepository,
		private resultRepo: ResultEntityRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		let response: any = await this.repository.getLists(paging, filters);
		console.log(response);
		if (response?.result?.length > 0) {
			for (let item of response?.result) {
				if(filters?.user?.type == USER_TYPE.STUDENT) {
					item.check_result = await this.resultRepo.findOne({
						where: {
							user_id: filters?.user?.id,
							competition_id: item.id
						}
					}) ? true : false
				} else {
					item.check_result = false
				}
				let d: any = await this.dbRepo.find({ where: { competition_id: item.id } })
				item.criteria_ids = d?.map((e: any) => e.criterias_id);

				let j: any = await this.judgeRepo.find({ where: { competition_id: item.id } })
				item.judge_ids = j?.map((e: any) => e.user_id);
			}
		}
		return response;
	}

	async store(data: any) {
		data.created_at = new Date();
		let newData = {...data};
		delete(newData.judge_ids)
		delete(newData.criteria_ids);
		console.log("newData---------> ", newData);
		newData = await this.repository.create({ ...newData });
		await this.repository.save(newData);
		console.log("newData---------> ", newData);
		await this.createOrUpdateJudgeAndCriteriaCompetition(newData.id, {...data});
		return newData;
	}

	async createOrUpdateJudgeAndCriteriaCompetition(id: any, data: any) {
		if (data.criteria_ids?.length > 0) {
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
		if (data.judge_ids?.length > 0) {
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
		let newData = { ...data };
		delete(newData.judge_ids)
		delete(newData.criteria_ids);
		newData = await this.repository.create({ ...newData });
		console.log("newData---------> ", newData);
		await this.repository.update(id, newData);
		console.info("===========[] ===========[newData] : ",newData);
		await this.createOrUpdateJudgeAndCriteriaCompetition(id, data);
		return await this.findById(id);
	}

	async deleteById(id: number) {
		return await this.repository.delete(id);
	}

	async findById(id: number) {
		let data: any = await this.repository.findById(id);
		let d: any = await this.dbRepo.find({ where: { competition_id: data.id } })
		data.criteria_ids = d?.map((e: any) => e.criterias_id);

		let j: any = await this.judgeRepo.find({ where: { competition_id: data.id } })
		data.judge_ids = j?.map((e: any) => e.user_id);
		return data
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
