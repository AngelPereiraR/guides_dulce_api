import { Entity, Column, PrimaryGeneratedColumn, OneToMany, AfterRemove, BeforeInsert } from 'typeorm';
import { Guide } from '../guide/guide.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(type => Guide, guide => guide.category)
  guides: Guide[];

  @Column({ default: 0 }) // Inicializar el recuento en 0
  guideCount: number;

  // Método para actualizar el recuento de guías antes de insertar una nueva guía
  @BeforeInsert()
  updateGuideCountBeforeInsert() {
    if (this.guides) {
      this.guideCount = this.guides.length;
    }
  }

  // Método para actualizar el recuento de guías después de eliminar una guía
  @AfterRemove()
  updateGuideCountAfterRemove() {
    if (this.guides) {
      this.guideCount = this.guides.length;
    }
  }
}
