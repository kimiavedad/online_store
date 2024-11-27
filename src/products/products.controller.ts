import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { PurchaseProductDto } from './dto/purchase-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  display(@Param('id') id: string) {
    return this.productsService.display(id);
  }

  @Post(':id/purchase')
  purchase(
    @Param('id') id: string,
    @Body() purchaseProductDto: PurchaseProductDto,
  ) {
    return this.productsService.purchase(id, purchaseProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
