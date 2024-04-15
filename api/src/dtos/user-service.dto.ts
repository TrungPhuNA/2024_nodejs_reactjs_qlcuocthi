import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { SERVICE_STATUS } from "src/helpers/helper";

const VALUE_STATUS = () => {
	return SERVICE_STATUS.map((item: any) => {
		return item?.value
	})
}
export class UserServiceDto {
	
	@ApiProperty()
	@IsOptional()
	user_id: number;

	@ApiProperty()
	@IsOptional()
	service_id: number;

	@ApiProperty()
	@IsOptional()
	room_id: number;

	@ApiProperty()
	@IsOptional()
	author_id: number;

	@ApiProperty()
	@IsOptional()
	time_start: Date;

	@ApiProperty()
	@IsOptional()
	total_price: number;

	@ApiProperty()
	@IsOptional()
	total_discount: number;

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
	@IsIn(VALUE_STATUS())
	status?: number;

	// @ApiProperty()
	// @IsOptional()
	// created_at?: Date;

	updated_at = new Date();
}