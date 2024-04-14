import { Injectable } from '@nestjs/common';
import { IPaging } from 'src/helpers/helper';
import { CategoryRepository } from 'src/repository';
import { JobRepository } from 'src/repository/job.repository';

@Injectable()
export class JobService {

	constructor(
		private repository: JobRepository,
		private categoryRepo: CategoryRepository
	) {

	}

	async getLists(paging: IPaging, filters: any)
    {
        let data: any = await this.repository.getLists(paging, filters);
		if(data?.result?.length > 0) {
			for(let item of data.result ) {
				item.form_of_work = await this.categoryRepo.findOne({
					where: {
						type: 3,
						id: item.form_of_work_id
					}
				});
				item.experience = await this.categoryRepo.findOne({
					where: {
						type: 1,
						id: item.experience_id
					}
				});
				item.rank = await this.categoryRepo.findOne({
					where: {
						type: 2,
						id: item.rank_id
					}
				});
				// item.form_of_work = await this.categoryRepo.findOne({
				// 	where: {
				// 		type: 3,
				// 		id: item.form_of_work_id
				// 	}
				// });
				// item.form_of_work = await this.categoryRepo.findOne({
				// 	where: {
				// 		type: 3,
				// 		id: item.form_of_work_id
				// 	}
				// });
				// item.form_of_work = await this.categoryRepo.findOne({
				// 	where: {
				// 		type: 3,
				// 		id: item.form_of_work_id
				// 	}
				// });
			}
		}
		return data;
    }

    async store(data: any)
    {
		const newData = await this.repository.create({...data});
        await this.repository.save(newData);
		return newData;
    }

	async update(id: number, data: any)
    {
        return await this.repository.update(id, data);
    }

	async deleteById(id: number)
    {
        return await this.repository.delete(id);
    }

	async findById(id: number)
    {
        const data: any =  await this.repository.findById(id);
		if(data) {
			data.form_of_work = await this.categoryRepo.findOne({
				where: {
					type: 3,
					id: data.form_of_work_id
				}
			});
			data.experience = await this.categoryRepo.findOne({
				where: {
					type: 1,
					id: data.experience_id
				}
			});
			data.rank = await this.categoryRepo.findOne({
				where: {
					type: 2,
					id: data.rank_id
				}
			});
		}
		return data
    }

	async findOneByCondition(condition: any = {})
    {
        return await this.repository.findOne(
			{
				where: condition,
				relations: {
					company: true,
					user: true
				},
			}
		);
    }
}
