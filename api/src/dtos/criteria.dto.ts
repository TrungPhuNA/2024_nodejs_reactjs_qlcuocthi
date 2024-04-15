import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UNIT } from "src/helpers/helper";

export class CriteriaDto {
	
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
	created_at?: Date;

	updated_at = new Date();
}