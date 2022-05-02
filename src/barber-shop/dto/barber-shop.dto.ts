import {
  IsLatitude,
  IsLongitude,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class BarberShopDTO {
  @IsString()
  @IsNotEmpty()
  @Length(1, 100)
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 1000)
  address: string;

  @IsString()
  @IsOptional()
  imageURL?: string;

  @IsString()
  @IsOptional()
  coverImageURL?: string;

  @IsOptional()
  @IsLongitude()
  longitude: number;

  @IsOptional()
  @IsLatitude()
  latitude: number;
}
