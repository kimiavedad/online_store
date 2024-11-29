import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { Product } from './entities/product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductHistory } from './entities/product-history.entity';
import { CqrsModule } from '@nestjs/cqrs';
import { CommandHandlers } from './commands/handlers';
import { QueryHandlers } from './queries/handlers';

@Module({
  imports: [
    CqrsModule,
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ProductHistory]),
  ],
  controllers: [ProductsController],
  providers: [...CommandHandlers, ...QueryHandlers],
})
export class ProductsModule {}

console.log(QueryHandlers);
