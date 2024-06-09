import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { SERVICE_TYPE } from "src/helpers/helper";

const VALUE_TYPE = () => {
	return SERVICE_TYPE.map((item: any) => {
		return item.code
	})
}
export class ResultDto {
	
	@ApiProperty()
	@IsOptional()
	file: string;

	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	point: number;

	@ApiProperty()
	@IsOptional()
	content: string;

	@ApiProperty()
	@IsOptional()
	competition_id: number;

	@ApiProperty()
	@IsOptional()
	status: string;

	@ApiProperty()
	@IsOptional()
	meta_data: any;

	@ApiProperty()
	@IsOptional()
	round_number: number;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}