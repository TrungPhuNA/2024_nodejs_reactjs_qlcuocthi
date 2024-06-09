import { Injectable } from '@nestjs/common';
import { IPaging, SERVICE_TYPE } from 'src/helpers/helper';
import { ResultEntityRepository } from 'src/repository';

@Injectable()
export class ResultService   {

	constructor(
		private repository: ResultEntityRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		return await this.repository.getLists(paging, filters);
	}

	async store(data: any) {
		data.created_at = new Date();
		if(data?.meta_data && typeof data?.meta_data != 'string') {
			data.meta_data = JSON.stringify(data.meta_data);
		}
		const newData: any = await this.repository.create({ ...data });
		await this.repository.save(newData);
		return newData;
	}

	async update(id: number, data: any) {
		const newData: any = await this.repository.create({ ...data });
		console.log("newData: -------> ", newData);
		if(data?.meta_data && typeof data?.meta_data != 'string') {
			data.meta_data = JSON.stringify(data.meta_data);
		}
		await this.repository.update(id, {...data});
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
					competition: true,
					user: true,
					judges: true
				}
			}
		);
	}
}
