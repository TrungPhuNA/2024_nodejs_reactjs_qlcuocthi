import { Injectable } from '@nestjs/common';
import { BadRequestException, IPaging, SERVICE_TYPE } from 'src/helpers/helper';
import { MailService } from 'src/module/mail/mail.service';
import { ResultEntityRepository } from 'src/repository';

@Injectable()
export class ResultService   {

	constructor(
		private repository: ResultEntityRepository,
		private mailService: MailService,
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
		const oldData = await this.findById(id);
		if(!oldData) {
			throw new BadRequestException({code: "400", message: 'Không tìm thấy kết quả'})
		}
		const newData: any = await this.repository.create({ ...data });
		if(data?.meta_data && typeof data?.meta_data != 'string') {
			data.meta_data = JSON.stringify(data.meta_data);
		}
		await this.repository.update(id, {...data});
		const newResult = await this.findById(id);
		if(Number(newResult?.round_number) <= 3) {
			this.sendMailData(oldData, newResult)
		}
		return newResult
	}

	async sendMailData(oldData: any, newData: any) {
		let data: any = {
			round_number: newData?.round_number || 1,
			name: newData?.competition?.name,
			message: "Chào mừng bạn đến với cuộc thi. Dưới đây là thông tin bài thi của bạn!",
			username: newData?.user?.name || newData?.user?.username || newData?.user?.email,
			judges: newData?.judges?.map((item: any) => item.name)?.join(',') 
		};
		if(newData?.meta_data) {
			let metaData = newData.meta_data?.find((item: any) => item.type == newData?.round_number);

			data = {...data, ...metaData};
			if(newData?.round_number > oldData?.round_number) {
				data.message = `Chúc mừng bạn vượt qua vòng thi số ${newData?.round_number}. Dưới đây là thông tin bài thi của bạn!`
			} else if(newData?.status == 'FAIL') {
				data.message = `Rất tiếc bạn không vượt qua vòng thi số ${newData?.round_number}. Dưới đây là thông tin bài thi của bạn!`
			} else if(newData?.status == "PASS" && newData?.round_number == 3) {
				data.message = `Chúc mừng bạn hoàn thành cuộc thi. Dưới đây là thông tin bài thi của bạn!`

			}
			console.log("data--------> ", data);
			this.mailService.sendUserResult(data);

		} else {
			console.log("Not found meta data");
			return;
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
