import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class ArticleDto {
	
	@ApiProperty()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsOptional()
	avatar: string;

	@ApiProperty()
	@IsOptional()
	content: string;

	// @ApiProperty()
	// @IsOptional()
	// created_at?: Date;

	updated_at = new Date();
}