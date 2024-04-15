import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class RoomDto {
	
	@ApiProperty()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	image: string;

	// @ApiProperty()
	// @IsOptional()
	// created_at?: Date;

	updated_at = new Date();
}