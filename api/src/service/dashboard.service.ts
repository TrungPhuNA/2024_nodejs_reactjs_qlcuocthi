import { Injectable } from '@nestjs/common';
import * as moment from 'moment';
import { CompetitionEntityRepository, ResultEntityRepository, UserRepository } from 'src/repository';
import { MoreThan, Raw } from 'typeorm';
const daysInMonth = (year, month) => new Date(year, month, 0).getDate();

@Injectable()
export class DashboardService {

	constructor(
		private userRepo: UserRepository,
		private competitionRepo: CompetitionEntityRepository,
		private resultRepo: ResultEntityRepository,
	) {
	}

	async statistic(filters: any) {
		let condition = {};
		let start_date = moment().startOf('month').format('yyyy-MM-DD HH:mm:ss');
		let end_date = moment().endOf('month').format('yyyy-MM-DD HH:mm:ss');

		if (filters?.month) {
			start_date = moment().month(filters?.month - 1).startOf('month').format('yyyy-MM-DD HH:mm:ss');
			end_date = moment().month(filters?.month - 1).endOf('month').format('yyyy-MM-DD HH:mm:ss');
			condition = {
				created_at: Raw(alias => `${alias} >= '${start_date}' AND ${alias} <= '${end_date}'`)
			}
		}



		


		// const responseGroupDay = await this.competitionRepo.query(`select count(*) as total, 
		// 	DATE_FORMAT(created_at,'%Y-%m-%d') as day 
		// 	from results rs LEF WHERE where status = 1 created_at >= '${start_date}' AND created_at <= '${end_date}' 
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
		
		let [resultTop, totalTop]: any = await this.resultRepo.findAndCount({
			where: {
				point: MoreThan(0),
				round_number: 3,
				status: 'PASS'
			},
			order: {
				point: 'DESC'
			},
			relations: {
				user: true,
				competition: true,
				judges: true
			},
            take: 10,
            skip: 0
		});

		if(resultTop?.length > 0) {
			for(let item of resultTop) {
				// item.judges = await
			}
		}

		return  {
			user: {
				total: await this.userRepo.count(),
				rectors: await this.userRepo.count({where: {type: 'RECTOR'}}),
				teachers: await this.userRepo.count({where: {type: 'TEACHER'}}),
				students: await this.userRepo.count({where: {type: 'STUDENT'}}),
			},
			competitions: {
				total: await this.competitionRepo.count(),
				active: await this.competitionRepo.count({where: {status: 1}}),
				inactive: await this.competitionRepo.count({where: {status: -1}}),
			},
			result_top: resultTop
		}

	}
}
