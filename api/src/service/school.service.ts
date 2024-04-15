import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { ArticleRepository } from 'src/repository/classEntity.repository';

@Injectable()
export class ArticleService {

	constructor(
		private repository: ArticleRepository
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		return await this.repository.getLists(paging, filters);
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
