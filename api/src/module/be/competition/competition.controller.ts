import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { BadRequestException, BaseResponse, HTTP_STATUS, IPaging } from 'src/helpers/helper';
import { JwtGuard } from 'src/module/auth/guards/jwt/jwt.guard';
import * as _ from 'lodash';
import { CompetitionDto } from 'src/dtos';
import { CompetitionService } from 'src/service/competition.service';

@Controller('cms/competition')
@ApiTags('CMS competition')
@UseGuards(JwtGuard)
export class CompetitionController {

	constructor(
		private service: CompetitionService
	) { }


	@Get('/list')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async getusers(@Request() req: any) {
		try {
			const paging: IPaging = {
				page: req.query.page || 1,
				page_size: req.query.page_size || 20
			};
			let filters = {...req.query, user: req.user}

			let data: any = await this.service.getLists(paging, filters);

			return BaseResponse(HTTP_STATUS.success, data, '', 'Successful');
		} catch (e) {
			console.log('ClassroomController list-------------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Get('show/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async findById(@Param('id') id: number) {
		try {
			const res = await this.service.findById(id);
			if (!res) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại');
			else return BaseResponse('success', res, '', 'Successful');
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Post('store')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async store(@Body() createDto: CompetitionDto, @Request() req: any) {
		try {
			if (_.isEmpty(createDto)) throw new BadRequestException({ code: 'F0001' });
			return BaseResponse(
				HTTP_STATUS.success,
				await this.service.store(createDto),
				'',
				'Created successfully!'
			);
		} catch (e) {
			console.log('create classroom ---------> ', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Put('update/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async update(@Param('id') id: number, @Body() updateDto: CompetitionDto) {
		try {
			const check = await this.service.findById(id);
			if (!check) return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại');
			if (_.isEmpty(updateDto)) throw new BadRequestException({ code: 'F0001' });

			return BaseResponse(HTTP_STATUS.success,
				await this.service.update(id, updateDto), '', 'Updated successfully!');
		} catch (e) {
			console.log('put CompetitionController ---------->', e.message);
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	@Delete('delete/:id')
	@HttpCode(HttpStatus.OK)
	@ApiResponse({ status: 200, description: 'success' })
	async deleteuser(@Param('id') id: number) {
		try {
			let data = await this.service.findById(id);

			if (!data) {
				return BaseResponse(HTTP_STATUS.fail, {}, 'E0001', 'Dữ liệu không tồn tại!');
			} else {
				await this.service.deleteById(id);
				return BaseResponse(HTTP_STATUS.success, {}, '', 'Deleted successfully!');
			}
		} catch (e) {
			return BaseResponse(e.status, e.response, e.code || 'E0001', e.message);
		}
	}

	async buildFilter(req: any) {
		const filters = {
			id: req.query.id || null,
			name: req.query.name || null,
			status: req.query.status || null,
			hot: req.query.hot || null,
			user_id: req.query.user_id || req.user?.id || null
		};

		return filters;
	}
}
