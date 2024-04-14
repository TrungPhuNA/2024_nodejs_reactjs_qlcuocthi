import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserJobDto {
	
	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	job_id: number;

	@ApiProperty()
	@IsOptional()
	file: string;

	@ApiProperty()
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	message?: string;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}