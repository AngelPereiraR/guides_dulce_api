import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Category } from '../category/category.entity';

@Entity()
export class Guide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToOne(type => Category, category => category.guides)
  category: Category;

  @Column()
  type: string;

  @Column({ nullable: true })
  url: string; // Se almacenará la imagen en formato base64
}
