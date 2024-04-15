import { Injectable } from '@nestjs/common';
import { UserServiceDto } from 'src/dtos/user-service.dto';
import { UserLogDto } from 'src/dtos/user_logs.dto';
import { IPaging, SERVICE_TYPE } from 'src/helpers/helper';

@Injectable()
export class UserSerivceService  {

	constructor(
		// private repository: UserServiceEntityRepository,
		// private serviceRepo: ServiceEntityRepository,
		// private userLogRepo: UserLogRepository,
	) {

	}

	async getLists(paging: IPaging, filters: any) {
		// return await this.repository.getLists(paging, filters);
		return null
	}

	async store(data: any) {
		return null
		// data.created_at = new Date();
		// data = await this.updateTotalPrice(data);
		
		// const newData: any = await this.repository.create({ ...data });
		// await this.repository.save(newData);
		//  this.saveUserLogs({...newData, price: newData.total_price, user_service_id: newData.id,  type: 'INIT'});
		// return newData;
	}

	async updateTotalPrice(data: UserServiceDto) {
		return null
		// if(data.service_id) {
		// 	let service = await this.serviceRepo.findOne({where: {id: data.service_id}});
		// 	let serviceType = SERVICE_TYPE.find((item: any) => item.code?.toLowerCase() == service?.type?.toLowerCase());
		// 	if(!data.total_price && serviceType) {
		// 		data.total_price = (serviceType?.value || 0) * (service.price || 0);
		// 	} else {
		// 		data.total_price += (serviceType?.value || 0) * (service.price || 0);
		// 	}
		// }
		// return data;
	}

	async update(id: number, data: any) {
		return null
	}

	async deleteById(id: number) {
		return null
	}

	async findById(id: number) {
		return null
	}


	async findOneByCondition(condition: any = {}) {
		return null
	}

	async saveUserLogs(data: UserLogDto) {
		return null
	}
}
