import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FileModule } from './file/file.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'sus17251',
    database: 'PDF_Editor',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
  }),FileModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
