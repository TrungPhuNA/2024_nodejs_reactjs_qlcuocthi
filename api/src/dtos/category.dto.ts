import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CategoryDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name?: string;

	@ApiProperty()
	@IsOptional()
	type?: number;

	@ApiProperty()
	@IsOptional()
	slug?: string;

	@ApiProperty()
	@IsOptional()
	status?: number = 1;

	@ApiProperty()
	@IsOptional()
	avatar?: string;

	@ApiProperty()
	@IsOptional()
	total_jobs?: number = 0;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}