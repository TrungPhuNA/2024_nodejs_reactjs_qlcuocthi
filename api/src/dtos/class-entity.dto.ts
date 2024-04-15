import { ApiProperty } from "@nestjs/swagger";
import { Transform } from "class-transformer";
import { IsArray, IsIn, IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";
import { UNIT } from "src/helpers/helper";
const VALUE_STATUS = () => {
	return UNIT.map((item: any) => {
		return item?.value
	})
}
export class ClassDto {
	
	@ApiProperty()
	@IsOptional()
	name: string;

	@ApiProperty()
	@IsOptional()
	school_id: number;

	@ApiProperty()
	@IsOptional()
	status: number;

	@ApiProperty()
	@IsOptional()
	@Transform(({ value }) => value?.toLowerCase())
	@IsIn(VALUE_STATUS())
	unit: string;

	@ApiProperty()
	@IsOptional()
	created_at?: Date;

	updated_at = new Date();
}