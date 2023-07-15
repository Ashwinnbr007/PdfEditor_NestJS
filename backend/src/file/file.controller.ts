import { Controller, Get, Put, UseInterceptors, Param, Res, Body } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FilledPDF } from './file.entity';
import { Response } from 'express';
import * as fs from 'fs';
import { writeFile } from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import * as path from 'path';


@Controller('files')
export class FileController {
  constructor(
    @InjectRepository(FilledPDF)
    private readonly filledPDFRepository: Repository<FilledPDF>,
  ) {}

  @Get(':filename')
  async getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filledPDF = await this.filledPDFRepository.findOne(
      { where: { filename }, order: { id: 'DESC' } },
    );
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
  async saveFile(@Body() newPdfData: ArrayBuffer, @Res() res : Response) {

    try {
      const filePath = 'files/example.pdf'; // Provide the correct file path
      const existingPDF = await PDFDocument.load(filePath);

      console.log(existingPDF)

      // Create a new PDF document from the received PDF data
      const updatedPDF = await PDFDocument.load(newPdfData);

      // // Clear the existing content in the original PDF
      // existingPDF.removePage(existingPDF.getPageCount() - 1);

      // // Copy the pages from the updated PDF to the existing PDF
      // const pages = await existingPDF.copyPages(updatedPDF, updatedPDF.getPageIndices());
      // pages.forEach(page => existingPDF.addPage(page));

      // // Save the updated PDF to the file path, overwriting the existing file
      const modifiedPDFBytes = await updatedPDF.save();
      await writeFile(filePath, modifiedPDFBytes);
      // Write the uploaded file to the file path, overwriting the existing file
      // fs.writeFileSync(filePath, pdfFile.buffer);

      // const pdfData = pdfFile.buffer;

      // const link = `/files/${filename}`;
      // const filledPDF = new FilledPDF();
      // filledPDF.filename = filename;
      // filledPDF.link = link;
      // filledPDF.pdfData = pdfData;
      // await this.filledPDFRepository.save(filledPDF);
    
      res.status(200).send('PDF saved successfully');


    } catch (error) {
      console.error('Error uploading file:', error);
      throw new Error('Failed to upload file');
    }
  }

}
