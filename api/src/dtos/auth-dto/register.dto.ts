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
	@IsIn([1,-1])
	status?: number;


	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => value?.toUpperCase())
	@IsIn(['MALE', 'FEMALE', 'OTHER'])
	gender: string;

	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => value?.toUpperCase())
	@IsIn(['ADMIN', 'MEMBER'])
	type: string;

	@ApiProperty()
	@IsOptional()
	phone: string;

	@ApiProperty()
	@IsOptional()
	address: string;

	@ApiProperty()
	@IsOptional()
	health_information: any;

	@ApiProperty()
	@IsOptional()
	birthday: Date;

	updated_at = new Date();
}