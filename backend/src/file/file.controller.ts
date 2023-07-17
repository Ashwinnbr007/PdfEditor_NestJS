import { Controller, Get, Put, UseInterceptors, Param, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilledPDF } from './file.entity';
import { Response } from 'express';
import * as fs from 'fs';
import { writeFile } from 'fs/promises';
import * as path from 'path';

@Controller('files')
export class FileController {
  constructor(
    @InjectRepository(FilledPDF)
    private readonly filledPDFRepository: Repository<FilledPDF>,
  ) {}

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {

    const filePath = path.join(__dirname, '../..', 'files', filename);
    if (!fs.existsSync(filePath)) {
      return res.status(404).send('File not found');
    }

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    fs.createReadStream(filePath).pipe(res);
  }

  @Put(':filename')
  @UseInterceptors(FileInterceptor('pdf'))
  async saveFile(@Body() requestBody: { pdfData: number[] }) {
    const uint8Array = new Uint8Array(requestBody.pdfData); // Convert array back to Uint8Array
    try {
      const filePath = `files/example.pdf`;

      await writeFile(filePath, uint8Array); // Save the Uint8Array to the file path

      const pdfData = requestBody.pdfData;

      const link = `/files/example.pdf`;
      const filledPDF = new FilledPDF();
      filledPDF.filename = 'example.pdf';
      filledPDF.link = link;
      filledPDF.pdfData = pdfData;
      await this.filledPDFRepository.save(filledPDF);

      return 'PDF saved successfully';
    } catch (error) {
      console.error('Error saving file:', error);
      throw new Error('Failed to save file');
    } 
  }

}
