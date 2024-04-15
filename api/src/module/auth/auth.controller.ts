import { Controller, Get, Post, Body, Param, Put, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import * as _ from 'lodash';
import { JwtGuard } from './guards/jwt/jwt.guard';
import { BadRequestException, BaseResponse, HTTP_STATUS } from 'src/helpers/helper';
import { LoginDto } from 'src/dtos/auth-dto/login.dto';
import { RegisterDto } from 'src/dtos/auth-dto/register.dto';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {

	constructor(private readonly authService: AuthService) { }


	@Post('login')
	@ApiResponse({ status: 200, description: 'success'})
	async loginEmployee(
		@Body() formDto: LoginDto,
		
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.login(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@LoginDto----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Post('reset-password')
	@ApiResponse({ status: 200, description: 'success' })
	async resetPasswordMember(
		@Body() formDto: any,
		
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.resetPassword(formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@resetpass----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}


	@Put('/profile')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async updateProfile(
		@Request() req: any,
		@Body() formDto: any,
		
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0401' });
			}
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			console.log(formDto);
			const result = await this.authService.updateProfile(user_id, formDto);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	// @Put('/change-password/:repo')
	// @UseGuards(JwtGuard)
	// @ApiResponse({ status: 200, description: 'success' })
	// async changePassword(
	// 	@Request() req: any,
	// 	@Body() formDto: any,
	// 	
	// ) {
	// 	try {
	// 		const user_id = req?.user?.id || null;
	// 		if (!user_id) {
	// 			throw new BadRequestException({ code: 'LG0401' });
	// 		}
	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}
	// 		const result = await this.authService.updateProfile(user_id, formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@UpdateProfile----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }


	// @Put('/password/reset/:repo')
	// @ApiResponse({ status: 200, description: 'success' })
	// async reset(
	// 	@Request() req: any,
	// 	@Body() formDto: any,
	// 	
	// ) {
	// 	try {

	// 		if (_.isEmpty(formDto)) {
	// 			throw new BadRequestException({ code: 'F0001' });
	// 		}

	// 		const result = await this.authService.reset(formDto);

	// 		return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
	// 	} catch (error) {
	// 		console.log('e@UpdateProfile----> ', error);
	// 		return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
	// 	}
	// }

	@Get('/profile')
	@UseGuards(JwtGuard)
	@ApiResponse({ status: 200, description: 'success' })
	async profile(
		@Request() req: any,
		
	) {
		try {
			const user_id = req?.user?.id || null;
			if (!user_id) {
				throw new BadRequestException({ code: 'LG0001' });
			}
			const result = await this.authService.findById(user_id);

			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@UpdateProfile----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}

	@Post('register')
	@ApiResponse({ status: 200, description: 'success' })
	async registerFe(
		@Body() formDto: RegisterDto,
	) {
		try {
			if (_.isEmpty(formDto)) {
				throw new BadRequestException({ code: 'F0001' });
			}
			const result = await this.authService.register(formDto);
			return BaseResponse(HTTP_STATUS.success, result, '', 'successfully');
		} catch (error) {
			console.log('e@register----> ', error);
			return BaseResponse(error.status, error.response, error.code || 'E0001', error.message);
		}
	}
}
