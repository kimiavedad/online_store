import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productRespository: Repository<Product>,
  ) {}

  create(createProductDto: CreateProductDto) {
  }

  display() {}

  purchase(id: number, updateProductDto: UpdateProductDto) {}

  delete() {}
}
