import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { SERVICE_STATUS } from "src/helpers/helper";

export class UserLogDto {
	
	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	service_id: number;

	@ApiProperty()
	@IsOptional()
	user_service_id: number;

	@ApiProperty()
	@IsOptional()
	room_id: number;

	@ApiProperty()
	@IsOptional()
	type: string;

	@ApiProperty()
	@IsOptional()
	time_start: Date;

	@ApiProperty()
	@IsOptional()
	price: number;

	@ApiProperty()
	@IsOptional()
	discount: number;

	@ApiProperty()
	@IsOptional()
	payment_type: number;

	@ApiProperty()
	@IsOptional()
	payment_status: number;

	@ApiProperty()
	@IsOptional()
	time_stop: Date;

	@ApiProperty()
	@IsOptional()
	status?: number;

	// @ApiProperty()
	// @IsOptional()
	// created_at?: Date;

	updated_at = new Date();
	created_at = new Date();
}