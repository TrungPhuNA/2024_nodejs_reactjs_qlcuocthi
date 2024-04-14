import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CompanyDto {

	
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	slug: string;

	@ApiProperty()
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	address?: string;

	@ApiProperty()
	@IsOptional()
	content: string;

	

	@ApiProperty()
	@IsOptional()
	scale: number;

	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	avatar: string;

	@ApiProperty()
	@IsOptional()
	website: string;

	@ApiProperty()
	@IsOptional()
	working_time: string;

	@ApiProperty()
	@IsOptional()
	careers: string;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}