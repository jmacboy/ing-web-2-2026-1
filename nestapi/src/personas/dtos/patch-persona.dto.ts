import { IsISO8601, IsNumber, IsOptional } from 'class-validator';

export class PatchPersonaDto {
  @IsOptional()
  nombres: string;
  @IsOptional()
  apellidos: string;
  @IsOptional()
  @IsNumber()
  edad: number;
  @IsOptional()
  ciudad: string;
  @IsOptional()
  @IsISO8601()
  fechaNacimiento: string;
}
