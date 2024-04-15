import { Injectable } from '@nestjs/common';
import { UserRepository } from 'src/repository';
import { Raw } from 'typeorm';
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

@Injectable()
export class DashboardService {

	constructor(
		private userRepo: UserRepository,
	) {
	}

	async statistic(filters: any) {
		// let condition = {};
		// let start_date = moment().startOf('month').format('yyyy-MM-DD HH:mm:ss');
		// let end_date = moment().endOf('month').format('yyyy-MM-DD HH:mm:ss');

		// if (filters?.month) {
		// 	start_date = moment().month(filters?.month - 1).startOf('month').format('yyyy-MM-DD HH:mm:ss');
		// 	end_date = moment().month(filters?.month - 1).endOf('month').format('yyyy-MM-DD HH:mm:ss');
		// 	condition = {
		// 		created_at: Raw(alias => `${alias} >= '${start_date}' AND ${alias} <= '${end_date}'`)
		// 	}
		// }


		// let dataStatus = await this.userServiceRepo.query(`select status, count(*) as total, 
		// 	SUM(total_price) as total_price 
		// 	FROM users_services where created_at >= '${start_date}' AND created_at <= '${end_date}' 
		// 	GROUP BY status`
		// );


		// if(dataStatus?.length > 0) {
		// 	dataStatus = dataStatus.map(item => {
		// 		item.total = Number(item.total);
		// 		return item;
		// 	})
		// }

		// console.log('response -------> ', dataStatus);

		// const responseGroupDay = await this.userServiceRepo.query(`select count(*) as total, 
		// 	SUM(total_price) as total_price, DATE_FORMAT(created_at,'%Y-%m-%d') as day 
		// 	from users_services WHERE status != -1 AND created_at >= '${start_date}' AND created_at <= '${end_date}' 
		// 	GROUP BY DATE_FORMAT(created_at, '%Y-%m-%d')`
		// );

		// const date = filters?.month ? moment().month(filters?.month - 1) : moment();
		// let year = date.year();
		// let month = date.format('MM');
		// const totalDay = daysInMonth(month, year);
		// let arrListDay = [];
		// for (let i = 1; i <= totalDay; i++) {
		// 	let day = `${i}`;
		// 	if (i < 10) day = '0' + `${i}`;
		// 	arrListDay.push(`${year}-${month}-${day}`);
		// }

		// let arrListDayMapping = arrListDay.reduce((newData: any, item: any) => {
		// 	let obj = {
		// 		day: item,
		// 		total_price: 0,
		// 		total: 0
		// 	}
		// 	if(responseGroupDay?.length > 0) {
		// 		let revenueDay = responseGroupDay.find(e => e.day === item) 
		// 		if(revenueDay) {
		// 			obj = {...revenueDay, total: Number(revenueDay?.total)};
		// 		}
		// 	}
		// 	newData.push(obj);
		// 	return newData;
		// }, []);
		
		// const totalUser = await this.userRepo.count(
		// 	{
		// 		where: {
		// 			type: Raw(alias => `UPPER(${alias}) LIKE 'MEMBER'`)
		// 		}
		// 	}
		// );
		// let serviceByStatus = await this.serviceRepo.query(`select status, count(*) as total FROM services GROUP BY status`)

		// const totalUserService = await this.serviceRepo.count();

		// const totalPriceOrder = await this.userServiceRepo.sum('total_price');
		// const totalAdmin = await this.userRepo.count({
		// 	where: {
		// 		type: Raw(alias => `UPPER(${alias}) LIKE 'ADMIN'`)
		// 	}
		// });

		// const data = {
		// 	users_services: {
		// 		total: totalUserService,
		// 		group_status: dataStatus,
		// 		group_day: arrListDayMapping,
		// 		list_day: arrListDay,

		// 	},
		// 	total_price: totalPriceOrder,
		// 	total_user: totalUser,
		// 	total_admin: totalAdmin,
		// 	service: serviceByStatus
		// }

		return null
	}
}
