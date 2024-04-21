import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Guide } from '../guide/guide.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(type => Guide, guide => guide.category)
  guides: Guide[];
}
