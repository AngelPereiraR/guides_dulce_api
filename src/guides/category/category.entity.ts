import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterRemove, BeforeInsert } from 'typeorm';
import { Guide } from '../guide/guide.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Guide, guide => guide.category)
  guides: Guide[];

  @Column({ default: 0 }) // Inicializar el recuento en 0
  guideCount: number;
}
