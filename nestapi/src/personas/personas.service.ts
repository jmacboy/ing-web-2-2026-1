import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonaDto } from './dtos/create-persona.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Persona } from './Persona.entity';
import { Repository } from 'typeorm/browser/repository/Repository.js';
import { PatchPersonaDto } from './dtos/patch-persona.dto';

@Injectable()
export class PersonasService {
  public constructor(
    @InjectRepository(Persona)
    private repository: Repository<Persona>,
  ) {}
  public getAll(): Promise<Persona[]> {
    return this.repository.find();
  }
  public createPersona(dto: CreatePersonaDto): Promise<Persona> {
    const persona = this.repository.create({
      nombres: dto.nombres,
      apellidos: dto.apellidos,
      edad: dto.edad,
      ciudad: dto.ciudad,
      fechaNacimiento: new Date(dto.fechaNacimiento),
    });
    return this.repository.save(persona);
  }
  public async updatePersona(
    dto: CreatePersonaDto,
    id: number,
  ): Promise<Persona> {
    const persona = await this.repository.findOneBy({ id });
    if (!persona) {
      throw new NotFoundException(`Persona not found`);
    }
    persona.apellidos = dto.apellidos;
    persona.ciudad = dto.ciudad;
    persona.edad = dto.edad;
    persona.fechaNacimiento = new Date(dto.fechaNacimiento);
    persona.nombres = dto.nombres;
    return this.repository.save(persona);
  }
  public async updatePersonaPatch(
    dto: PatchPersonaDto,
    id: number,
  ): Promise<Persona> {
    const persona = await this.repository.findOneBy({ id });
    if (!persona) {
      throw new NotFoundException(`Persona not found`);
    }
    if (dto.apellidos) {
      persona.apellidos = dto.apellidos;
    }
    if (dto.ciudad) {
      persona.ciudad = dto.ciudad;
    }
    if (dto.edad) {
      persona.edad = dto.edad;
    }
    if (dto.fechaNacimiento) {
      persona.fechaNacimiento = new Date(dto.fechaNacimiento);
    }
    if (dto.nombres) {
      persona.nombres = dto.nombres;
    }
    return this.repository.save(persona);
  }
  public async deletePersona(id: number): Promise<void> {
    const persona = await this.repository.findOneBy({ id });
    if (!persona) {
      throw new NotFoundException(`Persona not found`);
    }
    await this.repository.delete({ id });
  }
}
