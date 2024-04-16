import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './guide.entity';
import * as fs from 'fs';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private guideRepository: Repository<Guide>,
  ) {}

  async findAll(): Promise<Guide[]> {
    return this.guideRepository.find();
  }

  async findOne(id: number): Promise<Guide> {
    return this.guideRepository.findOneBy({id});
  }

  async create(guideData: Partial<Guide>): Promise<Guide> {
    const guide = this.guideRepository.create(guideData);
    return this.guideRepository.save(guide);
  }

  async update(id: number, guideData: Partial<Guide>): Promise<Guide> {
    await this.guideRepository.update(id, guideData);
    return this.guideRepository.findOneBy({id});
  }

  async remove(id: number): Promise<void> {
    await this.guideRepository.delete(id);
  }

  async uploadArchive(id: number, archive: Express.Multer.File): Promise<void> {
    const guide = await this.guideRepository.findOneBy({id});
    if (!guide) {
      throw new NotFoundException(`Guide con id ${id} no encontrado`);
    }
    guide.url = fs.readFileSync(archive.path, { encoding: 'base64' });
    await this.guideRepository.save(guide);
  }
}
