import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
  Min,
} from 'class-validator';

export class AddProductDto {
  @IsString()
  @IsNotEmpty()
  public name!: string;

  @IsString()
  @IsNotEmpty()
  public description!: string;

  @IsNumber()
  @IsPositive()
  public price!: number;

  @IsInt()
  @Min(0)
  public availableQuantity!: number;
}
