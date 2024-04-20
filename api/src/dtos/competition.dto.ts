import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class CompetitionDto {
	
	@ApiProperty()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsOptional()
	author_id: number;

	@ApiProperty()
	@IsOptional()
	image: string;

	@ApiProperty()
	@IsOptional()
	contents: string;

	@ApiProperty()
	@IsOptional()
	status?: number;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	@ApiProperty()
	@IsOptional()
	criteria_ids: number[];

	@ApiProperty()
	@IsOptional()
	judge_ids: number[];

	updated_at = new Date();
}