import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'

import { CreateBatchDto } from '~shared/dtos/create-batch.dto'
import { UpdateBatchDto } from '~shared/dtos/update-batch.dto'

import { Batch } from '../database/entities'

@Injectable()
export class BatchesService {
  @InjectRepository(Batch)
  private repository: Repository<Batch>

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    return await this.createWithTransaction(createBatchDto, undefined)
  }

  async createWithTransaction(
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
