import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { UserRepository } from 'src/repository';
import { Like, Not } from 'typeorm';
import { UserValidatorService } from './user-validator.service';

@Injectable()
export class UserService {

	constructor(
		private repository: UserRepository,
		private userValidateService: UserValidatorService
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		return await this.repository.getLists(paging, filters);
	}

	async store(data: any) {
		await this.userValidateService.validateUser(data, true);
		data.created_at = new Date();
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		if(newData) {
			// newData.type = newData?.type?.toUpperCase() || 'MEMBER';
			newData.code = 'MEMBER00000' + newData.id;
			await this.repository.update(newData.id, {code: newData.code})
		}
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
