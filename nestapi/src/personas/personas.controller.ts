import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PersonasService } from './personas.service';
import { CreatePersonaDto } from './dtos/create-persona.dto';
import { Persona } from './Persona.entity';
import { PatchPersonaDto } from './dtos/patch-persona.dto';

@Controller('personas')
export class PersonasController {
  public constructor(private readonly service: PersonasService) {}

  @Get()
  public findAll(): Promise<Persona[]> {
    return this.service.getAll();
  }

  @Post()
  public create(@Body() dto: CreatePersonaDto): Promise<Persona> {
    return this.service.createPersona(dto);
  }
  @Put(':id')
  public update(
    @Body() dto: CreatePersonaDto,
    @Param('id') id: number,
  ): Promise<Persona> {
    return this.service.updatePersona(dto, id);
  }
  @Patch(':id')
  public patch(
    @Param('id') id: number,
    @Body() dto: PatchPersonaDto,
  ): Promise<Persona> {
    return this.service.updatePersonaPatch(dto, id);
  }
  @Delete(':id')
  public delete(@Param('id') id: number): Promise<void> {
    return this.service.deletePersona(id);
  }
}
