import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class FilledPDF {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  filename: string;

  @Column('bytea')
  pdfData: number[];

  @Column()
  link: string;
}