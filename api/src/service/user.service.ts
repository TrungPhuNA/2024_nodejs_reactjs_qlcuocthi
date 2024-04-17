import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { JudgeEntityRepository, UserRepository } from 'src/repository';
import { Like, Not } from 'typeorm';
import { UserValidatorService } from './user-validator.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {

	constructor(
		private repository: UserRepository,
		private userValidateService: UserValidatorService,
		private judgeRepo: JudgeEntityRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		return await this.repository.getLists(paging, filters);
	}

	async store(data: any) {
		await this.userValidateService.validateUser(data, true);
		data.created_at = new Date();
		data.password = await bcrypt.hash(data.password.trim(), 10);
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);

		if(newData) {
			// newData.type = newData?.type?.toUpperCase() || 'MEMBER';
			newData.code = 'MEMBER00000' + newData.id;
			await this.repository.update(newData.id, {code: newData.code});
			await this.createOrUpdateJudge(newData.id, data)
		}
		return newData;
	}

	async update(id: number, data: any) {
		const updateData: any = await this.repository.create({...data});
		delete updateData.competition_ids;
		await this.repository.update(id, updateData);
		await this.createOrUpdateJudge(id, data)
		return await this.findById(id);
	}

	async createOrUpdateJudge(id: any,data: any) {
		if(data.competition_ids?.length > 0) {
			await this.judgeRepo.delete({
				user_id: id
			});
			let judges = data.competition_ids.reduce((newItem: any, item: any) => {
				newItem.push({
					competition_id: item,
					user_id: id,
					created_at: new Date(),
					updated_at: new Date()
				});
				return newItem;
			}, []);
			await this.judgeRepo.insert(judges);
		}
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
