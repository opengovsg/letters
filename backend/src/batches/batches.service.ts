import { Injectable } from '@nestjs/common'

import { CreateBatchDto } from '../../../shared/src/dtos/create-batch.dto'
import { UpdateBatchDto } from '../../../shared/src/dtos/update-batch.dto'

@Injectable()
export class BatchesService {
  create(createBatchDto: CreateBatchDto) {
    return 'This action adds a new batch'
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
