import { IsIn, IsNumber, IsObject, IsOptional, IsString } from "class-validator";

export class CrudDto {
	@IsOptional()
	@IsNumber()
	public page: number = 1;

	@IsOptional()
	@IsNumber()
	public pageSize: number = 10;

	@IsOptional()
	@IsObject()
	public filters?: any;

	@IsOptional()
	@IsString()
	public sortBy?: string;

	@IsOptional()
	@IsIn(["ASC", "DESC"])
	public orderBy?: "ASC" | "DESC";
}
