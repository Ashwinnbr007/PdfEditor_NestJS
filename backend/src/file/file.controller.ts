import { Controller, Get } from '@nestjs/common';
import { FileService } from './file.service';

@Controller('api')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Get()
  getHello(): {} {
    return this.fileService.getHello();
  }
}
