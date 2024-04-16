import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @Column()
  category: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  url: string; // Se almacenará la imagen en formato base64
}
