import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'

import { CreateBatchDto, UpdateBatchDto } from '~shared/dtos/batches.dto'

import { Batch } from '../database/entities'

@Injectable()
export class BatchesService {
  @InjectRepository(Batch)
  private repository: Repository<Batch>
  async create(
    createBatchDto: CreateBatchDto,
    entityManager: EntityManager | undefined,
  ): Promise<Batch> {
    const batch = this.repository.create(createBatchDto)
    if (entityManager) {
      return await entityManager.save(batch)
    }
    return await this.repository.save(batch)
  }

  findAll() {
    return `This action returns all batches`
  }

  findOne(id: number) {
    return `This action returns a #${id} batch`
  }

  update(id: number, updateBatchDto: UpdateBatchDto) {
    return `This action updates a #${id} batch`
  }

  remove(id: number) {
    return `This action removes a #${id} batch`
  }
}
