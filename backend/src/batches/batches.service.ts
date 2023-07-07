import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { EntityManager, Repository } from 'typeorm'

import { CreateBatchDto, UpdateBatchDto } from '~shared/dtos/batches.dto'

import { Batch } from '../database/entities'

@Injectable()
export class BatchesService {
  @InjectRepository(Batch)
  private repository: Repository<Batch>

  async create(createBatchDto: CreateBatchDto): Promise<Batch> {
    const batch = this.repository.create(createBatchDto)
    return this.repository.save(batch)
  }

  async createWithTransaction(
    createBatchDto: CreateBatchDto,
    entityManager: EntityManager,
  ): Promise<Batch> {
    const batch = this.repository.create(createBatchDto)
    return await entityManager.save(batch)
  }

  async findOneByBatchId(id: number): Promise<Batch> {
    const batch = await this.repository.findOneBy({
      id,
    })
    if (!batch) throw new NotFoundException('Batch not found')

    return batch
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
