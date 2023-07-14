import { Injectable } from '@nestjs/common';

@Injectable()
export class FileService {
  getHello(): {} {
      return { helloWorld: 'Hello World!' };
  }
}
