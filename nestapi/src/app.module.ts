import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PersonasController } from './personas/personas.controller';
import { PersonasService } from './personas/personas.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from './personas/Persona.entity';
import { ConfigModule } from '@nestjs/config';
import { MascotasModule } from './mascotas/mascotas.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT || '3306', 10),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      entities: [Persona],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Persona]),
    MascotasModule,
  ],
  controllers: [AppController, PersonasController],
  providers: [AppService, PersonasService],
})
export class AppModule {}
