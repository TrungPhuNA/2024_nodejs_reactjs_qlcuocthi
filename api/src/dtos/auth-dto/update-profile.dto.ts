import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength, isArray } from "class-validator";

export class UpdateProfileDto {

	@ApiProperty()
	@IsOptional()
	@IsString()
	name: string;

	@ApiProperty()
	@IsOptional()
	@IsString()
	email: string;

	@ApiProperty()
	@IsOptional()
	username: string;

	@ApiProperty()
	@IsOptional()
	code: string;

	@ApiProperty()
	@IsOptional()
	avatar: string;


	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => Number(value || 1))
	@IsIn([1,-1])
	status?: number;

	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => value?.toString().toUpperCase())
	@IsIn(['TEACHER', 'STUDENT', 'RECTOR', 'ADMIN'])
	type: string;

	@ApiProperty()
	@IsOptional()
	phone: string;

	@ApiProperty()
	@IsOptional()
	school_id: any;

	@ApiProperty()
	@IsOptional()
	class_id: any;

	@ApiProperty()
	@IsOptional()
	address: string;

	@ApiProperty()
	@IsOptional()
	competition_ids: number[];

	@ApiProperty()
	@IsOptional()
	created_at: string;

	updated_at = new Date();
}
