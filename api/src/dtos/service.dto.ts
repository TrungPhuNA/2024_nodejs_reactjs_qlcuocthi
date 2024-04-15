import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { SERVICE_TYPE } from "src/helpers/helper";

const VALUE_TYPE = () => {
	return SERVICE_TYPE.map((item: any) => {
		return item.code
	})
}
export class ServiceDto {
	
	@ApiProperty()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => value?.toUpperCase())
	@IsIn(VALUE_TYPE())
	type: string;

	@ApiProperty()
	@IsOptional()
	price: number;

	@ApiProperty()
	@IsOptional()
	status: number;

	@ApiProperty()
	@IsOptional()
	sale: number;

	@ApiProperty()
	@IsOptional()
	image: string;

	// @ApiProperty()
	// @IsOptional()
	// created_at?: Date;

	updated_at = new Date();
}