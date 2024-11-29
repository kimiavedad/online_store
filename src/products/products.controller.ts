import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { PurchaseProductDto } from './dto/purchase-product.dto';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { DisplayProductQuery } from './queries/display-product.query';
import { CreateProductCommand } from './commands/create-product.command';
import { DeleteProductCommand } from './commands/delete-product.command';
import { PurchaseProductCommand } from './commands/purchase-product.command';

@Controller('products')
export class ProductsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.commandBus.execute(new CreateProductCommand(createProductDto));
  }

  @Get(':id')
  display(@Param('id') id: string) {
    return this.queryBus.execute(new DisplayProductQuery(id));
  }

  @Post(':id/purchase')
  @HttpCode(HttpStatus.OK)
  purchase(
    @Param('id') id: string,
    @Body() purchaseProductDto: PurchaseProductDto,
  ) {
    return this.commandBus.execute(
      new PurchaseProductCommand(id, purchaseProductDto),
    );
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.commandBus.execute(new DeleteProductCommand(id));
  }
}
