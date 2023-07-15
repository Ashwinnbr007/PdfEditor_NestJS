import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MulterModule } from '@nestjs/platform-express';
import { FileController } from './file.controller';
import { FilledPDF } from './file.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([FilledPDF]),
    MulterModule.register(),
  ],
  controllers: [FileController],
})
export class FileModule {}