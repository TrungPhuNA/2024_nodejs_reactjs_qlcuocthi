import {
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Param,
	Post,
	Request, Res,
	UploadedFile,
	UseInterceptors
} from '@nestjs/common';
import { ApiResponse } from "@nestjs/swagger";
import { FileInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { randomUUID } from 'crypto';
import Path = require('path');
import { BaseResponse, HTTP_STATUS } from 'src/helpers/helper';

const storage = {
	storage: diskStorage({
		destination: './files',
		filename: (req, file, cb) => {
			const filename: string = 'file-' + randomUUID();
			const extension: string = Path.parse(file.originalname).ext;
			cb(null, `${filename}${extension}`)
		}
	})
}

@Controller('upload')
export class UploadController {

	constructor() { }

	@Post('file')
	@HttpCode(HttpStatus.OK)
	@UseInterceptors(FileInterceptor('file', storage))
	@ApiResponse({ status: 200, description: 'success' })
	uploadFile(@UploadedFile() file: Express.Multer.File) {
		try {
			let URL = process.env.URL_IMAGE;
			file.destination = URL + `/upload/${file.filename}`;
			return BaseResponse(HTTP_STATUS.success, file, '', 'Successful');
		} catch (e) {
			console.log('UploadedFile ---------->', e.message);
			return BaseResponse('error', {}, '', e.message);
		}
	}


	@Get(':path')
	seeUploadedFile(@Param('path') image, @Res() res) {
		return res.sendFile(image, { root: './files' });
	}
}
