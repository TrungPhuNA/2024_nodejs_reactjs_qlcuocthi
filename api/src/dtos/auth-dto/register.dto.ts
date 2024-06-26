import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsIn, IsNotEmpty, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
export class RegisterDto {


	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	name: string;

	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20, {message: 'Password max length is 20 characters'})
	@MinLength(6, {message: 'Password min length is 6 characters'})
	password: string;

	@ApiProperty()
	@IsNotEmpty()
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
	created_at: string;

	@ApiProperty()
	@IsOptional()
	competition_ids: number[];

	updated_at = new Date();
}

export class UpdatePasswordDto {
	@ApiProperty()
	@IsNotEmpty()
	@IsString()
	@MaxLength(20, {message: 'Password max length is 20 characters'})
	@MinLength(6, {message: 'Password min length is 6 characters'})
	password: string;

	updated_at = new Date();
}