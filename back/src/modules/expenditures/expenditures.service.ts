import { Injectable } from '@nestjs/common';
import { CreateExpenditureDto } from './dto/create-expenditure.dto';
import { UpdateExpenditureDto } from './dto/update-expenditure.dto';
import { ExpendituresRepository } from './expenditures.repository';
import { Expenditure } from './entities/expenditure.entity';

@Injectable()
export class ExpendituresService {
  constructor(
    private readonly ExpendituresRepository: ExpendituresRepository,
  ) {}
  async create(
    createExpenditureDto: CreateExpenditureDto,
  ): Promise<Expenditure> {
    return await this.ExpendituresRepository.create(createExpenditureDto);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<Expenditure[]> {
    return await this.ExpendituresRepository.findAll(page, limit);
  }
  async findOne(id: string): Promise<Expenditure> {
    return await this.ExpendituresRepository.findOne(id);
  }

  async update(id: string, updateExpenditureDto: UpdateExpenditureDto): Promise<Expenditure> {
    return await this.ExpendituresRepository.update(id, updateExpenditureDto);
  }

  async disable(id: string): Promise<Expenditure> {
    return await this.ExpendituresRepository.disable(id);
  }
}
