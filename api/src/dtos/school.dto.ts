import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class SchoolDto {
	
	@ApiProperty()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsOptional()
	rector_id: number;

	@ApiProperty()
	@IsOptional()
	status: number;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}