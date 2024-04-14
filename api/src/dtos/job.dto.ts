import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class JobDto {
	
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	description: string;

	@ApiProperty()
	@IsOptional()
	slug: string;

	@ApiProperty()
	@IsOptional()
	avatar: string;

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
	number: number;

	@ApiProperty()
	@IsOptional()
	deadline: Date;

	@ApiProperty()
	@IsOptional()
	type: number;

	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	form_of_work_id: number;

	@ApiProperty()
	@IsOptional()
	experience_id: number;

	@ApiProperty()
	@IsOptional()
	rank_id: number;

	@ApiProperty()
	@IsOptional()
	tags: string;

	@ApiProperty()
	@IsOptional()
	company_id: number;

	@ApiProperty()
	@IsOptional()
	salary: number;

	@ApiProperty()
	@IsOptional()
	salary_id: number;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}