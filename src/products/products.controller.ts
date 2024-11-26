import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':id')
  display(@Param('id') id: string) {
    return this.productsService.display();
  }

  @Patch(':id')
  purchase(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.purchase(+id, updateProductDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
  }
}
